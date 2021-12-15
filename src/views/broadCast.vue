<template>
  <div>
    <Carousel v-model:propIndex="index" :config="config" />
    <Calibration v-if="isDebugMode">
      <ul class="idList">
        <li v-for="id in config[index].authorList" :key="id">
          {{ id }}
        </li>
      </ul>
    </Calibration>
    <Window
      v-for="id in config[index].authorList"
      :key="id"
      :id="id" />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calibration from "@/components/Calibration.vue";
import Window from "@/components/Window.vue";
import config from "../config";

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
  color: black;
  list-style-position: inline;
}
</style>
