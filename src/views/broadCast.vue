<template>
  <div>
    <Carousel v-model:propIndex="index" :config="config" />
    <Calibration />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calibration from "@/components/Calibration.vue";
import config from "../config";

export default {
  components: { Carousel, Calibration, },
  data() {
    return {
      config,
      index: 0,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
