<template>
    <div class="my-page fullscreen" v-cloak>
        <div class="user-info">
            <div class="avatar"></div>
            <p class="phone">{{ showPhone }}</p>
        </div>
        <div class="list">
            <ul>
                <li class="db">
                    <div class="left db1 bm">
                        <span class="icon"></span>
                        <span>订单列表</span>
                    </div>
                    <div class="right db1 bm br" @click="toOrderList">
                        <span class="arrow"></span>
                    </div>
                </li>
                <li class="db">
                    <div class="left db1 bm">
                        <span class="icon"></span>
                        <span>退出登录</span>
                    </div>
                    <div class="right db1 bm br" @click="logout">
                        <span class="arrow"></span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="desc">
            <p>温馨提示:</p>
            <p>有问题请联系客服微信 <span>yjt13225518099</span> 长按复制</p>
        </div>
    </div>
</template>
    