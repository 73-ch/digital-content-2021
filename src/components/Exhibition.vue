<template>
  <div>
    <iframe
      class="gallary"
      :src="`https://www.youtube.com/embed/${isLoop ?id.replace(/&.*/g, '') :  id}?controls=0&autoplay=1&mute=1${isLoop ? '&loop=1&playlist='+id : ''}`"
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
  },
  computed: {
    isLoop() {
      return this.id.indexOf('loop') > -1;
    }
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
  /* max-width: 100vw; */
  /* min-height: 56.25vw; */
  /* width: 100vw; */
  /* height: 114vh; */
  width: 100%;
  height: 112%;
}
</style>
