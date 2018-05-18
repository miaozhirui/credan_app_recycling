//对微信回复消息的封装

module.exports = function (state) {

    var message = state.message;
    //指定向用户回复消息的类型
    var msgType;
    var xmlBody='';

    if(typeof  message.content === 'string') {

        msgType = 'text'
    }

    if(Array.isArray(message.content)) {

        msgType = 'news';
    }

    if(Object.prototype.toString.call(message.content) === '[object Object]'){

        msgType = message.content.type
    }


    //回复文本消息
    if(msgType === 'text') {

        xmlBody = `<Content><![CDATA[${message.content}]]>
                    </Content>`
    }

    //回复图片消息
    if(msgType === 'image') {

        xmlBody = `<Image>
                        <MediaId>
                            <![CDATA[${message.content.mediaId}]]>
                        </MediaId>
                    </Image>`
    }

    //回复语音消息
    if(msgType === 'voice'){

        xmlBody = `<Voice>
                        <MediaId>
                            <![CDATA[message.mediaId]]>
                        </MediaId>
                    </Voice>`
    }

    //回复视屏消息
    if(msgType === 'video') {

        xmlBody = `  <Video>
                        <MediaId>
                            <![CDATA[${message.content.mediaId}]]>
                        </MediaId>
                        <Title>
                            <![CDATA[${message.content.title}]]>
                        </Title>
                        <Description>
                            <![CDATA[${message.content.desc}]]>
                        </Description>
                    </Video>`
    }

    //回复图片
    if(msgType === 'music') {

            xmlBody = `<Music>
                    <Title>
                        <![CDATA[${message.content.title}]]>
                    </Title>
                    <Description>
                        <![CDATA[${message.content.desc}]]>
                    </Description>
                    <MusicUrl>
                        <![CDATA[${message.content.musicUrl}]]>
                    </MusicUrl>
                    <HQMusicUrl>
                        <![CDATA[${message.content.HQMusicUrl}]]>
                    </HQMusicUrl>
                    <ThumbMediaId>
                        <![CDATA[${message.content.mediaId}]]>
                    </ThumbMediaId>
                </Music>`
        }

    //回复图文消息
    if(msgType === 'news') {

        var items = [];

        message.content.forEach(function (item) {

            var item = `<item>
                            <Title>
                                <![CDATA[${item.title}]]>
                            </Title>
                            <Description>
                                <![CDATA[${item.desc}]]>
                            </Description>
                            <PicUrl>
                                <![CDATA[${item.picUrl}]]>
                            </PicUrl>
                            <Url>
                                <![CDATA[${item.url}]]>
                            </Url>
                        </item>`
            items.push(item);
        })

        xmlBody = `<ArticleCount>${message.content.length}</ArticleCount>
                    <Articles>
                        ${items.join('')}
                     </Articles>`

    }

    var xml = `<xml>
                 <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                 <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                 <CreateTime>${new Date().getTime()}</CreateTime>
                 <MsgType>
                    <![CDATA[${msgType}]]>
                </MsgType>
                 ${xmlBody}
               </xml>
               `;


    state.message = xml;

}
