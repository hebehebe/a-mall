<template>
    
        <swiper class="detail-swiper">
            <swiper-item v-for="item in topImages">
                <img :src="item" @load="imgLoad"
                alt=""/>
            </swiper-item>
        </swiper>
    
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:"DetailSwiper",
    components:{
          Swiper,
          SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        imgLoad(){
            this.$emit('simgLoad')
        }
    }
}
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>