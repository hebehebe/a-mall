<template>
    <div>
       <nav-bar>
           <div slot="left">
               <img src="~assets/img/common/back.svg" alt="" class="back" @click="backClick"/>
           </div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" 
            @click="itemClick(index)" :class="{active:curIndex===index}"
            class="title-item">{{item}}</div>

        </div>
       </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            curIndex:0,
        }
    },
    methods:{
        itemClick(index){
            this.curIndex = index
            this.$emit('itemClick',index)
        },
        backClick(){
            this.$router.back()
        }

    }
}
</script>

<style scoped>
  .title{
      display: flex;
      font-size: 14px;
  }
  .title-item{
      flex: 1;
  }
  .active{
      color:var(--color-high-text);
  }
  .back{
      margin-top: 10px;
      width: 23px;
  }
</style>