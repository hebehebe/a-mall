<template>
    <div class="cart-list">
        <scroller class="content"  :pull-up-load="true" 
   :probe-type="3"  ref="scroll">
         <cart-list-item v-for="(item,index) in cartList"
         :item-info="item" :key="index" />     
        </scroller>    
    </div>
</template>

<script>
import Scroller from "components/common/scroller/Scroller";

import CartListItem from "./CartListItem"
import {mapGetters} from 'vuex'

export default {
    name:"CartList",
    components:{
        Scroller,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
   activated(){
         this.$refs.scroll.refresh()
    }
   
}
</script>

<style scoped>
.cart-list{
   height: calc(100% - 44px - 49px - 40px);
}
  .content{
    height: 100%;
     overflow: hidden;
  }
</style>