<template>
  <div class="broad-cast">
    <div v-if="index !== 0">
      <Window
        v-for="work in config[index].workList"
        :key="work.author"
        :work="work"
      />
    </div>
    <div v-for="work in workListForCaption" :key="work.author">
      <Caption :work="work" v-if="work.title !== undefined" />
    </div>
    <Carousel v-model:propIndex="index" :config="config" />
    <Calibration v-if="isDebugMode">
      <ul class="idList">
        <li v-for="work in config[index].workList" :key="work.author">
          {{ work.author }}
        </li>
      </ul>
    </Calibration>
    <CaptionPositionSetter v-if="isDebugMode">
      <ul class="idList">
        <li v-for="work in config[index].workList" :key="work.author">
          {{ work.author }}
        </li>
      </ul>
    </CaptionPositionSetter>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calibration from "@/components/Calibration.vue";
import CaptionPositionSetter from "@/components/CaptionPositionSetter.vue";
import Window from "@/components/Window.vue";
import Caption from "@/components/Caption.vue";
import config from "../config.json";

export default {
  components: { Carousel, Calibration, CaptionPositionSetter, Window, Caption },
  computed: {
    workListForCaption() {
      return this.config.filter((_,i) => Math.abs(this.index-i) < 2)
        .reduce((a,c,i)=>{
          c.workList.forEach((work)=>a.push({
            ...work,
            index: i,
          }));
          return a;
        },[]);
    }
  },
  data() {
    return {
      config,
      index: 0,
      isDebugMode: process.env.NODE_ENV === "development",
    };
  },
  methods: {
    setParent() {
      let ratio;
      if ((window.innerWidth / 16) * 9 > window.innerHeight) {
        ratio = window.innerWidth / 1600;
      } else {
        ratio = window.innerHeight / 900;
      }
      const parent = document.getElementsByClassName("broad-cast")[0];
      parent.style.transform = `translate(-50%, -50%) scale(${ratio * 0.8})`;
    },
  },
  mounted() {
    this.setParent();
    window.addEventListener("resize", this.setParent);
  },
};
</script>

<style scoped lang="scss">
.idList {
  position: relative;
  color: black;
  list-style-position: inline;
}

.broad-cast {
  position: absolute;
  width: 1600px;
  height: 900px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
</style>

<style>
body {
  background: white;
}
</style>
