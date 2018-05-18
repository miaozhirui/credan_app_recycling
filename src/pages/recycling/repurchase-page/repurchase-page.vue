<template>
    <div class="repurchase-page fullscreen" v-cloak>
        <p>金额</p>
        <p><span>¥</span>{{ money | decimal }}</p>
        <button class="btn" @click="toPay">立即付款</button>
    </div>
</template>
    