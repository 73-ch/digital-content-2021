<template>
  <div>
    <iframe
      class="gallary"
      :src="`https://www.youtube.com/embed/${id}?controls=0&autoplay=1&mute=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  }
};
</script>

<style scoped lang="scss">
.gallary {
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  min-height: 56.25vw;
  width: 100vw;
  height: 114vh;
}
</style>
