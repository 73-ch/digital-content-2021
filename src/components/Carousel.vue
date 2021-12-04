<template>
  <div class="exhibition-container">
    <Exhibition />
    <!-- <Exhibition />
    <Exhibition /> -->
  </div>
</template>

<script>
import Exhibition from "./Exhibition.vue";

export default {
  components: {
      Exhibition,
  },
  data () {
    return {
      index: 0,
    }
  }
};
</script>

<style scoped lang="scss">
.exhibition-container {
  position: absolute;
  width: 800px;
  height: 800px;
}
</style>