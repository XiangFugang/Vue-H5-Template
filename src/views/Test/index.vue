<!--测试-->
<template>
  <div class="Test">
    <div class="shell"></div>
  </div>
</template>

<script>

export default {

  components: {},

  props: {},

  data() {
    return {

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
<style scoped lang='scss'>
.Test {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .shell {
    width: 180px;
    height: 180px;
    // margin: 50px auto;
    position: relative;
    border-radius: 35%;
    box-shadow: 40px 40px 10px 10px rgba(0,0,0,0.3);
  }
  .shell::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 20px;
    width: 180px;
    height: 160px;
    background: #cccccc;
    border-top-left-radius: 20px 100px;
    border-top-right-radius: 20px 100px;
    border-bottom-left-radius: 20px 100px;
    border-bottom-right-radius: 20px 100px;
  }
  .shell::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 10px;
    width: 160px;
    height: 180px;
    background: #cccccc;
    border-top-left-radius: 100px 20px;
    border-top-right-radius: 100px 20px;
    border-bottom-left-radius: 100px 20px;
    border-bottom-right-radius: 100px 20px;
  }
}
</style>
