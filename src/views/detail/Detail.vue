<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
   <scroller class="content"  
   :pull-up-load="true" 
   :probe-type="3"
   @scroll="contentScroll"
   ref="scroll">
          <detail-swiper :top-images="topImages" @simgLoad="simgLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad1"/>
      <detail-param-info :paramInfo=" paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
   </scroller>
   <back-top @click.native="backClick" v-show="isShowBackTop" class="back-top"/> 
   <detail-bottom-bar @addToCart="addToCart" />
   
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroller from 'components/common/scroller/Scroller'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail,Goods,Shops,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from "common/utils"
import {itemListenerMixin,backTopMixin} from "common/mixin"

import { mapGetters, mapActions } from 'vuex'

export default {
    name:"Detail",
    components:{
       DetailNavBar,
       DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroller,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
       GoodsList,
       DetailBottomBar,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{ },
            shop:{ },
            detailInfo:{},
            paramInfo:{ },
           commentInfo:{},
           recommends:[],
           itemImgListener:null,
           themeTopYs:[],
           getThemeTopY:null,
           currentIndex:0
        
        }
    },
    created(){
        //1.保存传入的iid
        this.iid=this.$route.params.iid

        //2根据Iid请求详情数据
        getDetail(this.iid).then(res=>{
            console.log(res)
            const data=res.result
            //1.获取顶部轮播图数据
          this.topImages=res.result.itemInfo.topImages
          //2.获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //3.获取店铺信息对象
            this.shop=new Shops(data.shopInfo)
            //4.获取商品其他信息
            this.detailInfo=data.detailInfo
            //5.获取参数信息
           this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
           //6.获取评论信息
           if(data.rate.crate !==0){
               this.commentInfo=data.rate.list[0]
           }
        })
       //3.请求推荐商品信息
            getRecommend().then(res=>{
                console.log(res)
                this.recommends = res.data.list
            })
       //4.给getThemeTopY赋值，（对给this.themeTopYs赋值的操作进行防抖）
       this.getThemeTopY =debounce(()=>{
           this.themeTopYs =[]
           this.themeTopYs.push(0);
           this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
             this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
             this.themeTopYs.push(Number.MAX_VALUE)
             console.log(this.themeTopYs)

       },100)
    },
    methods:{
         ...mapActions(['addCart']),
        imageLoad1(){
            this.$refs.scroll.scroll.refresh()
            this.getThemeTopY()
        },
        simgLoad(){
             this.$refs.scroll.scroll.refresh()
        },
        itemClick(index){
           console.log(index)
           this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
            //1.获取Y值
            const positionY = -position.y
            //2.positionY和主题中值进行对比
            //【0,7938,9120,9452】
            //positionY在0和7938之间，index为0
            //positionY在7938和9120之间，index为1
            //positionY在9120和9452之间，index为2
            //positionY超过9452，index为3
            let length=this.themeTopYs.length

            // //普通做法
            // for(let i=0;i<length;i++) {
            //   if(this.currentIndex !== i && ((i<length-1 && positionY >= this.themeTopYs[i] && positionY
            //   <this.themeTopYs[i+1]) || (i === length - 1 && positionY > this.themeTopYs[i]))){
            //       this.currentIndex = i;
            //     //   console.log(this.currentIndex)
            //       this.$refs.nav.curIndex = this.currentIndex
            //   }
            // }

            //hack做法
            for(let i =0;i<length-1;i++){
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY
                <this.themeTopYs[i+1])){
                       this.currentIndex = i;
            //     //   console.log(this.currentIndex)
                 this.$refs.nav.curIndex = this.currentIndex
                }
            }
             
          this.listenShowBackTop(position)

        },
        // listenShowBackTop(position){
        //     this.listenShowBackTop = -position.y >BACK_POSITION
        // }
        addToCart(){
            //1.获取购物车需要展示的信息
            const product={}
            product.image=this.topImages[0];
            product.title=this.goods.title;
            product.desc=this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid=this.iid
            //2.将商品加入购物车(1.返回promise2.mapACTIONS)
            //this.$store.cartList.push(product)
            //this.$store.commit('addCart',product)
            // this.$store.dispatch('addCart',product).then(res=>{
            //     console.log(res)
            // })
            this.addCart(product).then(res=>{
                // console.log(res)
                this.$toast.show(res,2000)
                console.log(this.$toast)
            })
        }
    },
//      mounted() {
//         //3.监听item中图片的加载完成
//         const refresh=debounce(this.$refs.scroll.refresh,100)
//           this.itemImgListener=()=>{
//          refresh()}
//          this.$bus.$on('itemImageLoad',this.itemImgListener)
// } 
     
 destory(){
   
       //2.取消全局事件的监听
       this.$bus.$off('itemImageLoad',this.itemImgListener)
     } }
</script>

<style scoped>
  #detail{
      position: relative;
      z-index: 99;
      background: #fff;
      height: 100vh;
  }
  .detail-nav{
      position: relative;
      z-index: 99;
      background: #fff;
  }
  .content{
      height: calc(100% - 44px);
  }
   .back-top{
       position: fixed;
       right: 10px;
       bottom: 60px;
   }
   .back-top img{
       width: 50px;
       height: 50px;
   }
</style>