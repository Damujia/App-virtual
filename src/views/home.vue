<template>
  <div class="homesty">
    <!-- <van-nav-bar :fixed="true" :placeholder="true" z-index="99" :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="cutoff"></div> -->
    <router-view>
    </router-view>
    <van-tabbar route :placeholder="true" v-model="active">
      <van-tabbar-item replace to="/order">
        <span>生产</span>
        <template #icon="props">
          <img :src="props.active ? proimg.b : proimg.a" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/badinfo">
        <span>不良</span>
        <template #icon="props">
          <img :src="props.active ? badimg.b : badimg.a" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/stockinfo">
        <span>库存</span>
        <template #icon="props">
          <img :src="props.active ? storeimg.b : storeimg.a" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import shengcan from '../assets/shengcan.png'
import shengcan2 from '../assets/shengcan2.png'
import badimga from '../assets/bad.png'
import badimgb from '../assets/bad2.png'
import storeimga from '../assets/store.png'
import storeimgb from '../assets/store2.png'
export default {
  data () {
    return {
      title: '',
      active: 0,
      proimg: {
        a: shengcan,
        b: shengcan2
      },
      badimg: {
        a: badimga,
        b: badimgb
      },
      storeimg: {
        a: storeimga,
        b: storeimgb
      }
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        sessionStorage.setItem('rouname', oldVal.name)
        if (val.name === 'detail') {
          this.title = '生产详情'
        } else if (val.name === 'order') {
          this.title = '订单'
        } else if (val.name === 'badinfo') {
          this.title = '不良记录'
        } else if (val.name === 'stockinfo') {
          this.title = '库存'
        } else if (val.name === 'badditail') {
          this.title = '不良详情'
        }
      },
      deep: true
    }
  },
  mounted () {
    let rotname = this.$route.name
    if (rotname === 'order') {
      this.title = '订单'
    } else if (rotname === 'detail') {
      this.title = '生产详情'
    } else if (rotname === 'badinfo') {
      this.title = '不良记录'
    } else if (rotname === 'stockinfo') {
      this.title = '库存'
    } else if (rotname === 'badditail') {
      this.title = '不良详情'
    }
    // this.active = Number(sessionStorage.getItem('ber')) || 0
  },
  methods: {
    // onChange (index) {
    //   sessionStorage.setItem('ber', JSON.stringify(index))
    // },
    
  }
}
</script>

<style lang="less" scoped>
.homesty {
  height: 100vh;
  background-color: #f7f8fa;
  .insty {
    height: 40px;
  }
  .cutoff {
    margin: 3px 0;
  }
}
::v-deep .van-nav-bar__text {
  color: #000;
}
</style>