<template>
  <div class="detail">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="返修详情" left-text="返回" left-arrow @click-left="onClickLeft" />
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
          title: 'repairName',
          label: '返修原因',
          value: ''
        },
        {
          title: 'badPart',
          label: '不良零件',
          value: ''
        },
        {
          title: 'badPartPostion',
          label: '不良零件位置',
          value: ''
        },
        {
          title: 'repairMethods',
          label: '维修方式',
          value: ''
        },
        {
          title: 'materialSupplier',
          label: '原材厂商',
          value: ''
        },
        {
          title: 'pcbaname',
          label: 'PCB品名',
          value: ''
        },
        {
          title: 'pcbasupplier',
          label: 'PCBA厂商',
          value: ''
        },
        {
          title: 'pcbaproductionSn',
          label: 'PCBA生产序号',
          value: ''
        },
        {
          title: 'accountability',
          label: '责任归属',
          value: ''
        },
        {
          title: 'repairWorkerNo',
          label: '维修人工号',
          value: ''
        },
        {
          title: 'repairWorkerName',
          label: '维修人名称',
          value: ''
        },
        {
          title: 'createWorkerNo',
          label: '创建人',
          value: ''
        },
        {
          title: 'repairValue',
          label: '维修内容',
          value: ''
        },
        {
          title: 'repairResult',
          label: '维修结果',
          value: ''
        },
        {
          title: 'repairTime',
          label: '维修时间',
          value: ''
        },
        {
          title: 'comment',
          label: '备注',
          value: ''
        },
        {
          title: 'proDate',
          label: '生产时间',
          value: ''
        },
        {
          title: 'updateTime',
          label: '更新时间',
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
    onClickLeft () {
      this.$router.push({ name: 'badditail' })
    },
    async getinit (type) {
      let res = await this.$api.getProManageBadDetailRepair(this.getobj)
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