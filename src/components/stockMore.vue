<template>
  <div class="detail">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="出库详情" left-text="返回" right-text="更多" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
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
        timeStamp: ''
      },
      listData: [
        {
          title: 'customerOrderNo',
          label: '客户',
          value: ''
        },
        {
          title: 'shippingInfo',
          label: '发货信息',
          value: ''
        },
        {
          title: 'pieceNo',
          label: '件号',
          value: ''
        },
        {
          title: 'proCode',
          label: '机型',
          value: ''
        },
        {
          title: 'planNum',
          label: '订单量',
          value: ''
        },
        {
          title: 'shippingNum',
          label: '出库数量',
          value: ''
        },
        {
          title: 'shippingNum',
          label: '已出库数量',
          value: ''
        },
        {
          title: 'putOutDate',
          label: '出库时间',
          value: ''
        },
        {
          title: 'ynScanCode',
          label: '是否需要逐条扫码',
          value: ''
        },
        {
          title: 'ynExamine',
          label: '是否需要审核',
          value: ''
        },
        {
          title: 'examineWorkerNo',
          label: '审核人',
          value: ''
        },
        {
          title: 'examineResult',
          label: '审核结果',
          value: ''
        },
        {
          title: 'examineTime',
          label: '审核时间',
          value: ''
        },
        {
          title: 'createWorkerNo',
          label: '创建人',
          value: ''
        },
        {
          title: 'createTime',
          label: '创建时间',
          value: ''
        },
        {
          title: 'comment',
          label: '备注',
          value: ''
        }
      ]
    }
  },
  mounted () {
    let orderObj = this.$store.state.stockData.timeStamp
    this.getobj.timeStamp = orderObj
    this.getinit()
  },
  methods: {
    onClickRight () {
      this.$router.push({
        name: 'stockout'
      })
    },
    onClickLeft () {
      this.$router.push({ name: 'stockinfo' })
    },
    async getinit (type) {
      let res = await this.$api.getStoragePutOut(this.getobj)
      this.listData.forEach(e => {
        for (let key in res.data.values[0]) {
          if (e.title === key) {
            e.value = res.data.values[0][key]
          }
        }
      })
      if (type) {
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