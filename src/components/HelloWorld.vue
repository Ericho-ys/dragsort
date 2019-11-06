<template>
  <div id="flip-list-demo" class="demo">
    <div class="transitionTitle">测试</div>
    <ul>
      <li v-for="(item, index) in items" :key="index" class="list-item" style="position: relative">
        <img src="../assets/1.jpg" alt="" style="width: 30px;height: 30px;object-fit: cover;position: absolute; left:0px;top:0px;">
        <h3 style="margin-left: 40px;">测试</h3>
        <p style="position:absolute; right:0px;top: 0px;">2019/09/25</p>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */

export default {
  data() {
    return {
      items: new Array(2000)
    };
  },
  methods: {
    deleteItem() {
      this.items.splice(0, 1);
    },
    shuffle: function() {
      this.items.splice(1, 0, 1);
    }
  }
};
</script>
<style>
*{
  margin: 0px;
  padding: 0px;
}
.list-item{
  height: 50px;
}
.transitionTitle{
  height: 80px;
  animation: move 2s ease infinite;
}
@keyframes move {
  0%{
    transform: translate3d(0px, 0px, 0px) 
  }
  50%{
    transform: translate3d(10px, 0px, 0px) 
  }
  0%{
    transform: translate3d(0px, 0px, 0px) 
  }
}
</style>
