<template>
  <grid-view class="grid-view">
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
 import GoodsListItem from "components/content/goods/GoodsListItem"

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
.grid-view{
   display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /* background-color: var(--color-background); */
    padding: 2px;
}
</style>
