<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
               :src="item" @load="imgLoad" alt="">
        </div>
    </div>
</template>


<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            counter:0,
            imagesLength:0
        }
    },
    methods:{
        imgLoad(){
            //判断所有图片都加载完了，进行一次回调就可以了
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad')
            }
        }
    },
    watch:{
        detailInfo(){
            //获取图片的个数
            this.imagesLength=this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
.goods-info{
    padding: 10px 0px;
    border-bottom: 5px solid #f2f5f8;
}
.info-desc{
    margin: 0 10px 0 10px;
    width: 100%;
    position: relative;
    
}
.start{
    width: 33%;
    height: 5px;
    border-bottom: 1px solid #c5c4c5;
    border-left: 6px solid #2f312f;
}
.end{
    width: 33%;
    height: 5px;
    border-bottom: 1px solid #c5c4c5;
    border-right: 6px solid #2f312f;
    position: absolute;
    bottom: 0;
    right: 30px;
}
.desc{
    padding: 8px 0;
    font-size: 15px;
   overflow: hidden;
}
.info-key{
    margin: 10px;
    font-size: 18px;
    font-weight: 600;
}
.info-list{
    margin-bottom: 6px;
    
}
.info-list img{
    width: 100%;
   
}
</style>