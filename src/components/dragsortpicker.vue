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
import { vendorPrefix } from "./utils";
export default {
  name: "dragsortpicker",
  data() {
    return {
      arr: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26
      ],
      calArr: [],
      pressHold: 300,
      sorting: false,
      scrollable: true,
      pressThreshold: 5
    };
  },
  mounted() {
    let domArr = document.querySelectorAll(".item");
    domArr.forEach((element, index) => {
      let react = element.getBoundingClientRect();
      this.calArr[index] = {};
      this.calArr[index]["value"] = this.arr[index];
      this.calArr[index]["react"] = react;
    });
    this.$el.addEventListener("touchstart", this.touchstartHandle, false);
    this.$el.addEventListener("touchmove", this.touchmoveHandle, false);
    this.$el.addEventListener("touchend", this.touchendHandle, false);
    document.addEventListener(
      "touchmove",
      e => {
        if (!this.scrollable) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  },
  methods: {
    handlePress(e) {
      // 设置可以拖拽标识位，创建拖拽元素，设置拖拽范围

      let react = this.calArr[this._activeNode.index]["react"];
      const cloneNode = this._activeNode.node.cloneNode(true);
      let body = document.querySelector("body"),
        _helper = document.querySelectorAll("._helper_");
      if (_helper.length) {
        body.removeChild(_helper[0]);
      }
      this.initialOffset = this.getOffset(e);
      this.helper = body.appendChild(cloneNode);
      this.helper.classList.add("_helper_");
      this.helper.style.position = "fixed";
      this.helper.style.top = `${react.top}px`;
      this.helper.style.left = `${react.left}px`;
      this.helper.style.width = `${react.width}px`;
      this.helper.style.height = `${react.height}px`;
      this.helper.style.boxSizing = "border-box";
      this.helper.style.pointerEvents = "none";
      this._activeNode.node.style.visibility = "hidden";
      this._activeNode.node.style.opacity = 0;
      this.listenerNode = e.touches ? this._activeNode.node : window;
      this.listenerNode.addEventListener('touchmove', this.touchsortmove, false)
      this.listenerNode.addEventListener('touchend', this.touchsortend, false)
      this.$emit("touchstart", {
        event: e,
        node: this._activeNode.node,
        index: this._activeNode.index
      });
      this.sorting = true;
    },
    touchsortmove(e){
      this.scrollable = true
      this.updatePosition(e)
    },
    touchsortend(e){
      this.scrollable = false
    },
    touchendHandle(e) {
      clearTimeout(this.pressTimer);
      //this._activeNode.node.style.transform = "scale(1)";
      // 删除_helper_
      if (this.helper) {
        this.helper.parentNode.removeChild(this.helper);
      }
      this.scrollable = false
      this._activeNode.node.style.visibility = "";
      this._activeNode.node.style.opacity = "";
      this.sorting = false;
      // 清除transform样式
    },
    touchmoveHandle(e) {
      clearTimeout(this.pressTimer)
        // if(!this.sorting && this._touched){
        //   const offset = this.getOffset(e);
        //   this._delta = {
        //     x: this._pos.x - offset.x,
        //     y: this._pos.y - offset.y
        //   }
        //   const delta = Math.abs(this._delta.x) + Math.abs(this._delta.y);
        //   if(!this.pressThreshold || this.pressThreshold && delta >= this.pressThreshold){
        //     clearTimeout(this.cancelTimer);
        //     this.cancelTimer = setTimeout(this.cancel, 0);
        //   }
        // }
    },
    cancle(){
      if(!this.sorting){
        clearTimeout(this.pressTimer)
        this._activeNode = null
      }
    },
    touchstartHandle(e) {
      this._pos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
      this._touched = true;
      if (!this.sorting) {
        if (!this.isChild(e)) return;
        if (e.target.tagName.toLowerCase() === "a") {
          e.preventDefault();
        }
        let index = +event.touches[0].target.getAttribute("index");
        this._activeNode = { node: e.target, index };
        if (this.pressHold) {
          this.pressTimer = setTimeout(() => {
            this.handlePress(e);
          }, this.pressHold);
        }
      }
    },
    updatePosition(e) {
      this.scrollable = false;
      const offset = this.getOffset(e);
      let transition = {
        x: offset.x - this.initialOffset.x,
        y: offset.y - this.initialOffset.y
      };
      this.helper.style.transition = `${vendorPrefix}Transform 0.1s`;
      this.helper.style[
        `${vendorPrefix}Transform`
      ] = `translate3d(${transition.x}px,${transition.y}px, 0)`;
    },
    getOffset(e) {
      return {
        x: e.touches ? e.touches[0].pageX : e.pageX,
        y: e.touches ? e.touches[0].pageY : e.pageY
      };
    },
    childClick() {},
    isChild(event) {
      return typeof +event.touches[0].target.getAttribute("index") == "number";
    }
  }
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.item-box {
  /* display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  grid-row-gap: 10px;
  grid-column-gap: 10px; */
  display: flex;
  flex-wrap: wrap;
  width: 320px;
}
.item {
  list-style: none;
  width: 100px;
  height: 100px;
  background-color: aqua;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: transform 0.4s;
  position: relative;
}
.item:nth-child(3n) {
  margin-right: 0px;
}
</style>