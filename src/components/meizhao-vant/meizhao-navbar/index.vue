<!--name-->
<template>
  <div class="meizhao-vanbar">
    <van-nav-bar
      :left-text="meizhaoVanbar.leftText"
      :right-text="meizhaoVanbar.rightText"
      :left-arrow="meizhaoVanbar.leftArrow"
      :border="meizhaoVanbar.border"
      :fixed="meizhaoVanbar.fixed"
      :placeholder="meizhaoVanbar.placeholder"
      :z-index="meizhaoVanbar.zIndex"
      :safe-area-inset-top="meizhaoVanbar.safeAreaInsetTop"
      @click-left="clickLeft"
      @click-right="clickRight"
    >
      <template #title>
        <div>{{ meizhaoVanbar.title }}</div>
      </template>
      <template #left>
        <van-icon v-if="meizhaoVanbar.leftIcon" :name="meizhaoVanbar.leftName" :size="meizhaoVanbar.leftSize" />
        <img v-if="meizhaoVanbar.leftImg" :src="meizhaoVanbar.leftimg">
      </template>
      <template #right>
        <van-icon v-if="meizhaoVanbar.rightIcon" :name="meizhaoVanbar.rightName" :size="meizhaoVanbar.rightSize" />
        <img v-if="meizhaoVanbar.rightImg" :src="meizhaoVanbar.rightimg">
      </template>
    </van-nav-bar>
  </div>
</template>

<script>

export default {

  components: {},

  props: {
    meizhaoVanbar: { type: Object, default: () => { } }
  },

  data() {
    return {

    }
  },
  // 监听属性,类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  methods: {
    clickLeft(value) {
      this.$emit('clickLeft')
    },
    clickRight(value) {
      this.$emit('clickRight')
    }
  },
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
<style scoped lang='scss'>
</style>
