<template>
  <ul class="item-box">
      <li class="item" @click="childClick" v-for="(item, index) in arr" :key="index" :index="index">
        <span>{{item}}</span>
      </li>
    </ul>
</template>

<script>
/* eslint-disable */
// https://github.com/Jexordexan/vue-slicksort/blob/fd255d43ea47da34b4ce075bf433b1094fe195da/src/ContainerMixin.js#L148
export default {
  name: "dragsortpicker",
  data() {
    return {
      arr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    }
  },
  mounted(){
    let domArr = document.querySelectorAll('.item'), reactArr = []
    domArr.forEach(element => {
      let react = element.getBoundingClientRect()
      reactArr.push(react)
    });
    this.$el.addEventListener('touchstart', this.touchstartHandle, false)
  },
  methods: {
      touchstartHandle(e){
        /**
         * 
         */
          this._touched = true
          console.log(e.touches)
          if (e.target.tagName.toLowerCase() === 'a') {
            e.preventDefault();
          }
      },
      childClick(){
          console.log(1)
      }
  },
};
</script>
<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
.item-box{
  /* display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  grid-row-gap: 10px;
  grid-column-gap: 10px; */
  display: flex;
  flex-wrap: wrap;
  width: 320px
}
.item{
  list-style: none;
  width: 100px;
  height: 100px;
  background-color: aqua;
  margin-right: 10px;
  margin-bottom: 10px;
}
.item:nth-child(3n){
  margin-right: 0px;
}
  .list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translate(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>