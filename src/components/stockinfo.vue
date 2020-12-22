<template>
  <div class="stockinfo">
    <van-tabs line-width="50%" v-model="active" swipeable animated>
      <van-tab title="入库">
        <div class="stock_sty">
          <van-pull-refresh style="width: 100%;overflow-y: auto;" v-model="isLoading" @refresh="getInfoputin(true)">
            <div class="detail_stock_one">
              <div v-if="listobjPutIn.length === 0" style="text-align: center;">暂无数据</div>
              <div v-for="(val, index) in listobjPutIn" :key="index" class="detail_row">
                <van-cell :title="'工令号：' + val.taskNo" is-link arrow-direction="none" />
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">机号：</span></van-col>
                  <van-col><span class="col_font_text">{{val.proBarcodeSn}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">箱号：</span></van-col>
                  <van-col><span class="col_font_text">{{val.boxNo}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">入库数：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putInNum}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">入库人：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putInWorkerNo}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">入库日期：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putInTime}}</span></van-col>
                </van-row>
              </div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="出库">
        <div class="stock_sty">
          <van-pull-refresh style="width: 100%;overflow-y: auto;" v-model="isLoading1" @refresh="getInfoputout(true)">
            <div class="detail_stock_one">
              <div v-if="listobjPutIn.length === 0" style="text-align: center;">暂无数据</div>
              <div v-for="(val, index) in listobjPutout" :key="index" class="detail_row">
                <van-cell :title="'工令号：' + val.taskNo" is-link arrow-direction="down" value="详 情" @click="stockmore(val)" />
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">机号：</span></van-col>
                  <van-col><span class="col_font_text">{{val.proBarcodeSn}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">箱号：</span></van-col>
                  <van-col><span class="col_font_text">{{val.boxNo}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">出库数：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putOutNum}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">出库人：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putOutWorkerNo}}</span></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col><span class="col_font">出库日期：</span></van-col>
                  <van-col><span class="col_font_text">{{val.putOutDate}}</span></van-col>
                </van-row>
              </div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      isLoading1: false,
      active: 0,
      listobjPutIn: [],
      listobjPutout: []
    }
  },
  mounted () {
    this.active = Number(sessionStorage.getItem('act')) || 0
    this.getInfoputin()
    this.getInfoputout()
  },
  watch: {
    active: function (val) {
      sessionStorage.setItem('act', val)
    }
  },
  methods: {
    // 更多
    stockmore (val) {
      this.$store.commit('setstock', val)
      this.$router.push({ name: 'stockMore' })
    },
    async getInfoputin (type) {
      let resPutIn = await this.$api.getStoragePutInDetail()
      this.listobjPutIn = resPutIn.data.values
      if (type) {
        this.isLoading = false
        this.$notify({ type: 'success', message: '刷新成功' });
      }
    },
    async getInfoputout (type) {
      let resPutout = await this.$api.getStoragePutOut()
      this.listobjPutout = resPutout.data.values
      if (type) {
        this.isLoading1 = false
        this.$notify({ type: 'success', message: '刷新成功' });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.stockinfo {
  .stock_sty {
    height: 84vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .detail_stock_one {
      height: 100%;
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
}
</style>