<!-- 城市店铺管理首页-->
<template>
  <div class="ShopHomepage">
    <div class="ShopHomepage-haed">
      <div class="haed-content">
        <div class="icon">
          <img src="../../assets/img/shop/notice.png" />
        </div>
        <div class="text">
          <div class="characters">{{ loopList[time].text }}</div>
        </div>
      </div>
    </div>
    <div class="log-text">
      <div class="icon">
        <img src="../../assets/img/shop/marshalling.png" />
      </div>
      <div class="text">入驻优势</div>
      <div class="icon">
        <img src="../../assets/img/shop/marshalling.png" />
      </div>
    </div>
    <div class="text-explain">尊享门店专属权益，打造没找明星店铺</div>
    <div class="list">
      <div class="list-card" v-for="item in list" :key="item.name">
        <div class="icon">
          <img :src="item.icon" />
        </div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="explain">{{ item.explain }}</div>
        </div>
      </div>
    </div>
    <div class="botton">
      <div class="botton-agreement">
        <div class="icon" @click="isagreeClick">
          <div class="circular" v-show="isagree"></div>
        </div>
        <div class="requirement">同意并遵守</div>
        <div class="agreement-content" @click="goAgreement">《POI信息服务协议》</div>
      </div>
      <div class="Button" @click="clickright">免费申请店铺</div>
    </div>
  </div>
</template>

<script>

export default {

  components: {},

  props: {},

  data() {
    return {
      isagree: true, // 协议开关
      time: 0, // 记录当前是第几条滚动文字
      animationNoticeBar: null // 定时器id
    }
  },
  // 监听属性,类似于data概念
  computed: {
    list() {
      const array = [
        {
          icon: require('../../assets/img/shop/exposure.png'),
          name: '精准曝光',
          explain: '根据门店地址精准触达目标人群'
        },
        {
          icon: require('../../assets/img/shop/drainage.png'),
          name: '店铺引流',
          explain: '没找百万用户为门店带来巨大流量'
        },
        {
          icon: require('../../assets/img/shop/Telephone.png'),
          name: '联系电话',
          explain: '展示联系方式生意直接触达'
        },
        {
          icon: require('../../assets/img/shop/expect.png'),
          name: '敬请期待',
          explain: '更多权益正在路上'
        }
      ]
      return array
    },
    loopList() {
      const loop = [
        { text: '苏州****精品民宿入驻成功' },
        { text: '成都维***酒店入住成功' },
        { text: '北京汉都***入住成功' },
        { text: '上海御***连锁酒店入住成功' },
        { text: '成都国****乐园入住成功' },
        { text: '成都音****花谷入住成功' },
        { text: '成都中***健身工作室入住成' },
        { text: '成都天****KTV入住成功' }
      ]
      return loop
    }
  },
  // 监控data中的数据变化
  watch: {},
  methods: {
    // 免费申请店铺
    clickright() {
      if (this.isagree) {
        this.$router.push({
          name: 'shopadd'
        })
        this.$store.commit('setisaddgree', true)
      }
    },

    // 协议页面跳转
    goAgreement() {
      this.$router.push({ name: 'shopagreement', params: { shopagreement: 'shopagreement' }})
    },

    // 协议开关
    isagreeClick() {
      this.isagree = !this.isagree
    },

    // 文字滚动条时间控制切换内容
    NoticeBar() {
      this.animationNoticeBar = setInterval(() => {
        if (this.time <= 7) {
          this.time += 1
        } else {
          this.time = 0
        }
      }, 8000)
    }
  },
  // 生命周期-创建之前
  beforeCreate() { },
  // 生命周期-创建完成（可以访问当前this实例）
  created() { },
  // 生命周期-挂载之前
  beforeMount() { },
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {
    this.NoticeBar()
  },
  // 生命周期-更新之前
  beforeUpdate() { },
  // 生命周期-更新之后
  updated() { },
  // 生命周期-销毁之前
  beforeDestroy() {
    clearInterval(this.animationNoticeBar)
  },
  // 生命周期-销毁完成
  destroyed() { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() { }
}
</script>
<style scoped lang='scss'>
.ShopHomepage {
  min-height: 100vh;
  background: linear-gradient(180deg, #16004a 0%, #01003c 100%);
  position: relative;
  .ShopHomepage-haed {
    width: 100%;
    height: 120px;
    background: url(../../assets/img/shop/banner.png) no-repeat;
    background-size: cover;
    .haed-content {
      display: flex;
      align-items: center;
      background: rgba($color: #000, $alpha: 0.3);
      // opacity: 0.9;
      padding-left: 10px;
      height: 28px;
      .icon {
        width: 12px;
        height: 13.26px;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
      .text {
        margin-left: 4px;
        width: calc(100% - 4px);
        height: 17px;
        position: relative;
        overflow: hidden;
        .characters {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #fff;
          animation: NewsRotation 8s linear infinite;
          position: absolute;
          left: 0px;
          top: 50%;
          margin-top: -7.5px;
        }
        @keyframes NewsRotation {
          from {
            left: 100%;
          }
          to {
            left: -100%;
          }
        }
      }
    }
  }
  .log-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 27px;
    .icon {
      width: 24px;
      height: 15.2px;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .text {
      font-size: 18px;
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #fff;
      line-height: 25px;
      margin: 0 5px;
    }
  }
  .text-explain {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #cccccc;
    line-height: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    text-align: center;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .list-card {
      width: 50%;
      display: flex;
      margin-top: 40px;
      .icon {
        width: 50px;
        height: 50px;
        padding-left: 10px;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 5px;
        width: calc(100% - 60px);
        .name {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: #fff;
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .explain {
          width: 108px;
          font-size: 10px;
          font-weight: 400;
          line-height: 14px;
          color: #cccccc;
          font-family: PingFangSC-Regular, PingFang SC;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .botton {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .botton-agreement {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 11px;
        height: 11px;
        border: 2px solid rgba($color: #f17d07, $alpha: 0.3);
        border-radius: 50%;
        position: relative;
        .circular {
          width: 8px;
          height: 8px;
          background: #f17d07;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -4px;
          margin-top: -4px;
        }
      }
      .requirement {
        font-size: 12px;
        font-weight: 400;
        color: #bababa;
        line-height: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        margin: 0 4px;
      }
      .agreement-content {
        font-size: 12px;
        font-weight: 400;
        color: #f88500;
        line-height: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .Button {
      text-align: center;
      background-image: linear-gradient(to right, #8325e1, #4f04e0);
      width: calc(100% - 40px);
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      border-radius: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
}
</style>
