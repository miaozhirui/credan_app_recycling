<template>
    <div class="code" :class="{'code-disabled': isDisable}" @click="getCode">{{ timerText }}</div>
</template>

<script>
    import index from './index';
    export default index;
    
    import './index.less';
</script>
