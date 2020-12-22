<template>
  <div class="detail">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="订单详情" left-text="返回" right-text="更多" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-pull-refresh style="min-height: 100%;width: 100%;" v-model="isLoading" @refresh="getinit(true)">
      <div class="detail_bod_one">
        <!-- <span v-if="listData.length === 0">暂无数据</span> -->
        <van-cell v-for="(val, index) in listData" :key="index" :title="val.label" :value="val.value" size="large" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      orders: {},
      active: 1,
      getobj: {
        orderDid: ''
      },
      listData: [
        {
          label: '下发编号',
          title: 'sortId',
          value: ''
        },
        {
          label: '工令号',
          title: 'taskNo',
          value: ''
        },
        {
          label: '订单号码',
          title: 'orderNo',
          value: ''
        },
        {
          label: '产线',
          title: 'lineId',
          value: ''
        },
        {
          label: '工艺ID',
          title: 'processLineId',
          value: ''
        },
        {
          label: '客户订单',
          title: 'customerOrderNo',
          value: ''
        },
        {
          label: '程式版本号',
          title: 'programVersionNumber',
          value: ''
        },
        {
          label: '秤量规格',
          title: 'specifications',
          value: ''
        },
        {
          label: '完成数',
          title: 'totalNum',
          value: ''
        },
        {
          label: '件号',
          title: 'pieceNo',
          value: ''
        },
        {
          label: '机型',
          title: 'proCode',
          value: ''
        },
        {
          label: '订单量',
          title: 'planNum',
          value: ''
        },
        {
          label: '预交日期',
          title: 'deliveryDate',
          value: ''
        },
        {
          label: '答交日期',
          title: 'acceptingDate',
          value: ''
        },
        {
          label: '备注1',
          title: 'commit1',
          value: ''
        },
        {
          label: '备注2',
          title: 'commit2',
          value: ''
        },
        {
          label: '机号标准',
          title: 'barCodeStandard',
          value: ''
        },
        {
          label: '序号-开始',
          title: 'barCode_start',
          value: ''
        },
        {
          label: '序号-结束',
          title: 'barCode_end_c',
          value: ''
        },
        {
          label: '机号',
          title: 'barNo',
          value: ''
        },
        {
          label: '箱号标准',
          title: 'boxNoStandard',
          value: ''
        },
        {
          label: '箱号-开始',
          title: 'boxNo_start',
          value: ''
        },
        {
          label: '箱号-结束',
          title: 'boxNo_end_c',
          value: ''
        },
        {
          label: '箱号',
          title: 'boxNo',
          value: ''
        },
        {
          label: '台',
          title: 'boxPerNum',
          value: ''
        },
        {
          label: '总箱数',
          title: 'boxNum_c',
          value: ''
        },
        {
          label: '外箱尺寸-长(m)',
          title: 'boxSite_length',
          value: ''
        },
        {
          label: '外箱尺寸-宽(m)',
          title: 'box_width',
          value: ''
        },
        {
          label: '外箱尺寸-高(m)',
          title: 'box_height',
          value: ''
        },
        {
          label: '体积(m³)',
          title: 'volume',
          value: ''
        },
        {
          label: '净重(kg)',
          title: 'netWeight',
          value: ''
        },
        {
          label: '毛重(kg)',
          title: 'grossWeight',
          value: ''
        },
        {
          label: '毛重偏差(%)',
          title: 'grossWeightDeviation',
          value: ''
        },
        {
          label: '铭板料号',
          title: 'plateNo',
          value: ''
        },
        {
          label: '唛头',
          title: 'shippingMark',
          value: ''
        },
        {
          label: '订单类型',
          title: 'orderType',
          value: ''
        },
        {
          label: 'G值',
          title: 'extremumNumber',
          value: ''
        },
        {
          label: '要求',
          title: 'request',
          value: ''
        },
        {
          label: '订单日期',
          title: 'orderDate',
          value: ''
        },
        {
          label: '创建人',
          title: 'createPersonWorkerNo',
          value: ''
        },
        {
          label: '订单ID',
          title: 'orderDid',
          value: ''
        },
        {
          label: '备注',
          title: 'comment',
          value: ''
        },
      ]
    }
  },
  mounted () {
    let orderObj = this.$store.state.orderData.orderDid
    this.getobj.orderDid = orderObj
    this.getinit()
  },
  methods: {
    onClickRight () {
      this.$router.push({ name: 'detail'})
    },
    onClickLeft () {
      this.$router.push({ name: 'order' })
    },
    async getinit (type) {
      let res = await this.$api.getOrderInfo(this.getobj)
      this.listData.forEach(e => {
        for (let key in res.data.values[0]) {
          if (e.title === key) {
            e.value = res.data.values[0][key]
          }
        }
      })
      if (type) {
        this.isLoading = false
        this.$notify({ type: 'success', message: '刷新成功' });
      }
    }
  }

}
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  .detail_bod_one {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>