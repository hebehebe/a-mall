<template>
      <div id="tabbar">
      <slot></slot>
      </div>
</template>
<script>
export default {
    name:'TabBar'
}
</script>

<style scoped>
#tabbar{
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0px -2px rgba(0, 0,0, .2);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14px;
  }


  </style>