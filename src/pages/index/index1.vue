<template>
  <div>
    <Slick-list :value="arr" axis="xy" :pressDelay="300" class="item-box">
      <Slick-item v-for="(item, index) in arr" :index="index" :key="index" class="item">{{item}}</Slick-item>
    </Slick-list>
  </div>
</template>
<script>
import { SlickList, SlickItem } from "vue-slicksort";
export default {
  components: { SlickList, SlickItem },
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
      ]
    };
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
  transition: all 0.4s;
  position: relative;
}
.item:nth-child(3n) {
  margin-right: 0px;
}
</style>