<template>
  <div class="container">
    <div class="header-mask"></div>
    <div class="transparent"></div>

    <!-- <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/5qap5aO4i9A?controls=0&autoplay=1&mute=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe> -->
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/HD_GCZgPChs?controls=0&autoplay=1&mute=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  components: {},
  setup() {},
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.header-mask {
  position: absolute;
  width: 100%;
  height: 12.8%;
  background: black;
}
.transparent {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
