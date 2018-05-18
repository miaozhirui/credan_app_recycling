<template>
  <div class="agreement db bm" v-if="isShowAgreement">

        <div class="content">

            <div class="top db br bm" @click="cancelHandle">
                <div class="cancel"></div>
            </div>

            <div v-html="agreement"></div>
        </div>
  </div>
</template>

<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>
