<template>
  <div class="info-wrap">
    <div class="goods-info1">
      <div v-if="isUpdate" class="save-btn">
        <span class="text-btn" @click="handleSubmit">完成</span>
      </div>
      <div class="input-field">
        <span class="label">名称</span>
        <textarea
          v-model="form.goodsName"
          class="input-area"
          placeholder="请输入商品名称"
          placeholder-class="placeholder-part"
        ></textarea>
      </div>
      <!-- <swiper class="img-block" :current="imgIdx" @change="handleSwpierChange">
        <swiper-item v-for="(item,idx) in imgList" :key="idx">
          <div class="swiper-item-block">
            <img
              v-if="!item.url"
              key="1"
              src="/static/assets/icon/i21.png"
              mode="aspectFit"
              class="bg-icon"
              @click="uploadGoodsImg(item.key)"
            />
            <div v-else key="2" class="img-preview">
              <img :src="item.url" mode="aspectFit" class="goods-img" />
              <span
                class="delete-icon"
                @click="deleteGoodsImg(item.key)"
              >&times;</span>
              <img
                src="/static/assets/icon/i21.png"
                mode="aspectFit"
                class="add-more"
                @click="uploadGoodsImg('next')"
              />
            </div>
          </div>
        </swiper-item>
      </swiper> -->
      <div class="img-goods">
        <p>如上传视频默认第一张为商品视频</p>
        <div class="img-content">
          <div v-for="(item, idx) in imgList" :key="idx">
            <div class="item" v-if="item.url">
              <img :src="item.url" mode="aspectFill" class="goods-img" />
              <span class="delete-icon" @click="deleteGoodsImg(item.key)">&times;</span>
            </div>
          </div>
          <div class="img-preview">
            <img src="/static/assets/icon/i21.png" mode="aspectFill" class="add-more" @click="uploadGoodsImg1" />
            <p>1:1大小</p>
            <p>最多上传5张主图</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="cell-block">
      <i-cell-group>
        <i-cell title="选择类目" is-link></i-cell>
      </i-cell-group>
    </div>-->
    <div class="goods-info2">
      <radio-group class="radio-block" @change="handleGoodsKindChange">
        <span v-for="item in goodsKindList" :key="item.value" class="radio">
          <radio
            :value="item.value"
            :checked="item.value === form.goodsKind"
            :disabled="isUpdate ? true : item.disabled"
            color="#579af2"
          />
          {{ item.name }}
        </span>
      </radio-group>
      <!-- <div
        v-for="(item,idx) in infoList1"
        :key="idx"
        class="input-field"
      >-->
      <div v-for="(item, idx) in infoList1Computed" :key="idx" class="input-field">
        <span class="label">{{ item.label }}</span>
        <input v-model="form[item.key]" class="input-block" type="digit" />
        <span class="unit">{{ item.unit }}</span>
      </div>
    </div>

    <div class="goods-info3">
      <div v-for="(specForm, index) in specFormList" :key="index" class="goods-spec-block">
        <div class="spec-delete">
          <span class="delete-spec-btn" @click="handleDeleteGoodsSpec(index)">&times;</span>
        </div>
        <div class="input-field">
          <span class="label">规格名</span>
          <input v-model="specForm.goodsSpecName" class="input-block" type="text" />
        </div>
        <div v-for="(item, idx) in specIptList" :key="idx" class="input-field">
          <span class="label">{{ item.label }}</span>
          <input v-model="specForm[item.key]" class="input-block" type="digit" />
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
      <div class="add-spec" v-if="form.goodsKind === 'INTEGRAL' ? false : true">
        <span class="plus-icon" @click="handleAddGoodsSpec">添加规格</span>
      </div>
    </div>

    <div class="goods-info4">
      <div class="cell-block">
        <i-cell-group>
          <i-cell title="选择商品类型" :value="goodsTypeNameShow" is-link @click="showType = true"></i-cell>
        </i-cell-group>
      </div>
      <div class="cell-block">
        <i-cell-group>
          <i-cell title="选择运费模板" :value="goodsExpressNameShow" is-link @click="showExpress = true"></i-cell>
        </i-cell-group>
      </div>
      <div class="cell-block">
        <i-cell-group>
          <i-cell title="商品详情" is-link url="/pages/shop-management/goods-management/describe-img/main"></i-cell>
        </i-cell-group>
      </div>
      <div class="input-field">
        <span class="label">商品描述</span>
        <textarea
          v-model="form.goodsDescribe"
          v-if="!showExpress === false ? false : !showType === false ? false : true"
          class="input-area"
          :class="{ higher: isUpdate }"
          placeholder="请输入商品描述"
          placeholder-class="placeholder-part"
        ></textarea>
      </div>
    </div>

    <div v-if="!isUpdate" key="1" class="submit-block">
      <button class="btn-round-blue" @click="handleSubmit">完成</button>
    </div>
    <div v-else key="2" class="submit-block fixed">
      <button
        class="fixed-btn shelf-btn"
        :class="{ down: isShelf === '1' }"
        size="mini"
        @click="handleUpdateShelfState"
      >
        {{ isShelf === '1' ? '下架' : '上架' }}
      </button>
      <button class="fixed-btn delete-btn" size="mini" @click="handleDeleteGoods">删除</button>
    </div>

    <div class="popup-window" :class="{ show: showType }">
      <div class="bottom-block">
        <div class="title-bar">
          <h1 class="title">商品分类</h1>
          <button class="title-btn" size="mini" @click="handleSelectGoodsType">确认</button>
        </div>
        <div class="select-list">
          <i-radio-group :current="goodsTypeName" @change="handleChangeGoodsType">
            <div v-for="(item, idx) in goodsTypeList" :key="idx" class="radio-line">
              <i-radio :value="item.goodsTypeName"></i-radio>
              <button class="small-delete-btn" size="mini" @click="handleDeleteGoodsType(idx)">删除</button>
            </div>
          </i-radio-group>
        </div>
        <div class="add-new">
          <span class="plus-icon" @click="showNewTypeForm = true">新建商品类型</span>
        </div>
      </div>
    </div>
    <div class="popup-window" :class="{ show: showExpress }">
      <div class="bottom-block">
        <div class="title-bar">
          <h1 class="title">运费模板</h1>
          <button class="title-btn" size="mini" @click="handleSelectGoodsExpress">确认</button>
        </div>
        <div class="select-list">
          <i-radio-group :current="goodsExpressName" @change="handleChangeGoodsExpress">
            <div v-for="(item, idx) in goodsExpressList" :key="idx" class="radio-line">
              <i-radio :value="item.expressName"></i-radio>
              <p class="tip ellipsis">
                <span class="first">初始金额:{{ item.firstFee }}</span>
                <span>叠加金额:{{ item.addFee }}</span>
              </p>
              <button class="small-delete-btn" size="mini" @click="handleDeleteGoodsExpress(idx)">删除</button>
            </div>
          </i-radio-group>
        </div>
        <div class="add-new">
          <span class="plus-icon" @click="showNewExpressForm = true">新建运费模板</span>
        </div>
      </div>
    </div>
    <div class="fixed-form" :class="{ show: showNewTypeForm }">
      <div class="form-wrap">
        <input
          v-model="goodsTypeForm.goodsTypeName"
          class="input-block-plain"
          type="text"
          placeholder="请输入类型名称(建议4个字)"
          placeholder-class="placeholder-part"
        />
        <div class="action-field">
          <button class="action-btn confirm-btn" size="mini" @click="addGoodsType">确认</button>
          <button class="action-btn cancel-btn" size="mini" @click="cancelGoodsType">取消</button>
        </div>
      </div>
    </div>
    <div class="fixed-form" :class="{ show: showNewExpressForm }">
      <div class="form-wrap">
        <div class="express-name">
          <p class="label">模板名称</p>
          <input
            v-model="goodsExpressForm.expressName"
            class="input-block-plain"
            type="text"
            placeholder="请输入模板名称"
            placeholder-class="placeholder-part"
          />
        </div>
        <div class="inline-field">
          <span class="label">初始金额</span>
          <input
            v-model="goodsExpressForm.firstFee"
            class="input-block-plain"
            type="digit"
            placeholder="请输入初始金额"
            placeholder-class="placeholder-part"
          />
          <span class="unit">￥</span>
        </div>
        <div class="inline-field">
          <span class="label">叠加金额</span>
          <input
            v-model="goodsExpressForm.addFee"
            class="input-block-plain"
            type="digit"
            placeholder="请输入叠加金额"
            placeholder-class="placeholder-part"
          />
          <span class="unit">￥</span>
        </div>
        <div class="inline-field switch">
          <span>不包邮</span>
          <i-switch
            v-model="goodsExpressForm.isFree"
            style="margin: 0 5px"
            size="small"
            @change="handleExpressFreeSwitch"
          ></i-switch>
          <span>包邮</span>
        </div>
        <div class="action-field">
          <button class="action-btn confirm-btn" size="mini" @click="addGoodsExpress">确认</button>
          <button class="action-btn cancel-btn" size="mini" @click="cancelGoodsExpress">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentPageParams } from '@/utils'
