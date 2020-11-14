<template>
 <div id="home" class="wrapper">
     <nav-bar class="home-nav">
       <div slot="center">购物街</div>
       </nav-bar>
   <tab-control :titles="TabControltitle" 
      class="tabcontrol" v-show="isTabFixed"
       @tabClick="tabClick" ref="tabControl1" />
     <scroller class="home-scroller" ref="scroll"
      :probe-type="3" 
      @scroll="getPostion" 
     :pull-up-load="true" @pullingUp="loadMore" >

      <home-swiper :cbanners="banners" @swiperImageLoad='swiperImageLoad' />
      <home-recommend :cproducts="products" />
      <tab-control :titles="TabControltitle"  
       @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"/>   
     </scroller>

    <back-top @click.native="backClick" v-show="isShowBackTop"/> 
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommend from "./childComps/HomeRecommend"

import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"

 import Scroller from "components/common/scroller/Scroller";
  import BackTop from "components/content/backtop/BackTop"
 
 import {debounce} from "common/utils"
import {getHomeMultidata,getHomeGoods} from "network/home"
import {itemListenerMixin} from "common/mixin"

export default {
    name:"Home",
    
    components: {
     NavBar,
    
     HomeSwiper,
     HomeRecommend,

    TabControl,
    GoodsList,

     Scroller,
     BackTop,
  },
   mixins:[itemListenerMixin],
  data(){
    return{
      banners:[],
      products:[],
      TabControltitle:['流行','新款','精选'],

      //请求商品的数据
      goods:{
        'pop':{page:0,list:[]} ,
        'new':{page:0,list:[]} ,
        'sell':{page:0,list:[]} ,
      },
    currentType: 'pop',
    isShowBackTop:'false',
    tabOffsetTop:0,
    isTabFixed:false,
    saveY:0,
    itemImgListener:null
    }
  },
  computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
  },
  created(){
    //请求多个数据
    this. getHomeMultidata()

    //请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
        this.getHomeGoods('sell')
     },
     activated(){
       this.$refs.scroll.scrollTo(0,this.saveY,0),
       this.$refs.scroll.refresh()
     },
     deactivated(){
       //1.保存Y值
       this.saveY = this.$refs.scroll.getScrollY()
       //2.取消全局时间的监听
       this.$bus.$off('itemImageLoad',this.itemImgListener)
     },
  //    mounted(){
  //       //3.监听item中图片的加载完成
  //       const refresh=debounce(this.$refs.scroll.refresh,100)
  //       this.itemImgListener=()=>{
  //        refresh()}
  //        this.$bus.$on('itemImageLoad',itemImgListener)
  // },

    methods:{
    /*
    事件监听方法
    
    */
     tabClick(index){
       switch(index){
         case 0:
           this.currentType='pop'
           break
         case 1:
           this.currentType='new'
           break
          case 2:
            this.currentType='sell'
            break
       }
      this.$refs.tabControl1.curIndex = index;
      this.$refs.tabControl2.curIndex =index;
     },
  backClick(){
  this.$refs.scroll.scrollTo(0,0)
  },
   getPostion(position) {
     //1.判断BackTop是否显示
   this.isShowBackTop = (-position.y) > 1000
   //2.决定tabControl是否吸顶（position：fixed）
   this.isTabFixed=(-position.y)>this.tabOffsetTop

  },
  loadMore(){
    this.getHomeGoods(this.currentType)
    //  this.$refs.scroll.scroll.refresh()
  },
  swiperImageLoad(){
  console.log(this.$refs.tabControl2.$el.offsetTop)
  this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
   },
  // debounce(func,delay){
  //   let timer= null
  //   return function(...args){
  //     if(timer) clearTimeout(timer)
  //     timer = setTimeout(()=>{
  //       func.apply(this,args)
  //     },delay)
  //   }
  // },

   /*
   网络请求方法
   */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners=res.data.banner.list;
       this.products=res.data.recommend.list;
    
     
    }) },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res =>{
             this.goods[type].list.push(...res.data.list)
             this.goods[type].page+=1
           this.$refs.scroll.finishPullUp()
    })
    
    },
   
}
}
</script>

<style scoped>
 #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
      background-color: var(--color-tint);
      color: white;
      position: fixed;
     
       left: 0;
    right:0;
    top: 0;
      z-index: 9;
  }
 

.tabcontrol{
  position: relative;
  z-index: 99;
  background-color: white;
}
   .home-scroller{
    overflow: hidden;

    position: absolute;
    top: 0px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  /* .home-scroller{
    overflow: hidden;
    height: calc(100% - 93px);
  } */
</style>