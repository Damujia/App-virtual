
<template>
  <div>
    <div :style="`height:${viewH}px;overflow-y:scroll;`" @scroll="hanldeScroll">
      <div :style="{height:scorllH}">
        <div class="item_box" :style="`transform:translateY(${offSetY}px); `">
          <div v-for="item in list" :key="item.id" class="item">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    data: Array, // 数据源
    viewH: Number, // 可视区域高度
    itemH: Number // 列表单行高度
  },

  data () {
    return {
      lastTime: '', // 上次执行滚动事件的时刻
      scorllH: "", // 列表总高度
      list: [],    // 展示列表
      offSetY: "", // 动态偏移量
      showNum: ""  // 显示的个数
    };
  },
  mounted () {
    // 计算总高度
    this.scorllH = this.itemH * this.data.length + "px";
    // 计算可视区域能展示的个数 这里可以随机多加几个让滚动有个临界区间，避免向下滑动时元素直接替换
    this.showNum = Math.floor(this.viewH / this.itemH) + 20;
    this.lastTime = new Date().getTime();
    // 默认展示
    this.list = this.data.slice(0, this.showNum);

  },
  methods: {
    hanldeScroll (e) {
      // console.log(e.target.scrollTop); // 滚动条高度
      //   节流滚动计算
      if (new Date().getTime() - this.lastTime > 30) {
        this.offSetY = e.target.scrollTop - (e.target.scrollTop % this.itemH); //设置动态偏移量模拟滚动
        this.list = this.data.slice(
          Math.floor(e.target.scrollTop / this.itemH),
          Math.floor(e.target.scrollTop / this.itemH + this.showNum)
        ); // 根据滚动条高度来截取需要展示的列表区间
        this.lastTime = new Date().getTime();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.item_box {
  width: 100%;
  .item {
    height: 35px;
  }
}
</style>