import {
  FIND_SHOP_GOODS_INFO,
  UPLOAD_IMAGE2,
  FIND_SHOP_GOODS_SPECIFICATION_LIST,
  FIND_SHOP_GOODS_TYPE_LIST,
  FIND_SHOP_EXPRESS_TEMPLATE_LIST,
  DELETE_SHOP_GOODS_TYPE,
  DELETE_SHOP_EXPRESS_TEMPLATE,
  DELETE_SHOP_GOODS_SPECIFICATION,
  ADD_SHOP_GOODS_SPECIFICATION,
  UPDATE_SHOP_GOODS_SPECIFICATION,
  ADD_SHOP_GOODS_TYPE,
  ADD_SHOP_EXPRESS_TEMPLATE,
  ADD_SHOP_GOODS_INFO,
  UPDATE_SHOP_GOODS_INFO,
  DELETE_SHOP_GOODS_INFO
} from '@/api'

export default {
  components: {},
  props: {},
  data() {
    return {
      keys: '',
      goodsNo: '',
      imgIdx: 0,
      form: { goodsImg: '', img1: '', img2: '', img3: '', img4: '' },
      list1: ['goodsImg', 'img1', 'img2', 'img3', 'img4'],
      goodsKindList: [
        { name: '普通商品', value: 'NORMAL', disabled: false },
        { name: '积分商品', value: 'INTEGRAL', disabled: false },
        { name: '豆豆商品', value: 'PENSION', disabled: true }
      ],
      infoList1: [
        { label: '原价', key: 'goodsAmount', unit: '元' },
        {
          label: '折扣价',
          key: 'goodsDiscount',
          unit: '元'
        },
        { label: '库存', key: 'goodsStock', unit: '件' },
        { label: '成本价', key: 'goodsCost', unit: '元' }
      ],
      infoList2: [
        { label: '原价', key: 'goodsSpecAmount', unit: '元', filter: 'NORMAL' },
        {
          label: '折扣价',
          key: 'goodsSpecDiscount',
          unit: '元',
          filter: 'NORMAL'
        },
        {
          label: '积分价',
          key: 'integralAmount',
          unit: '元',
          filter: 'INTEGRAL'
        },
        {
          label: '豆豆价',
          key: 'pensionAmount',
          unit: '元',
          filter: 'PENSION'
        },
        {
          label: '成本价',
          key: 'goodsSpecCost',
          unit: '元',
          filter: 'INTEGRAL_PENSION'
        },
        { label: '库存', key: 'goodsSpecStock', unit: '件' }
      ],
      isShelf: '1',
      specListStorage: [],
      specFormList: [],
      goodsTypeList: [],
      goodsTypeNameShow: '',
      goodsTypeName: '',
      goodsExpressList: [],
      goodsExpressNameShow: '',
      goodsExpressName: '',
      showType: false,
      showExpress: false,
      showNewTypeForm: false,
      showNewExpressForm: false,
      goodsTypeForm: {},
      goodsExpressForm: { isFree: false }
    }
  },
  computed: {
    isUpdate() {
      return !!this.goodsNo
    },
    imgList() {
      const base = []

      const urlList = this.list1.map(key => {
        if (this.form[key] && this.form[key] !== 'NULL') {
          return this.form[key]
        } else {
          return ''
        }
      })

      this.list1.forEach((key, idx, arr) => {
        const url = urlList[idx]

        const end = urlList.filter((_, i) => i > idx && _)

        if (url || key === 'goodsImg' || end.length) {
          const next = this.list1[idx + 1]
          base.push({ key, url, next })
        }
      })
      return base
    },
    specIptList() {
      const reg = new RegExp(this.form.goodsKind)
      return this.infoList2.filter(_ => {
        return !_.filter || reg.test(_.filter)
      })
    },
    infoList1Computed() {
      const arr1 = [
        { label: '原价', key: 'goodsAmount', unit: '元' },
        {
          label: '折扣价',
          key: 'goodsDiscount',
          unit: '元'
        },
        { label: '库存', key: 'goodsStock', unit: '件' }
      ]
      const arr2 = [
        { label: '成本价', key: 'goodsCost', unit: '元' },
        { label: '库存', key: 'goodsStock', unit: '件' }
      ]
      if (this.form.goodsKind === 'INTEGRAL') {
        return arr2
      } else {
        return arr1
      }
    }
  },
  watch: {},
  created() { },
  mounted() { },
  onShow() {
    // this.initPage()
    this.showType = false // 2019/3/14修改
    this.showExpress = false // 2019/2/12修改
  },
  onReady() {
    this.initPage()
  }, // 2019/2/11加上的
  methods: {
    initPage() {
      this.form = {
        expressId: '',
        goodsAmount: '',
        goodsDescribe: '',
        goodsDiscount: '',
        goodsImg: '',
        goodsKind: 'NORMAL',
        goodsName: '',
        goodsStock: '',
        goodsTypeName: '',
        goodsTypeId: '',
        img1: '',
        img2: '',
        img3: '',
        img4: ''
      }
      this.goodsTypeNameShow = ''
      this.goodsExpressNameShow = ''

      this.goodsNo = getCurrentPageParams('goodsNo')
      this.imgIdx = 0
      this.specFormList = []

      this.getGoodsTypeList()
      this.getGoodsExpressList()
      if (this.goodsNo) {
        this.getGoodsInfo()
      }
    },

    handleSwpierChange(e) {
      const val = e.target.current
      this.imgIdx = val
    },
    handleGoodsKindChange(e) {
      const val = e.target.value
      this.form.goodsKind = val
    },
    handleAddGoodsSpec() {
      const obj = {
        goodsSpecAmount: '',
        goodsSpecDiscount: '',
        goodsSpecName: '',
        goodsSpecStock: ''
      }
      this.specFormList.push(obj)
    },
    handleDeleteGoodsSpec(idx) {
      const vm = this
      const obj = vm.specFormList[idx]
      if (vm.isUpdate && obj.goodsSpecId) {
        vm
          .$dialog('确定要删除吗？')
          .then(r => {
            vm.deleteGoodsSpec(obj.goodsSpecId)
          })
          .catch(() => {
            // cancel
            // do nothing
          })
      } else {
        vm.specFormList.splice(idx, 1)
      }
    },
    handleChangeGoodsType(e) {
      const val = e.target.value
      this.goodsTypeName = val
    },
    handleSelectGoodsType() {
      this.goodsTypeNameShow = this.goodsTypeName
      this.showType = false
    },
    handleChangeGoodsExpress(e) {
      const val = e.target.value
      this.goodsExpressName = val
    },
    handleSelectGoodsExpress() {
      this.goodsExpressNameShow = this.goodsExpressName
      this.showExpress = false
    },
    handleDeleteGoodsType(idx) {
      const vm = this
      const obj = vm.goodsTypeList[idx]
      vm
        .$dialog('确定要删除吗？')
        .then(r => {
          vm.deleteGoodsType(obj.goodsTypeId)
        })
        .catch(() => {
          // cancel
          // do nothing
        })
    },
    handleDeleteGoodsExpress(idx) {
      const vm = this
      const obj = this.goodsExpressList[idx]
      vm
        .$dialog('确定要删除吗？')
        .then(r => {
          vm.deleteGoodsExpress(obj.expressId)
        })
        .catch(() => {
          // cancel
          // do nothing
        })
    },
    handleExpressFreeSwitch(e) {
      const val = e.target.value
      this.goodsExpressForm.isFree = val
    },
    handleUpdateShelfState() {
      const state = this.isShelf === '1' ? '0' : '1'
      this.updateGoodsShelfState(state)
    },
    handleDeleteGoods() {
      const vm = this

      vm
        .$dialog('确定要删除该商品吗？')
        .then(r => {
          vm.deleteGoodsInfo()
        })
        .catch(() => {
          // cancel
          // do nothing
        })
    },
    handleSubmit() {
      const vm = this

      const specFlag = vm.specFormList.filter(_ => !_.goodsSpecName).length
      if (!vm.form.goodsName || specFlag) {
        vm.$toast('前先完成表单')
        return false
      } else if (!vm.form.goodsImg || vm.form.goodsImg === 'NULL') {
        vm.$toast('请上传商品第一张图')
        return false
      }

      if (vm.isUpdate) {
        const { add, update } = vm.findDifferentSpec()
        add.forEach(obj => {
          obj.goodsNo = vm.goodsNo
          vm.addGoodsSpec(obj)
        })
        update.forEach(obj => {
          vm.updateGoodsSpec(obj)
        })

        vm.updateGoodsInfo()
      } else {
        vm.addGoodsInfo()
      }
    },

    getGoodsInfo() {
      const vm = this

      FIND_SHOP_GOODS_INFO(vm.goodsNo)
        .then(r => {
          if (r.data.code === '0') {
            vm.form = r.data.data
            vm.getGoodsSpecInfo()
            vm.printPage()

            vm.$cookie.set('describe-img1', r.data.data)
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    getGoodsSpecInfo() {
      const vm = this

      FIND_SHOP_GOODS_SPECIFICATION_LIST(vm.goodsNo)
        .then(r => {
          if (r.data.code === '0') {
            vm.specFormList = r.data.data
            vm.specListStorage = r.data.data.map(_ => ({ ..._ }))
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    getGoodsTypeList() {
      const vm = this

      FIND_SHOP_GOODS_TYPE_LIST(vm.$store.state.account.shopId, 0)
        .then(r => {
          if (r.data.code === '0') {
            vm.goodsTypeList = r.data.data.sort((a, b) => a.sort - b.sort)
            if (vm.goodsTypeList.length) {
              const name = vm.goodsTypeList[0].goodsTypeName
              const names = vm.goodsTypeList.map(_ => _.goodsTypeName)
              if (!names.includes(vm.goodsTypeName)) {
                vm.goodsTypeNameShow = name
                vm.goodsTypeName = name
              }
            }
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    getGoodsExpressList() {
      const vm = this

      FIND_SHOP_EXPRESS_TEMPLATE_LIST(vm.$store.state.account.shopId)
        .then(r => {
          if (r.data.code === '0') {
            vm.goodsExpressList = r.data.data
            if (vm.goodsExpressList.length) {
              const name = vm.goodsExpressList[0].expressName
              const names = vm.goodsExpressList.map(_ => _.expressName)
              if (!names.includes(vm.goodsExpressName)) {
                vm.goodsExpressNameShow = name
                vm.goodsExpressName = name
              }
            }
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    uploadGoodsImg(key) {
      const vm = this
      if (key === 'next') {
        key = vm.list1.filter(_ => !vm.form[_])[0]
      }
      if (!key) {
        return false
      }

      UPLOAD_IMAGE2()
        .then(r => {
          const res = JSON.parse(r.data)
          if (res.code === '0') {
            vm.form[key] = res.data.imgPath
          } else {
            vm.$toast(res.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    uploadGoodsImg1() {
      // let r = this.imgList.filter(item => {
      //   return item.url === ''
      // })
      // console.log(r, '过滤过后的')
      const vm = this
      let key = ''
      if (vm.keys) {
        key = vm.key
      } else {
        key = vm.list1.filter(_ => !vm.form[_])[0]
      }
      console.log(key, 'key')
      UPLOAD_IMAGE2()
        .then(r => {
          const res = JSON.parse(r.data)
          if (res.code === '0') {
            vm.form[key] = res.data.imgPath
          } else {
            vm.$toast(res.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    deleteGoodsImg(key) {
      console.log(key, 'keydd')
      this.keys = key
      this.form[key] = 'NULL'
      const end = this.imgList.length - 1
      if (this.imgIdx > end) {
        this.imgIdx = end < 0 ? 0 : end
      }
    },
    addGoodsSpec(params) {
      const vm = this

      ADD_SHOP_GOODS_SPECIFICATION(params)
        .then(r => {
          if (r.data.code === '0') {
            // do nothing
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    updateGoodsSpec(params) {
      const vm = this

      UPDATE_SHOP_GOODS_SPECIFICATION(params)
        .then(r => {
          if (r.data.code === '0') {
            // do nothing
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    deleteGoodsSpec(id) {
      const vm = this

      DELETE_SHOP_GOODS_SPECIFICATION(id)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.$toast('删除成功')
            vm.getGoodsSpecInfo()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    addGoodsType() {
      const vm = this
      console.log(vm.goodsTypeForm)
      const params = {
        ...vm.goodsTypeForm,
        shopId: vm.$store.state.account.shopId,
        parentId: 0,
        sort: vm.goodsTypeList.length + 1
      }

      ADD_SHOP_GOODS_TYPE(params)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.$toast('添加成功')
            vm.getGoodsTypeList()
            vm.cancelGoodsType()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    cancelGoodsType() {
      this.showNewTypeForm = false
      // this.goodsTypeForm.goodsTypeName = ''
      this.goodsTypeForm = {}
    },
    deleteGoodsType(id) {
      const vm = this

      DELETE_SHOP_GOODS_TYPE(id)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.$toast('删除成功')
            vm.getGoodsTypeList()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    addGoodsExpress() {
      const vm = this

      const params = {
        ...vm.goodsExpressForm,
        isDefault: 'N',
        shopId: vm.$store.state.account.shopId
      }
      params.addFee = vm.goodsExpressForm.addFee * 1
      params.firstFee = vm.goodsExpressForm.firstFee * 1
      params.isFree = vm.goodsExpressForm.isFree ? 'Y' : 'N'

      ADD_SHOP_EXPRESS_TEMPLATE(params)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.$toast('添加成功')
            vm.getGoodsExpressList()
            vm.cancelGoodsExpress()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    cancelGoodsExpress() {
      this.showNewExpressForm = false
      this.goodsExpressForm = { isFree: false }
    },
    deleteGoodsExpress(id) {
      const vm = this

      DELETE_SHOP_EXPRESS_TEMPLATE(id)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.$toast('删除成功')
            vm.getGoodsExpressList()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    addGoodsInfo() {
      const vm = this

      const params = {
        ...vm.formatGoodsForm(),
        goodsSpecList: vm.formatSpecList(),
        shopId: vm.$store.state.account.shopId
      }

      if (getCurrentPageParams('goodsTypeId')) {
        params.goodsTypeId = getCurrentPageParams('goodsTypeId')
      }

      ADD_SHOP_GOODS_INFO(params)
        .then(r => {
          if (r.data.code === '0') {
            vm.afterGoodsInfoChange()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    updateGoodsInfo() {
      const vm = this

      const params = {
        ...vm.formatGoodsForm(),
        shopId: vm.$store.state.account.shopId
      }

      if (getCurrentPageParams('goodsTypeId')) {
        params.goodsTypeId = getCurrentPageParams('goodsTypeId')
      }

      UPDATE_SHOP_GOODS_INFO(params)
        .then(r => {
          if (r.data.code === '0') {
            vm.afterGoodsInfoChange()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    deleteGoodsInfo() {
      const vm = this

      DELETE_SHOP_GOODS_INFO(vm.goodsNo)
        .then(r => {
          if (r.data.code === '0' && r.data.data) {
            vm.afterGoodsInfoChange()
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    afterGoodsInfoChange() {
      this.$toast('操作成功')
      this.$router.go(-1)
      // this.initPage() // 2019/3/14添加
    },
    updateGoodsShelfState(state) {
      const vm = this

      const params = {
        isShelf: state,
        goodsNo: vm.goodsNo,
        shopId: vm.$store.state.account.shopId
      }

      UPDATE_SHOP_GOODS_INFO(params)
        .then(r => {
          if (r.data.code === '0') {
            vm.$toast('操作成功')
            vm.isShelf = state
          } else {
            vm.$toast(r.data.message)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },

    printPage() {
      const { goodsTypeName, isShelf } = this.form

      this.isShelf = isShelf
      this.goodsTypeName = goodsTypeName
      this.goodsTypeNameShow = goodsTypeName
    },
    formatSpecList() {
      const kind = this.form.goodsKind
      const price = [
        'goodsSpecAmount',
        'goodsSpecCost',
        'goodsSpecDiscount',
        'goodsSpecStock',
        'integralAmount',
        'pensionAmount'
      ]
      return this.specFormList.map(_ => {
        const obj = { ..._ }
        price.forEach(key => {
          obj[key] = _[key] * 1 || 0
          switch (kind) {
            case 'NORMAL':
              obj.goodsSpecCost = 0
              obj.integralAmount = 0
              obj.pensionAmount = 0
              break
            case 'INTEGRAL':
            case 'PENSION':
              obj.goodsSpecAmount = 0
              obj.goodsSpecDiscount = 0
              break

            default:
              // do nothing
              break
          }
        })
        return obj
      })
    },
    findDifferentSpec() {
      const realSpecList = this.formatSpecList()
      const newSpecList = realSpecList.filter(_ => !_.goodsSpecId)
      const updateSpecList = realSpecList.filter((_, idx) => {
        if (_.goodsSpecId) {
          const old = this.specListStorage[idx]
          for (const key in old) {
            if (old[key] !== _[key]) {
              return true
            }
          }
        }
      })

      return {
        add: newSpecList,
        update: updateSpecList
      }
    },
    formatGoodsForm() {
      const form = { ...this.form }
      const moreImg = this.$cookie.get('describe-img2')
      if (moreImg) {
        Object.assign(form, moreImg)
      }
      const type = this.goodsTypeList.filter(
        _ => _.goodsTypeName === this.goodsTypeNameShow
      )[0]
      const express = this.goodsExpressList.filter(
        _ => _.expressName === this.goodsExpressNameShow
      )[0]

      form.goodsAmount = this.form.goodsAmount * 1 || 0
      form.goodsDiscount = this.form.goodsDiscount * 1 || 0
      form.goodsStock = this.form.goodsStock * 1 || 0

      if (type) {
        form.goodsTypeId = type.goodsTypeId
      }
      if (express) {
        form.expressId = express.expressId
      }

      return form
    }
  }
}
</script>

<style lang="scss" scoped>
// @import 'static/styles/color.scss';

.info-wrap {
  > .goods-info1 {
    padding: 15px;
    > .save-btn {
      text-align: right;
      margin-bottom: 10px;
      > .text-btn {
        font-size: 15px;
        color: blue;
      }
    }
    > .img-block {
      border: 1px solid gray;
      border-radius: 4px;
      width: 100%;
      height: 180px;
      overflow: hidden;
      .swiper-item-block {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > .bg-icon {
          width: 90px;
          height: 90px;
        }
        > .img-preview {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          > .goods-img {
            width: 100%;
            height: 100%;
          }
          > .delete-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            display: block;
            width: 20px;
            height: 20px;
            background-color: white;
            color: red;
            text-align: center;
            font-size: 20px;
            line-height: 18px;
            border-radius: 50%;
            overflow: hidden;
          }
          > .add-more {
            position: absolute;
            width: 40px;
            height: 40px;
            bottom: 5px;
            right: 5px;
          }
        }
      }
    }
    > .input-field {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 15px;
      margin-top: 20px;
      > .label {
        width: 40px;
      }
      > .input-area {
        width: calc(100% - 50px);
        height: 40px;
        padding-top: 1px;
      }
    }
    .img-goods {
      p {
        font-size: 12px;
        color: #999;
      }
      .img-content {
        padding: 15px 0;
        display: flex;
        justify-content: left;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        .item {
          width: 102px;
          height: 102px;
          position: relative;
          margin: 0 6px 15px;
          .goods-img {
            width: 100%;
            height: 100%;
          }
          .delete-icon {
            position: absolute;
            width: 18px;
            height: 18px;
            background: #999;
            color: #fff;
            border-radius: 50%;
            right: -5px;
            top: -5px;
            text-align: center;
            line-height: 18px;
          }
        }
        .img-preview {
          width: 102px;
          height: 102px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: #9e9e9e;
          border-radius: 5px;
          margin: 0 6px 15px;
          .add-more {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
  .cell-block {
    padding: 10px 0;
    background-color: gray;
    & + .cell-block {
      padding-top: 0;
    }
  }
  .plus-icon {
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    &::before {
      content: '+';
      display: block;
      width: 14px;
      height: 14px;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      color: white;
      background-color: blue;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  > .goods-info2 {
    padding: 10px 15px;
    > .radio-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      > .radio {
        font-size: 15px;
      }
    }
    > .input-field {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      border-bottom: 1px solid gray;
      > .label {
        width: 60px;
      }
      > .input-block {
        flex-grow: 1;
        text-align: right;
        padding-right: 5px;
      }
      > .unit {
        color: gray;
      }
    }
  }
  > .goods-info3 {
    > .add-spec {
      background-color: gray;
      padding: 10px 15px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    > .goods-spec-block {
      padding: 0 15px 10px;
      border-top: 10px solid gray;
      > .spec-delete {
        text-align: right;
        > .delete-spec-btn {
          background-color: red;
          color: white;
          font-size: 14px;
          line-height: 14px;
          height: 16px;
          width: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }
      > .input-field {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        border-bottom: 1px solid gray;
        > .label {
          width: 60px;
        }
        > .input-block {
          flex-grow: 1;
          text-align: right;
          padding-right: 5px;
        }
        > .unit {
          color: gray;
        }
      }
    }
  }
  > .goods-info4 {
    > .input-field {
      padding: 10px 15px;
      font-size: 15px;
      > .label {
        display: block;
        margin-bottom: 10px;
      }
      > .input-area {
        width: 100%;
        height: 120px;
        &.higher {
          margin-bottom: 45px;
        }
      }
    }
  }
  > .submit-block {
    background-color: gray;
    padding: 15px;
    &.fixed {
      padding: 0;
      position: fixed;
      z-index: 10;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    > .fixed-btn {
      height: 40px;
      width: 50%;
      color: white;
      line-height: 40px;
      font-size: 15px;
      border: none;
      border-radius: 0;
      &.shelf-btn {
        background-color: blue;
        &.down {
          background-color: gray;
        }
      }
      &.delete-btn {
        background-color: red;
      }
    }
  }
  > .popup-window {
    top: 100%;
    left: 0;
    transition: top linear 0.3s;
    &.show {
      top: 0;
    }
    > .bottom-block {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 10px 15px;
      background-color: white;
      z-index: 110;
      > .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        > .title {
          font-size: 15px;
        }
        > .title-btn {
          font-size: 12px;
          margin: 0;
          padding: 0;
          background-color: blue;
          color: white;
          height: 20px;
          width: 50px;
          line-height: 20px;
          border-radius: 10px;
        }
      }
      > .select-list {
        max-height: calc(48px * 3);
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .radio-line {
          position: relative;
          border-bottom: 1px solid gray;
          &:first-child {
            border-top: 1px solid gray;
          }
          .tip {
            position: absolute;
            font-size: 12px;
            color: gray;
            position: absolute;
            top: 50%;
            right: 60px;
            transform: translateY(-50%);
            width: 150px;
            > .first {
              display: inline-block;
              width: 50%;
            }
          }
          .small-delete-btn {
            padding: 0;
            margin: 0;
            width: 50px;
            font-size: 12px;
            background-color: red;
            color: white;
            height: 20px;
            line-height: 20px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
        }
      }
      > .add-new {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
    }
  }
  > .fixed-form {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
    &.show {
      display: block;
    }
    > .form-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 15px 15px 55px;
      background-color:white;
      width: 280px;
      min-height: auto;
      border-radius: 8px;
      overflow: hidden;
      .input-block-plain {
        margin: 0;
        border: 1px solid gray;
        width: calc(100% - 20px);
        padding: 5px 10px;
        background-color: lighten(gray, 10%);
        border-radius: 4px;
        font-size: 15px;
      }
      > .action-field {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .action-btn {
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          border: none;
          background-color: white;
        }
      }
      .label {
        font-size: 15px;
      }
      > .express-name {
        > .input-block-plain {
          margin: 10px 0;
        }
      }
      > .inline-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 10px;
        &.switch {
          justify-content: flex-start;
          font-size: 15px;
        }
        > .label {
          width: 110px;
        }
        > .input-block-plain {
          margin: 0;
          padding-right: 25px;
          flex-grow: 1;
        }
        > .unit {
          color: gray;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
