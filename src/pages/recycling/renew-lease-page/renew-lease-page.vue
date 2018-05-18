<template>
    <div class="order-info fullscreen" v-cloak>
        <div class="banner-wrap">
            <div class="banner"></div>
        </div>
        <ul>
            <li class="db">
                <div class="left db1 bm">租用天数</div>
                <div class="right db1 br bm">
                    <button 
                    v-for="item in recyclingDays"
                    @click="changeDays(item)"
                    :class="{selected: item.selected}"
                    >{{ item.day }}天</button>
                </div>
            </li>
           
            <li class="db">
                <div class="left db1 bm">到期日期<span class="help" @click="helpOne"></span></div>
                <div class="right db1 br bm">{{ getExpireDate | date }}</div>
            </li>
           
            <li class="db">
                <div class="left db1 bm">租金总额</div>
                <div class="right db1 br bm">{{ orderInfo.delayFee }}</div>
            </li>
           
        </ul>
        
        <button class="btn" @click="toPay">立即支付</button>
       
    </div>
</template>
    