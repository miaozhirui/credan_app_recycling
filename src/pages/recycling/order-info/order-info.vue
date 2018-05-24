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
                <div class="left db1 bm">预计租机日期<span class="help" @click="helpOne"></span></div>
                <div class="right db1 br bm">{{ now | date }}</div>
            </li>
            <li class="db">
                <div class="left db1 bm">预计到期日期<span class="help" @click="helpTwo"></span></div>
                <div class="right db1 br bm">{{ expireDate | date }} </div>
            </li>
            <li class="db">
                <div class="left db1 bm">申请时间</div>
                <div class="right db1 br bm">{{ now | date }}</div>
            </li>
            <li class="db">
                <div class="left db1 bm">租金总额</div>
                <div class="right db1 br bm">{{ totalRent | decimal }}</div>
            </li>
            <li class="db">
                <div class="left db1 bm">回收总价格</div>
                <div class="right db1 br bm">{{ orderInfo.lendMoney | decimal }}</div>
            </li>
            <li class="db">
                <div class="left db1 bm">到账金额</div>
                <div class="right db1 br bm">{{ orderInfo.payMoney | decimal }}</div>
            </li>
        </ul>

        <footer>
            <!-- <div class="agree db bc bm">
                <span 
                class="icon" 
                :class="{selected: isAgreeProtocal}"
                @click="toCheckProtocal"
                ></span>
                <p>我同意 <span @click="showAgreement">《租赁协议》</span></p>
            </div> -->
            <button class="btn" @click="toSubmit">立即租机</button>
        </footer>

        <Agreement
        :agreement="agreement"
        :isShowAgreement="isShowAgreement"
        @watchIsShow="watchIsShow"
        ></Agreement>
    </div>
</template>
    