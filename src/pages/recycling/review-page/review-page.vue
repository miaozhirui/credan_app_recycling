<template>
    <div class="review-page fullscreen" v-cloak>
       
       <div class="reviewing layout">
           <div class="icon"></div>
           <p>审核中</p>
           <p>审核通过后，会直接把钱打到提交的<br/>银行卡中，请耐心等！</p>
           <button class="btn">刷新审核结果</button>
       </div>
       <div class="review-success layout">
           <div class="icon"></div>
           <p>恭喜你！审核成功</p>
           <p>钱已经发出，请注意查收，点击一下<br/>按钮查看订单信息</p>
           <button class="btn" @click="toOrderList">查看订单</button>
       </div>
       <div class="review-fail layout">
           <div class="icon"></div>
           <p>审核拒绝</p>
           <p>审核未通过，很抱歉不能使用足迹服务~<br/>赶紧邮寄手机吧~</p>
           <!-- <button class="btn">立即邮寄手机</button> -->
       </div>
    </div>
</template>
    