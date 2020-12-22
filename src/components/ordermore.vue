<template>
  <div class="ordermore">
    <van-nav-bar :fixed="true" :placeholder="true" z-index="99" title="生产记录—详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs  swipeable animated>
      <van-tab title="磨四角">
        <Msj />
      </van-tab>
      <van-tab title="线性测试">
        <Xxcs />
      </van-tab>
      <van-tab title="重量校正">
        <Zljz />
      </van-tab>
      <van-tab title="包装">
        <Baozhuang />
      </van-tab>
      <van-tab title="检验单">
        <Checkinfo />
      </van-tab>
      <van-tab title="测试">
        <Demo :itemH="40" :viewH="500" :data="datatab" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Msj from './ordmores/msj'
import Xxcs from './ordmores/xxcs'
import Zljz from './ordmores/zljz'
import Baozhuang from './ordmores/baozhuang'
import Checkinfo from './ordmores/checkinfo'
import Demo from './ordmores/demo1'
export  default {
  components: {
    Msj,
    Xxcs,
    Zljz,
    Baozhuang,
    Checkinfo,
    Demo
  },
  data () {
    return {
      getobj: {
        proBarcodeSn: ''
      },
      datatab: []
    }
  },
  mounted () {
    for(let i = 0; i < 100000; i++){
      this.datatab.push({
        content: '测试' + i,
        id: i
      })
    }
    this.getobj.proBarcodeSn = this.$route.query.proBarcodeSn || ''
  },
  methods: {
    onClickLeft () {
      this.$router.push({ name: 'detail' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
