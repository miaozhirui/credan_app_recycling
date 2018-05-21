<template>
    <div class="aiguigou-download fullscreen" v-cloak>
       <div class="action">
            <div class="logo-wrap db bm">
                <div class="left"></div>
                <div class="right db1">
                    <p>爱回购</p>
                    <p>您身边的好帮手</p>
                </div>
            </div>
            <div @click="toDownloadIos" class="ios download">iPhone下载</div>
            <div @click="toDownloadAndroid" class="android download">Android下载</div>
        </div>
        <div class="desc">
            <p>下载爱回购App</p>
            <!-- <p>借款金额您来选，通过率高于<span>98%</span>。<br/>手机号即可贷，最快1分钟到账。随借随还，利息低</p> -->
        </div>
        <div class="app-bg"></div>
    </div>
</template>
    