<!--vanbar-->
<template>
  <van-nav-bar
    :left-text="Vanbar.leftText"
    :right-text="Vanbar.rightText"
    :left-arrow="Vanbar.arrow"
    :border="Vanbar.border"
    :fixed="Vanbar.fixed"
    :placeholder="Vanbar.placeholder"
    :z-index="Vanbar.zIndex"
    :safe-area-inset-top="Vanbar.safeAreaInsetTop"
    @click-left="clickLeft"
    @click-right="clickRight"
  >
    <template #title>
      <div>{{ Vanbar.title }}</div>
    </template>
    <template v-if="Vanbar.leftText === ''" #left>
      <van-icon
        v-if="!Vanbar.lefticon"
        :name="Vanbar.leftName"
        :size="Vanbar.leftSize"
        :color="Vanbar.leftColor"
      />
      <img
        v-else
        :src="Vanbar.leftimg"
        :style="Vanbar.leftStyle"
      />
    </template>
    <template v-if="Vanbar.rightText === ''" #right>
      <van-icon
        v-if="!Vanbar.rightIcon"
        :name="Vanbar.rightName"
        :size="Vanbar.rightSize"
      />
      <img
        v-else
        :src="Vanbar.rightimg"
        :style="Vanbar.rightStyle"
      />
    </template>
  </van-nav-bar>
</template>

<script>

export default {

  components: {},

  props: {
    meizhaoVanbar: {
      type: Object, default: () => { }
    }
  },

  data() {
    return {
      Vanbar: {
        title: '标题', // 标题
        leftText: '返回', // 左侧文字
        rightText: '前进', // 右侧文字
        arrow: true,
        border: false, // 是否显示下边框
        fixed: false, // 是否固定在顶部
        placeholder: false, // 固定在顶部时，是否在标签位置生成一个等高的占位元素
        zIndex: 1, // 导航栏 z-index
        safeAreaInsetTop: false, // 是否开启顶部安全区适配
        lefticon: false, // 是否开启左侧图标（默认开启）
        leftName: 'arrow-left', // 左侧图标名称
        leftSize: 18, // 左侧图标大小
        leftColor: null, // 左侧图标颜色
        leftimg: null, // 左侧自定义图标
        leftStyle: null, // 左侧自定义图标自定义样式
        rightIcon: false, // 是否开启右侧图标（默认开启）
        rightName: '', // 右侧图标名称
        rightSize: 18, // 右侧图标大小
        rightimg: null, // 右侧自定义图标
        rightStyle: null// 右侧自定义图标自定义样式
      }
    }
  },
  // 监听属性,类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    meizhaoVanbar: {
      handler: function(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(this.Vanbar)) {
          this.$nextTick(() => {
            this.Vanbar = Object.assign(this.Vanbar, val)
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
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
