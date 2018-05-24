<template>
    <div class="user-protocol fullscreen" v-cloak>
        <p class="title">《展兴回收租赁协议》</p>
        <ul class="leader">
            <li>甲方名称:<span>深圳市展兴商贸有限公司</span></li>
            <li>营业执照号:<span>914403007787978824</span></li>
            <li>乙方姓名:<span></span></li>
            <li>身份证号:<span></span></li>
        </ul>
        <table class="user-info" cellspacing="0"> 
            <tr>
                <td>乙方姓名</td>
                <td></td>
            </tr>
            <tr>
                <td>回收物品</td>
                <td></td>
            </tr>
            <tr>
                <td>回收金额</td>
                <td></td>
            </tr>
            <tr>
                <td>租用天数</td>
                <td></td>
            </tr>
            <tr>
                <td>租用金额</td>
                <td></td>
            </tr>
            <tr>
                <td>到账金额</td>
                <td></td>
            </tr>
        </table>
        <div class="protocol-content" v-html="protocol"></div>

        <div class="to-bottom-arrow" @click="toBottom"></div>

        <div class="signature">
            <div class="part-a db">甲方: <p>(签字)</p></div>
            <div class="part-b db">乙方: <p>(签字)</p></div>
        </div>

        <div class="footer db bm bc">
            <button class="left db1" @click="cancel">取消</button>
            <button class="right db1" @click="confirm">确认</button>
        </div>
    </div>
</template>
    



