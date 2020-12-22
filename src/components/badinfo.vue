<template>
  <div class="badinfo">
    <van-sticky>
      <div class="badsearch">
        <div>
          <van-search v-model="getobj.taskNo" show-action background="#409eff" shape="round" placeholder="请输入工令号搜索">
            <template #action>
              <div @click="getinfo(true)">搜索</div>
            </template>
          </van-search>
        </div>
        <div @click="show = true">
          <van-icon name="weapp-nav" />
        </div>
      </div>
    </van-sticky>
    <van-pull-refresh style="min-height: 75vh;width: 100%;" v-model="isLoading" @refresh="getinfo(true)">
      <div class="echarts_demo">
        <van-swipe :loop="true" class="my-swipe" indicator-color="white">
          <van-swipe-item><div id="item2"></div></van-swipe-item>
          <van-swipe-item><div id="item3"></div></van-swipe-item>
          <van-swipe-item><div id="item1"></div></van-swipe-item>
        </van-swipe>
      </div>
      <div class="badchild">
        <div v-if="datalist.length === 0" style="text-align: center;">暂无数据</div>
        <div class="bad_sty" v-for="(val, index) in datalist" :key="index">
          <div @click="seeimg(val.fileNames)">
            <!-- <van-image width="100%" height="100%" fit="contain" :src="imgurl + val.fileNames[0]" /> -->
          </div>
          <div>
            <span>工令号：{{val.taskNo}}</span>
            <span>订单号：{{val.orderNo}}</span>
            <span>订单日期：{{val.updateTime}}</span>
          </div>
          <div @click="baddetailbut(val)">
            <div>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
      <van-form>
        <van-field readonly clickable name="datetimePicker" :value="getobj.startTime" label="开始时间" placeholder="点击选择时间" @click="showpockbut" />
        <van-field readonly clickable name="datetimePicker" :value="getobj.endTime" label="结束时间" placeholder="点击选择时间" @click="showpockbut1" />
        <div style="margin: 16px;">
          <van-button @click="getinfo(true)" round block type="info" native-type="submit">
            查 询
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="datas" @cancel="showPicker = false" @confirm="onConfirm" type="datetime" title="选择时间" />
    </van-popup>
    <van-popup v-model="showPicker1" position="bottom">
      <van-datetime-picker v-model="datae" @cancel="showPicker1 = false" @confirm="onConfirm1" type="datetime" title="选择时间" />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
