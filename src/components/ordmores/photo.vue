<template>
  <div>
    123
    <div class="demo_sty">
    <Demo :listData="datas" :itemSize="50" />
    </div>
    123
  </div>
</template>

<script>
import Demo from './demo'
export default {
  components: {
    Demo
  },
  data(){
    return {
      datas: []
    }
  },
  mounted(){
    for(let i = 0; i < 10000; i++){
      this.datas.push({
        id: i,
        value: '测试' + i
      })
    }
  },
  methods: {
    
  }
}
</script>

<style>
.demo_sty{
  height: 500px;
}

</style>