<template>
 <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <scroller class="home-scroller" ref="scroller" :probe-type="3" @scroll="getPostion">
      <home-swiper :cbanners="banners"/>
     </scroller>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from "./childComps/HomeSwiper"
import Scroller from "components/common/scroller/Scroller";

import {getHomeMultidata} from "network/home"
export default {
    name:"Home",
    
    components: {
     NavBar,
     Scroller,
     HomeSwiper,
     
  },
  data(){
    return{
      banners:[],
   
    }
  },
  created(){
    this.getHomeData()
  },
  methods:{
    getHomeData(){
          getHomeMultidata().then(res =>{
     this.banners=res.data.banners;
     console.log(res)
     
    })
    },
    getPostion(postion) {
   this.isShowBackTop = -postion.y > 300
  }
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
  }
    .home-scroller{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

</style>