<template>
  <div class='broad-cast'>
    <Window
      v-for="work in config[index].workList"
      :key="work.author"
      :work="work" />
    <Carousel v-model:propIndex="index" :config="config" />
    <Calibration v-if="isDebugMode">
      <ul class="idList">
        <li v-for="work in config[index].workList" :key="work.author">
          {{ work.author }}
        </li>
      </ul>
    </Calibration>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calibration from "@/components/Calibration.vue";
import Window from "@/components/Window.vue";
import config from "../config.json";

export default {
  components: { Carousel, Calibration, Window, },
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
      if (window.innerWidth / 16 * 9 > window.innerHeight) {
        ratio = window.innerWidth / 1600;
      } else {
        ratio = window.innerHeight / 900;
      }
      const parent = document.getElementsByClassName("broad-cast")[0];
      parent.style.transform = `translate(-50%, -50%) scale(${ratio * 0.8})`;
    }
  },
  mounted() {
    this.setParent();
    window.addEventListener('resize', this.setParent);
  }
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
