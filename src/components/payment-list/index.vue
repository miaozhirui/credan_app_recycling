<template>
<!-- 支付方式列表 -->
    <div class="payment-list"  :class="{show: isShowPaymentList}">
        <ul>
            <li>请选择支付方式</li>
            <li class="db" v-for="item in paymentListData" @click="selectPayment(item)">
                <div class="left db bm">
                    <span :class="[item.class]"></span>
                    <span>{{ item.name }}</span>
                </div>
                <div class="right br bm db1">
                    <span :class="{selected: item.selected}"></span>
                </div>
            </li>
            
            <li>
                <button @click="toPay">去支付</button>
            </li>
            <li @click="$emit('close-paylist')"></li>
        </ul>
    </div>
</template>

<script>
    import index from './index';
    export default index;

    import './index.less';
</script>