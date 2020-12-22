<template>
  <div class="detail">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="不良记录-返修" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-pull-refresh style="width: 100%;" v-model="isLoading" @refresh="getinit(true)">
      <div class="detail_bod_one">
        <span v-if="listData.length === 0">暂无数据</span>
        <div v-for="(val, index) in listData" :key="index" class="detail_row">
          <van-row class="row_tit">
            <van-col span="20">{{'工令号：' + val.taskNo}}</van-col>
            <van-col @click="btnbadurl(val)" span="4">更多<van-icon name="arrow" /></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">返修原因：</span></van-col>
            <van-col><span class="col_font_text">{{val.repairName}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">不良零件：</span></van-col>
            <van-col><span class="col_font_text">{{val.badPart}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">PCB名称：</span></van-col>
            <van-col><span class="col_font_text">{{val.pcbaname}}</span></van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col><span class="col_font">返修时间：</span></van-col>
            <van-col><span class="col_font_text">{{val.repairTime}}</span></van-col>
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
      isLoading: false,
      orders: {},
      active: 1,
      getobj: {
        proManageBadDetailId: ''
      },
      listData: [],
      showPopo: false
    }
  },
  mounted () {
    let orderObj = this.$store.state.badData.id
    this.getobj.proManageBadDetailId = orderObj
    this.getinit()
  },
  methods: {
    btnbadurl(){
      this.$router.push({name: 'badrepairmore' })
    },
    onClickLeft () {
      this.$router.push({ name: 'badmore' })
    },
    async getinit (type) {
      let res = await this.$api.getProManageBadDetailRepair(this.getobj)
      res.data.values.forEach(e => {
        this.$set(e, 'showPopo', false)
      })
      this.listData = res.data.values
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
    min-height: 84vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .detail_row {
      margin-top: 5px;
      background-color: #fff;
      width: 95%;
      border-radius: 6px;
      padding: 3px;
      box-sizing: border-box;
      box-shadow: 0px 0px 15px 0px rgba(0, 22, 49, 0.24);
      .row_tit{
        padding: 10px;
        border-bottom: 1px solid rgb(190, 190, 190);
        .van-col{
          &:nth-child(2){
            display:flex;
            align-items: center;
          }
        }
      }
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