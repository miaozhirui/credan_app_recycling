<template>
    <div class="select-product fullscreen" v-cloak>
        
        <div class="banner">
           <!--  <ul>
                <li></li>
            </ul> -->
        </div>
        <div class="content">

            <div class="recycling">
                <div class="desc-layout db bm">
                    <span class="line"></span>
                    <p>回收物品</p>
                </div>
                <ul class="db phones">
                    <li 
                    class="db1 bm bc" 
                    :class="{selected: item.selected}" 
                    v-for="item in productList"
                    @click="changeProduct(item)"
                    >{{ item.name }}</li>
                   
                </ul>
                <div class="price-detail">
                    <p>物品价值</p>
                    <p><span>¥</span>{{ productPrice | toThousands }}.00</p>
                    
                </div>

                <ul class="process-logo db">
                    <li class="db1 bc">
                        <span class="icon"></span>
                    </li>
                    <li class="db1 bc bm">
                        <span>>></span>
                    </li>
                    <li class="db1 bc">
                        <span class="icon"></span>
                    </li>
                    <li class="db1 bc bm">
                        <span>>></span>
                    </li>
                    <li class="db1 bc">
                        <span class="icon"></span>
                    </li>
                </ul>

                <ul class="process-desc db">
                    <li class="db1 bc">信用审查</li>
                    <li class="db1 bc">寄售本机/租用本机</li>
                    <li class="db1 bc">评估领款</li>
                </ul>
                
            </div>
            
            <div class="agree db bc bm">
                <span 
                class="icon" 
                :class="{selected: isAgreeProtocal}"
                @click="toCheckProtocal"
                ></span>
                <p>我同意 <span @click="showAgreement">《租赁协议》</span></p>
            </div>
            <button class="btn" @click="toOrderInfo">评估领款</button>
        </div>

        <Agreement
        :agreement="agreement"
        :isShowAgreement="isShowAgreement"
        @watchIsShow="watchIsShow"
        ></Agreement>
    </div>
</template>
    