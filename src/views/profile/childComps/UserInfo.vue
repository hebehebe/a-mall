<template>
    <div id="user-info">
        <a href="#" class="clear-fix">
            <slot name="user-icon">
                <div class="privateImage-svg left">
           <img src="~assets/img/profile/avatar1.png" />
        </div> 
      </slot>
          <div class="login-info left">
              <slot name="user-nickname">
                  <div>登录/注册</div>
              </slot>
              <div class="phone">
                  
                 <img src="~assets/img/profile/phone.png" />
             
             <slot name="user-phone">暂无绑定手机号</slot>
              </div>
         
          </div>  
           <div class="go left">
               <img src="~assets/img/profile/go.png" />
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name:"UserInfo"
}
</script>

<style scoped>
#user-info{
    background-color: var(--color-tint);
    padding: 15px;
}
 .privateImage-svg{
     width: 60px;
     height: 60px;
  background-color: #f1f3f4;
     border-radius: 50%;
     border: 2px solid #ccc;
     margin-top: 5px;
 }
 .privateImage-svg img{
     width: 60%;
     height:60%;
   display: block;
     margin: 10px auto;
 }
 .left{
     float: left;
 }
 .login-info{
     color: #fff;
     
     margin: 10px 0 0 10px;
 }
.phone img{
    width: 28px;
    height: 28px;
    vertical-align: middle;
}
 .phone {
     font-size: 16px;
   
 }
 .go{
     width: 50px;
     height: 50px;
     float: right;

 }
 .go img{
     width:30px;
     height:30px;
     margin: 20px;
 }
</style>