import { ImagePreview } from 'vant';
import { filesurldnow } from '@/axios/filepath'
export default {
  data () {
    return {
      isLoading: false,
      imgurl: filesurldnow,
      show: false,
      showPicker: false,
      showPicker1: false,
      getobj: {
        type: false,
        taskNo: '',
        startTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime()).setDate(1)).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)).format('YYYY-MM-DD HH:mm:ss')
      },
      datas: '',
      datae: '',
      datalist: []
    }
  },
  mounted () {
    this.getinfo()
  },
  methods: {
    showpockbut () {
      this.showPicker = true
      this.datas = new Date(this.getobj.startTime)
    },
    showpockbut1 () {
      this.showPicker1 = true
      this.datae = new Date(this.getobj.endTime)
    },
    baddetailbut (val) {
      this.$store.commit('setbad', val)
      this.$router.push({ name: 'badmore' })
    },
    seeimg (val) {
      let imgs = val.map(e => (this.imgurl + e))
      ImagePreview({
        images: imgs,
        closeable: true,
      });
    },
    async getinfo (type) {
      this.selectBadech()
      this.getWeeks()
      let res = await this.$api.getProManageBadDetail(this.getobj)
      this.datalist = res.data.values
      if (type) {
        if (res.data.result) {
          this.$notify({ type: 'success', message: '查询成功' });
          this.show = false
          this.isLoading = false
        }
      }
    },
    onConfirm () {
      this.getobj.startTime = moment(this.datas).format('YYYY-MM-DD HH:mm:ss');
      this.showPicker = false
    },
    onConfirm1 () {
      this.getobj.endTime = moment(this.datae).format('YYYY-MM-DD HH:mm:ss');
      this.showPicker1 = false
    },
    getWeek (dt) {
      let d1 = new Date(dt)
      let d2 = new Date(dt)
      d2.setMonth(0)
      d2.setDate(1)
      let rq = d1 - d2
      let days = Math.ceil(rq / (24 * 60 * 60 * 1000))
      let num = Math.ceil(days / 7)
      return num
    },
    async getWeeks () {
      let res = await this.$api.selectBadPassRate()
      let weeks = []
      let weeknum = this.getWeek(new Date())
      for (let i = 1; i <= weeknum; i++) {
        weeks.push(i)
      }
      let xNums = []
      weeks.forEach(e => {
        res.data.values.forEach(f => {
          if (e === f.week) {
            xNums.push(f.badPassRate)
          } else {
            xNums.push(0)
          }
        })
      })
      this.badStatistics(weeks, xNums)
    },
    badStatistics (datay, datax) {
      let mycharts = this.$echarts.init(document.querySelector('#item1'))
      mycharts.setOption({
        title: {
          text: '周维修不良率',
          left: '10px',
          textStyle: {
            fontSize: 12,
          }
        },
        grid: {
          left: '20%',
          top: 30,
          bottom: 35
        },
        dataZoom: [{
          start: 80,
          type: 'inside'
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        barGap: 0,
        calculable: true,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: datay
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '不良率',
            type: 'line',
            data: datax
          }
        ]
      })
      mycharts.resize()
    },
    // 柱状图
    async selectBadech () {
      let res = await this.$api.selectBadCauseNum(this.getobj)
      let datay = res.data.values.map(e => (e.badName))
      let datax = res.data.values.map(e => (e.badNum))
      let peis = res.data.values.map(e => ({
        name: e.badName,
        value: e.badNum
      }))
      let colors = res.data.values.map(e => (e.color))
      let mycharts = this.$echarts.init(document.querySelector('#item2'))
      mycharts.setOption({
        title: {
          text: '不良记录统计',
          left: '10px',
          textStyle: {
            fontSize: 12,
          }
        },
        grid: {
          left: '15%',
          top: 30,
          bottom: 35
        },
        legend: {
          data: datay
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        barGap: 0,
        calculable: true,
        xAxis: {
          data: datay
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            data: datax,
            type: 'bar',
            barMaxWidth: '30',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = colors
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
      mycharts.resize()
      let mycharts1 = this.$echarts.init(document.querySelector('#item3'))
      mycharts1.setOption({
        color: colors,
        title: {
          text: '不良记录占比统计',
          left: 'center',
          textStyle: {
            fontSize: 12,
          }
        },
        grid: {
          left: '5%',
          top: 30
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: datay
        },
        series: [
          {
            name: '不良次数',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: peis,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      mycharts1.resize()
    }
  }
}
</script>

<style lang="less" scoped>
.badinfo {
  background-color: #fafafa;
  min-height: 80vh;
  .echarts_demo {
    height: 151px;
    .my-swipe {
      .van-swipe-item {
        color: #fff;
        background-color: #fff;
        height: 150px;
        #item1 {
          width: 95%;
          height: 100%;
        }
        #item2 {
          width: 99%;
          height: 100%;
        }
        #item3 {
          width: 99%;
          height: 100%;
        }
      }
    }
  }
  .badsearch {
    display: flex;
    background-color: #409eff;
    > div {
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        width: 30px;
        display: flex;
        align-items: center;
        background-color: #409eff;
      }
    }
  }
  .badfixed {
    height: 46px;
  }
  .badchild {
    padding: 10px 10px 0 10px;
    height: 100%;
    .bad_sty {
      flex: 1;
      margin-bottom: 10px;
      box-shadow: 0px 0px 15px 0px rgba(0, 22, 49, 0.24);
      background-color: #fff;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .but_size {
        font-size: 14px;
      }
      > div {
        &:nth-child(1) {
          // width: 48px;
          // height: 48px;
          // border-radius: 3px;
        }
        &:nth-child(2) {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 15px;
          box-sizing: border-box;
          > span {
            font-size: 12px;
            color: #666;
            &:nth-child(1) {
              font-size: 14px;
              color: #000;
            }
          }
        }
        &:nth-child(3) {
          width: 38px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-left: 5px;
          > div {
            display: flex;
          }
        }
      }
    }
  }
}
</style>