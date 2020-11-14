<template>
    <div class="shop-info">
        <div class="shop-top">
            <img :src="shop.logo">
            <span class="title">{{shop.name}}</span>
        </div>
        <div class="shop-middle">
         <div class="shop-middle-item shop-middle-left">
             <div class="info-sells">
                 <div class="sells-count">
                     {{shop.sells | sellCountFilter}}
                 </div>
                 <div class="sells-text">
                     总销量
                 </div></div>
                 <div class="info-goods">
                     <div class="goods-count">
                         {{shop.goodsCount}}
                     </div>
                     <div class="goods-text">
                         全部宝贝
                     </div>
                 </div>
             </div>
             <div class="shop-middle-item shop-middle-right">
                 <table>
                     <tr v-for="(item,index) in shop.score" :key="index">
                         <td>{{item.name}}</td>
                         <td class="score" :class="{scorebetter:item.isBetter}">{{item.score}}</td>
                         <td class="better" :class="{bettermore:item.isBetter}"><span>{{item.isBetter ? '高':'低'}}
                           </span></td>
                    </tr></table>
         </div>
        </div>
        <div class="shop-bottom">
            <div class="enter-shop">
                进店逛逛
            </div>
        </div>
    
    </div>

</template>

<script>
export default {
    name:"DetailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        sellCountFilter:function(value){
            if(value < 10000) return value;
            return(value/10000).toFixed(1)+'万'
        }
    }

}
</script>

<style scoped>
  .shop-info{
      padding: 25px 8px;
      border-bottom: 5px solid #f2f5f8;
      font-size: 15px;
      color: #af9a98;
  }

  .shop-top img{
      height: 50px;
      width: 50px;
      border-radius: 25px;
      border: 5px solid  #f2f2f2;
      vertical-align: middle;
  }
  .shop-top span{
      font-size: 17px;
      color: #9b9997;
      margin-left: 10px;
      font-weight: bold;
  }
  .shop-middle{
      display: flex;
      overflow: hidden;
      margin-top: 20px;
  }
  .shop-middle-left,.shop-middle-right{
      flex: 1;
  }
.shop-middle-left{
    border-right: 1px solid #9b9997;
   /*padding-right: 15px; */
   display: flex;
 
}
  /* .shop-middle-item {
      float: left;
      
  } */

.sells-count, .goods-count{
    font-size: 19px;
    text-align: center;
}
.info-sells,.info-goods{
      flex: 1;
    text-align: center;
    margin-top: 10px;
    
}
.shop-middle-right{
  
    margin-left: 15px;
}

.shop-middle-right table tr td{
     /* border: 1px solid black; */
    text-align: right;
    padding: 3px 3px 3px 3px;
}
.score,.better{
     color:#8fa87b;
}
  .scorebetter,.bettermore{
     color: #e79688;

  }

.better span{
    display: inline;
    color: white;
    background-color:#8fa87b ;
}
.bettermore span{
    display: inline;
    color: white;
    background-color: #e79688;
}
.enter-shop{
    width: 100px;
    height: 40px;
    margin: 10px auto;
    line-height:40px;
    text-align: center;
    background-color: #f4f5fb;
    font-weight: 700;
    border-radius: 10px;
}
</style>