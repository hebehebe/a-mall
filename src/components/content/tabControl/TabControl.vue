<template>
  <div class="tab-control">
    <div
      :class="{ active: index === curIndex }"
      :key="item"
      @click="tabControlClick(index)"
      class="tab-control-item"
      v-for="(item, index) in titles"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  methods: {
    tabControlClick(index) {
      this.curIndex = index;
      this.$emit('tabClick',index)
      
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  font-size: 17px;
  height: 44px;
  line-height: 44px;
}
.tab-control-item span {
  padding-bottom: 3px;
}
.active {
  color: #ff5777;
}

.active span {
  border-bottom: 2px solid #ff5777;
}
</style>