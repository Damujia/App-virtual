<template>
  <div class="msj">
    <van-pull-refresh style="width: 100%;overflow-y: auto;" v-model="isLoading" @refresh="getinfo(true)">
      <div class="detail_stock_one">
        <div v-if="datas.length === 0" style="text-align: center;">暂无数据</div>
        <div v-for="(val, index) in datas" :key="index" class="detail_row">
          <van-cell :title="'工令号：' + task" is-link arrow-direction="none" />
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">产品型号：</span></van-col>
            <van-col><span class="col_font_text">{{val.proModel}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">机号：</span></van-col>
            <van-col><span class="col_font_text">{{val.proBarcodeSn}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">去程：</span></van-col>
            <van-col><span class="col_font_text">{{val.qc}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">回程：</span></van-col>
            <van-col><span class="col_font_text">{{val.hc}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">记录时间：</span></van-col>
            <van-col><span class="col_font_text">{{val.updateTime}}</span></van-col>
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [],
      getobj: {
        proBarcodeSn: ''
      },
      isLoading: false,
      task: '',
    }
  },
  mounted () {
    this.task = this.$store.state.detailData.taskNo
    this.getobj.proBarcodeSn = this.$store.state.detailData.proBarcodeSn
    this.getobj.sensorNo = this.$store.state.detailData.sensorNo
    this.getinfo()
  },
  methods: {
    async getinfo (type) {
      let res = await this.$api.getDataXxcs(this.getobj)
      this.datas = res.data.values
      if (type) {
        if (res.data.result) {
          this.$notify({ type: 'success', message: '查询成功' });
          this.isLoading = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.msj {
  .detail_stock_one {
    height: 78vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .detail_row {
      margin: 5px 0;
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