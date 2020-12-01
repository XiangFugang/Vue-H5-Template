<!--PullRefresh-->
<template>
  <van-pull-refresh
    v-model="Loading"
    :head-height="headHeight"
    @refresh="onRefresh"
  >
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling>
      <slot name="pulling"></slot>
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <slot name="loosing"></slot>
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <slot name="loading"></slot>
    </template>
    <p>刷新次数: {{ count }}</p>
  </van-pull-refresh>
</template>

<script>

export default {

  components: {},

  props: {},

  data() {
    return {
      pullRefresh: {
        Loading: false, // 是否处于加载中状态
        pullingText: null, // 下拉过程提示文案
        loosingText: null, // 释放过程提示文案
        loadingText: null, // 加载过程提示文案
        successText: null, // 刷新成功提示文案
        successDuration: null, // 刷新成功提示展示时长(ms)
        animationDuration: null, // 动画时长
        headHeight: null, // 	顶部内容高度
        disabled: false // 是否禁用下拉刷新
      }
    }
  },
  // 监听属性,类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  methods: {},
  // 生命周期-创建之前
  beforeCreate() { },
  // 生命周期-创建完成（可以访问当前this实例）
  created() { },
  // 生命周期-挂载之前
  beforeMount() { },
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() { },
  // 生命周期-更新之前
  beforeUpdate() { },
  // 生命周期-更新之后
  updated() { },
  // 生命周期-销毁之前
  beforeDestroy() { },
  // 生命周期-销毁完成
  destroyed() { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() { }
}
</script>
<style lang="scss">
.aaaa {
  min-height:calc(100vh - 50px);
  .van-pull-refresh__track {
    min-height:calc(100vh - 50px);
  }
}
</style>
<style scoped lang='scss'>
</style>
