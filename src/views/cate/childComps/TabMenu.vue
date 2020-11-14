<template>
<scroller id="tab-menu" :probe-type="3" :pull-up-load="true">
   <div class="menu-list">
       <div class="menu-list-item" 
       v-for="(item,index) in categories"
       :class="{active:index===curIndex}"
       @click="itemClick(index)"
        :key="index" >
           {{item.title}}
       </div>
   </div>
</scroller>
    
</template>

<script>
import Scroller from "components/common/scroller/Scroller";

export default {
    name:"TabMenu",
    props:{
        categories:Array
    },
    components:{
        Scroller
    },
    data(){
        return{
            curIndex:0
        }
    },
    methods:{
       itemClick(index){
           this.curIndex =index
           this.$emit('selectItem',index)
       }
    }
}
</script>

<style scoped>
#tab-menu{
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-shadow: border-box;
}
 .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
.active{
    font-weight: 700;
    color: #ff8198;
    background-color: #fff;
     border-left: 3px solid var(--color-high-text);
}

</style>