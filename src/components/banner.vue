<template>
  <div class="wrapper" ref="wrapper">
    <ul class="banners" @touchstart="recordPosition" @touchmove="animate" >
      <li class="banner-item" v-for="item in imgs" :key="item.id" :style="{'transform': `translate3d(${item.style.disX}px, 0px, ${item.style.disZ}px)`}">
        <img :src="item.src" alt />
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      activeIndex: 0,
      activeIndexArr: [],
      imgs: [
        {
          id: "1",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: 2,
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: 3,
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: "4",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: "5",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: "6",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: "7",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        {
          id: "8",
          src: "http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg",
          style: {
              disX: 0,
              disZ: 0
          }
        },
        
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.init();
    }, 20);
  },
  computed: {
    addStyle() {}
  },
  methods: {
    recordPosition(e) {
        e = e || window.event
        this.originDisX = e.changedTouches[0].pageX;
        this.width = document.querySelectorAll('.banner-item')[0].clientWidth
    },
    animate(e){
        e = e || window.event
        let dis = e.changedTouches[0].pageX - this.originDisX,
        direction = dis > 0 ? 'right' : 'left', rate, disX, disZ1, disZ2, finalDisX, finalDisZ1, finalDisZ2;
        dis = Math.abs(dis);
        rate = dis / this.width;
        if(this.imgs.length == 3){
            finalDisX = 100;
            finalDisZ1 = 120;
            finalDisZ2 = 0;
            this.activeIndexArr = [0, 1, 2]
        }else if(this.imgs.length > 3){
            finalDisX = 50;
            finalDisZ1 = 120;
            finalDisZ2 = 880;
            let rightImgNum1 = this.activeIndex + 1, rightImgNum2 = this.activeIndex + 2, leftImgNum1 = this.activeIndex - 1, leftImgNum2 = this.activeIndex - 2;
            rightImgNum1 = this.calcIndex(rightImgNum1);
            rightImgNum2 = this.calcIndex(rightImgNum2);
            leftImgNum1 = this.calcIndex(leftImgNum1);
            leftImgNum2 = this.calcIndex(leftImgNum2);
            if(direction == 'right'){
                this.activeIndexArr = [leftImgNum2, leftImgNum1, this.activeIndex, rightImgNum1]
            }else{
                this.activeIndexArr = [leftImgNum1, this.activeIndex, rightImgNum1, rightImgNum2]
            }
        }
        let tempDisX = Math.ceil(finalDisX * rate),
        tempDisZ1 = Math.ceil(finalDisZ1 * rate),
        tempDisZ2 = Math.ceil(finalDisZ2 * rate);
        disX = tempDisX > finalDisX ? finalDisX : tempDisX;
        disZ1 = tempDisZ1 > finalDisZ1 ? finalDisZ1 : tempDisZ1;
        disZ2 = tempDisZ2 > finalDisZ2 ? finalDisZ2 : tempDisZ2;
        if(direction == 'left'){
            // 第一张
            this.$set(this.imgs[this.activeIndexArr[0]].style, 'disX', this.imgs[this.activeIndexArr[0]].style.disX + disX > 0 ? 0 : Math.ceil(this.imgs[this.activeIndexArr[0]].style.disX + disX));
            this.$set(this.imgs[this.activeIndexArr[0]].style, 'disZ', this.imgs[this.activeIndexArr[0]].style.disZ - disZ2 < -1000 ? -1000 : Math.ceil(this.imgs[this.activeIndexArr[0]].style.disZ - disZ2));
            // 第二张
            this.$set(this.imgs[this.activeIndexArr[1]].style, 'disX', this.imgs[this.activeIndexArr[1]].style.disX - disX < -50 ? -50 : Math.ceil(this.imgs[this.activeIndexArr[1]].style.disX - disX));
            this.$set(this.imgs[this.activeIndexArr[1]].style, 'disZ', this.imgs[this.activeIndexArr[1]].style.disZ - disZ1 < -120 ? -120 : Math.ceil(this.imgs[this.activeIndexArr[1]].style.disZ - disZ1));
            // 第三张
            this.$set(this.imgs[this.activeIndexArr[2]].style, 'disX', this.imgs[this.activeIndexArr[2]].style.disX - disX < 0 ? 0 : this.imgs[this.activeIndexArr[2]].style.disX - disX);
            this.$set(this.imgs[this.activeIndexArr[2]].style, 'disZ', this.imgs[this.activeIndexArr[2]].style.disZ + disZ1 > 0 ? 0 : this.imgs[this.activeIndexArr[2]].style.disZ + disZ1);
            // 第四张
            this.$set(this.imgs[this.activeIndexArr[3]].style, 'disX', this.imgs[this.activeIndexArr[3]].style.disX + disX > 50 ? 50 : this.imgs[this.activeIndexArr[3]].style.disX + disX);
            this.$set(this.imgs[this.activeIndexArr[3]].style, 'disZ', this.imgs[this.activeIndexArr[3]].style.disZ + disZ2 > -120 ? -120 : this.imgs[this.activeIndexArr[3]].style.disZ + disZ2);
        }else{
            // 第一张
            this.$set(this.imgs[this.activeIndexArr[0]].style, 'disX', this.imgs[this.activeIndexArr[0]].style.disX + disX > 0 ? 0 : Math.ceil(this.imgs[this.activeIndexArr[0]].style.disX + disX));
            this.$set(this.imgs[this.activeIndexArr[0]].style, 'disZ', this.imgs[this.activeIndexArr[0]].style.disZ + disZ1 > 0 ? 0 : Math.ceil(this.imgs[this.activeIndexArr[0]].style.disZ + disZ1));
            // 第二张
            this.$set(this.imgs[this.activeIndexArr[1]].style, 'disX', this.imgs[this.activeIndexArr[1]].style.disX + disX > 50 ? 50 : Math.ceil(this.imgs[this.activeIndexArr[1]].style.disX + disX));
            this.$set(this.imgs[this.activeIndexArr[1]].style, 'disZ', this.imgs[this.activeIndexArr[1]].style.disZ + disZ1 > 0 ? 0 : Math.ceil(this.imgs[this.activeIndexArr[1]].style.disZ + disZ1));
            // 第三张
            this.$set(this.imgs[this.activeIndexArr[2]].style, 'disX', this.imgs[this.activeIndexArr[2]].style.disX - disX < 0 ? 0 : this.imgs[this.activeIndexArr[2]].style.disX - disX);
            this.$set(this.imgs[this.activeIndexArr[2]].style, 'disZ', this.imgs[this.activeIndexArr[2]].style.disZ + disZ1 > 0 ? 0 : this.imgs[this.activeIndexArr[2]].style.disZ + disZ1);
            // 第四张
            this.$set(this.imgs[this.activeIndexArr[3]].style, 'disX', this.imgs[this.activeIndexArr[3]].style.disX + disX > 50 ? 50 : this.imgs[this.activeIndexArr[3]].style.disX + disX);
            this.$set(this.imgs[this.activeIndexArr[3]].style, 'disZ', this.imgs[this.activeIndexArr[3]].style.disZ + disZ2 > -120 ? -120 : this.imgs[this.activeIndexArr[3]].style.disZ + disZ2);
        }

    },
    endAnimate(e){
        e = e || window.event
        let dis = e.changedTouches[0].pageX - this.originDisX
        if(dis > 50){
            this.activeIndex = this.activeIndex - 1
            

        }else{
            this.activeIndex = this.activeIndex + 1
        }
        this.activeIndex = this.calcIndex(this.activeIndex)
        this.init();
        
    },
    init(disX = 0, disZ1 = 0, disZ2 = 0) {
      let half_length = Math.floor(this.imgs.length / 2);
      let fontFlag = 0,
        leftImgNum,
        rightImgNum;
      for (let i = 0; i < half_length; i++) {
        leftImgNum = this.activeIndex - i - 1;
        rightImgNum = this.activeIndex + i + 1;
        leftImgNum = this.calcIndex(leftImgNum);
        rightImgNum = this.calcIndex(rightImgNum);
        if (fontFlag == 0) {
          this.$set(this.imgs[leftImgNum], "style", {
            disX: -50,
            disZ: -120
          });
          this.$set(this.imgs[rightImgNum], "style", {
            disX: 50,
            disZ: -120
          });
          fontFlag++;
        } else {
          this.$set(this.imgs[leftImgNum], "style", {
            disX: 0,
            disZ: -1000
          });
          this.$set(this.imgs[rightImgNum], "style", {
            disX: 0,
            disZ: -1000
          });
        }
      }
      this.$set(this.imgs[this.activeIndex], "style", {
        disX: 0,
        disZ: 0
      });
    },
    animateImngItem(){
        
    },
    calcIndex(index) {
      let length = this.imgs.length, tempIndex;
      if (index < 0) {
        tempIndex = length + index;
      } else if (index > length) {
        tempIndex = index - length;
      } else if(index == length){
        tempIndex = 0;
      }else{
        tempIndex = index
      }
      if(tempIndex < 0 || tempIndex > 7){
          this.calcIndex(tempIndex)
      }else{
          return tempIndex
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.scroll = new Bscroll(this.$refs.wrapper, {});
    // });
  }
};
</script>
<style scoped>
li {
  font-size: 0px;
}
.banner-item img {
  width: 300px;
}
.banners {
  position: relative;
  transform-style: preserve-3d;
  perspective: 800px;
  display: flex;
  justify-content: center;
  height: 180px;
}
.banner-item {
  position: absolute;
  transition: transform 0.5s ease-in-out;
}
</style>