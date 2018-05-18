<template>
    <div class="order-list fullscreen" v-cloak>
        <ul>
            <li v-for="item in orderList" >
                <div class="content">
                    <div class="db layout">
                        <div class="left db1">订单号 {{ item.loanId }}</div>
                        <div class="right db1 br bm">{{ getLoanStatus(item) }}</div>
                    </div>

                    <div class="db layout">
                        <div class="left db1">回购价格</div>
                        <div class="right db1 br bm">¥ {{ buyBackPrice(item) | decimal }}</div>
                    </div>
                    <div class="db layout">
                        <div class="left db1">租约到期日期</div>
                        <div class="right db1 br bm">{{ item.termDate | date }}</div>
                    </div>
                    <div class="db layout">
                        <div class="left db1">租机时间</div>
                        <div class="right db1 br bm">{{ item.arriveTime | date }}</div>
                    </div>
                    <div class="db layout">
                        <div class="left db1">租用天数</div>
                        <div class="right db1 br bm">{{ item.termNum }}</div>
                    </div>
                    <div class="db layout">
                        <div class="left db1">回收价格</div>
                        <div class="right db1 br bm">¥ {{ item.lendMoney | decimal }}</div>
                    </div>
                </div>
                <div class="footer db br bm" v-if="isShowBtn(item)">
                    <button @click="toRenewLease(item)">续租</button>
                    <button @click="toRepurchase(item)">回购</button>
                </div>
            </li>
        </ul>
        <p class="empty" v-if="orderList.length==0">您还没有订单</p>
    </div>
</template>
    