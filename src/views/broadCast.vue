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
};
</script>

<style scoped lang="scss">
.idList {
  position: relative;
  color: white;
  list-style-position: inline;
}

.broad-cast {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
