<template>
    <div class="toast" v-show="isShow">
        <h2>{{message}}</h2>
    </div>
</template>

<script>
export default {
    name:"Toast",
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     }
    // },
    data(){
        return{
            message:' ',
            isShow:false
        }
    },
    methods:{
        show(message,duration=2000){
            this.isShow = true;
            this.message = message

            setTimeout(()=>{
                this.isShow = false;
                this.message = ' '
            },duration)
        }
    }
}
</script>

<style scoped>
     .toast{
         position: fixed;
         top: 50%;
         left: 50%;
         transform: translate(-50%,-50%);
         padding: 8px 10px;
         color: #fff;
         background-color: rgba(0,0,0,.6);
         z-index:99999;
         
     }
     .toast h2{
       font-size: 16px;
     }
</style>