<template>
  <div class="msj">
    <van-pull-refresh style="width: 100%;overflow-y: auto;" v-model="isLoading" @refresh="getinfo(true)">
      <div class="detail_stock_one">
        <div v-if="datas.length === 0" style="text-align: center;">暂无数据</div>
        <div v-for="(val, index) in datas" :key="index" class="detail_row">
          <van-cell :title="'工令号：' + task" is-link arrow-direction="none" />
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">作业站别：</span></van-col>
            <van-col><span class="col_font_text">{{val.produceName}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">作业责任：</span></van-col>
            <van-col><span class="col_font_text">{{val.checkName}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">作业员：</span></van-col>
            <van-col><span class="col_font_text">{{val.workerName}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">检验结果：</span></van-col>
            <van-col><span class="col_font_text">{{(val.workerNo !== '' && val.workerNo !== null) ? '√' : 'x'}}</span></van-col>
          </van-row>
        </div>
        <!-- <Demo :listData="datas" :itemSize="151" /> -->
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// import Demo from './demo'
export default {
  components: {
  },
  data () {
    return {
      datas: [],
      getobj: {
        processLineId: '',
        timeStamp: ''
      },
      task: '',
      isLoading: false
    }
  },
  mounted () {
    this.task = this.$store.state.detailData.taskNo
    this.getobj.processLineId = this.$store.state.detailData.processLineId
    this.getobj.timeStamp = this.$store.state.detailData.timeStamp
    this.getinfo()
  },
  methods: {
    async getinfo (type) {
      let res = await this.$api.getProcedureCheckOrder(this.getobj)
      this.datas = res.data.values
      if (type) {
        if (res.data.result) {
          this.$notify({ type: 'success', message: '查询成功' });
          this.isLoading = false
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.msj {
  .detail_stock_one {
    width: 100%;
    height:  500px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .detail_row {
      margin: 5px auto;
      background-color: #fff;
      width: 95%;
      border-radius: 6px;
      padding: 3px;
      box-sizing: border-box;
      box-shadow: 0px 0px 15px 0px rgba(0, 22, 49, 0.24);
      .col_font {
        margin-left: 16px;
        font-size: 14px;
        color: #666;
      }
      .col_font_text {
        font-size: 14px;
        margin-right: 16px;
      }
    }
  }
}
</style>