<template>
  <div class="ordersty">
    <div class="search_demo">
      <van-search v-model="getobj.orderNo" show-action shape="round" background="#409eff" placeholder="请输入搜索订单号">
        <template #action>
          <div @click="init(true)">搜索</div>
        </template>
      </van-search>
      <van-row type="flex" class="row_sty" justify="space-around">
        <van-col span="11">
          <div @click="selectDate" class="col_search">
            <van-icon size="20" color="#ffffff" name="notes-o" />
            <span>{{getobj.startTime}}</span>
          </div>
        </van-col>
        <van-col span="2" class="col_search col_search2">至</van-col>
        <van-col span="11">
          <div @click="selectDate1" class="col_search col_search1">
            <van-icon size="20" color="#ffffff" name="notes-o" />
            <span>{{getobj.endTime}}</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="fixed_he"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="cell_div" v-for="(val, index) in datas" :key="index">
        <van-row type="flex" class="cell_row" justify="space-between">
          <van-col span="20">
            <span class="col_span">工令号：{{val.taskNo}}</span>
          </van-col>
          <van-col span="4">
            <van-button @click="getdetail(val)" round type="info" plain size="mini" class="button_sty" block>详情</van-button>
          </van-col>
        </van-row>
        <van-row type="flex" class="cell_row_two">
          <van-col span="9">订单号:{{val.orderNo}}</van-col>
          <van-col span="5">完成数:{{val.totalNum}}</van-col>
          <van-col span="10">订单日期:{{val.orderDate}}</van-col>
        </van-row>
      </div>
    </van-list>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="dateget" @cancel="showPicker = false" @confirm="onConfirm" type="date" title="选择时间" />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      showPicker: false,
      loading: false,
      finished: false,
      datas: [],
      getobj: {
        orderNo: '',
        startTime: moment(new Date(new Date(new Date().toLocaleDateString())).setDate(1)).format('YYYY年MM月DD日'),
        endTime: moment(new Date(new Date(new Date().toLocaleDateString()))).format('YYYY年MM月DD日')
      },
      dateType: '',
      dateget: ''
    }
  },
  methods: {
    onConfirm () {
      if (this.dateType === 'start') {
        this.getobj.startTime = moment(this.dateget).format('YYYY年MM月DD日');
      } else if (this.dateType === 'end') {
        this.getobj.endTime = moment(this.dateget).format('YYYY年MM月DD日');
      }
      this.showPicker = false
    },
    selectDate () {
      this.dateType = 'start'
      this.showPicker = true
      this.dateget = new Date(this.getobj.startTime.replace('年', '-').replace('月', '-').replace('日', ''))
    },
    selectDate1 () {
      this.dateType = 'end'
      this.showPicker = true
      this.dateget = new Date(this.getobj.endTime.replace('年', '-').replace('月', '-').replace('日', ''))
    },
    // 懒加载
    onLoad () {
      this.init()
    },
    getdetail (val) {
      this.$router.push({
        name: 'orderinfo'
      })
      this.$store.commit('setorder', val)
    },
    init (type) {
      this.$api.getOrderInfo({
        orderNo: this.getobj.orderNo,
        startTime: this.getobj.startTime.replace('年', '-').replace('月', '-').replace('日', ''),
        endTime: this.getobj.endTime.replace('年', '-').replace('月', '-').replace('日', '')
      })
        .then(res => {
          this.datas = res.data.values
          this.loading = false
          this.finished = true
          if (type) {
            this.$notify({ type: 'success', message: '搜索成功' });
          }
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    }
  }
}
</script>

<style lang="less" scoped>
.ordersty {
  .fixed_he{
    height: 95px;
  }
  .search_demo {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px 15px 15px;
    background-color: #409eff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .row_sty {
      border-radius: 3px;
      box-shadow: 0px 0px 12px 0px rgba(0, 22, 49, 0.24);
      padding: 3px 0;
    }
    .col_search {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      font-size: 14px;
      > span {
        margin-left: 8px;
      }
    }
    .col_search_bor {
      border-top: 3px solid #026be5;
      border-radius: 3px;
    }
    .col_search1 {
      justify-content: flex-start;
    }
    .col_search2 {
      justify-content: center;
    }
  }
}
.cell_div {
  margin: 0 auto;
  width: 93%;
  box-shadow: 0px 0px 12px 0px rgba(0, 22, 49, 0.24);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 5px;
  .cell_row {
    margin-bottom: 6px;
    .button_sty{
      font-size: 14px;
    }
  }
  .col_span {
    display: flex;
    border-left: 3px solid #026be5;
    border-radius: 3px;
    padding-left: 10px;
  }
  .cell_row_two {
    .van-col {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>