<template>
  <div class="msj">
    <van-pull-refresh style="width: 100%;overflow-y: auto;" v-model="isLoading" @refresh="getinfo(true)">
      <div class="detail_stock_one">
        <div v-if="datas.length === 0" style="text-align: center;">暂无数据</div>
        <div v-for="(val, index) in datas" :key="index" class="detail_row">
          <van-cell :title="'工令号：' + val.taskNo" is-link arrow-direction="down" value="详 情" @click="more(val)" />
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">产品型号：</span></van-col>
            <van-col><span class="col_font_text">{{val.proModel}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">机号：</span></van-col>
            <van-col><span class="col_font_text">{{val.proBarcodeSn}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">记录人：</span></van-col>
            <van-col><span class="col_font_text">{{val.recordWorkerNo}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">是否合格：</span></van-col>
            <van-col><span class="col_font_text">{{val.qualified ? '是' : '否'}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">记录时间：</span></van-col>
            <van-col><span class="col_font_text">{{val.updateTime}}</span></van-col>
          </van-row>
        </div>
      </div>
      <van-popup v-model="showmsj" get-container="body" position="top" :style="{ height: '40%' }">
        <div class="popup_sty">
          <van-cell title="产品型号" :value="listData.proModel" />
          <van-cell title="机号" :value="listData.proBarcodeSn" />
          <van-cell title="A角" :value="listData._A" />
          <van-cell title="B角" :value="listData._B" />
          <van-cell title="C角" :value="listData._C" />
          <van-cell title="D角" :value="listData._D" />
          <van-cell title="E角" :value="listData._E" />
          <van-cell title="记录人" :value="listData.recordWorkerNo" />
          <van-cell title="精度" :value="listData.accuracyNumber" />
          <van-cell title="差值" :value="listData.errorNum" />
          <van-cell title="更新时间" :value="listData.updateTime" />
        </div>
      </van-popup>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: {
        proModel: '',
        proBarcodeSn: '',
        _A: '',
        _B: '',
        _C: '',
        _D: '',
        _E: '',
        recordWorkerNo: '',
        accuracyNumber: '',
        errorNum: '',
        updateTime: '',
      },
      showmsj: false,
      datas: [],
      getobj: {
        proBarcodeSn: '',
        sensorNo: ''
      },
      isLoading: false
    }
  },
  mounted () {
    this.getobj.proBarcodeSn = this.$store.state.detailData.proBarcodeSn
    this.getobj.sensorNo = this.$store.state.detailData.sensorNo
    this.getinfo()
  },
  methods: {
    more (val) {
      this.showmsj = true
      this.listData.proModel = val.proModel
      this.listData.proBarcodeSn = val.proBarcodeSn
      this.listData._A = val._A
      this.listData._B = val._B
      this.listData._C = val._C
      this.listData._D = val._D
      this.listData._E = val._E
      this.listData.recordWorkerNo = val.recordWorkerNo
      this.listData.accuracyNumber = val.accuracyNumber
      this.listData.errorNum = val.errorNum
      this.listData.updateTime = val.updateTime
    },
    async getinfo (type) {
      let res = await this.$api.getDataMsj(this.getobj)
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
  .popup_sty {
    padding: 8px;
    display: flex;
    flex-direction: column;
  }
}
</style>