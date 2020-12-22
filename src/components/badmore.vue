<template>
  <div class="detail">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="不良详情" left-text="返回" right-text="更多" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
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
        id: ''
      },
      listData: [
        {
          title: 'orderNo',
          label: '订单号',
          value: ''
        },
        {
          title: 'customerOrderNo',
          label: '客户订单',
          value: ''
        },
        {
          title: 'taskNo',
          label: '工令号',
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
          title: 'siteId',
          label: '站点',
          value: ''
        },
        {
          title: 'produceCode',
          label: '工序',
          value: ''
        },
        {
          title: 'proBarcodeSn',
          label: '机号',
          value: ''
        },
        {
          title: 'badName',
          label: '不良名称',
          value: ''
        },
        {
          title: 'badAppearance',
          label: '不良现象',
          value: ''
        },
        {
          title: 'repairName',
          label: '返修名称',
          value: ''
        },
        {
          title: 'repairValue',
          label: '返修值',
          value: ''
        },
        {
          title: 'repairResult',
          label: '返修结果',
          value: ''
        },
        {
          title: 'repairTime',
          label: '返修时间',
          value: ''
        },
        {
          title: 'repairWorkerNo',
          label: '返修人员',
          value: ''
        },
        {
          title: 'comment',
          label: '备注',
          value: ''
        },
        {
          title: 'proDate',
          label: '生产日期',
          value: ''
        },
        {
          title: 'updateTime',
          label: '更新时间',
          value: ''
        },
        {
          title: 'orderDid',
          label: '订单ID',
          value: ''
        },
      ]
    }
  },
  mounted () {
    let orderObj = this.$store.state.badData.id
    this.getobj.id = orderObj
    this.getinit()
  },
  methods: {
    onClickRight () {
      this.$router.push({
        name: 'badditail', query: {
          orderArr: this.getobj.id
        }
      })
    },
    onClickLeft () {
      this.$router.push({ name: 'badinfo' })
    },
    async getinit (type) {
      let res = await this.$api.getProManageBadDetail(this.getobj)
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