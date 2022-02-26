<template>
  <div>
    <iframe class="gallary"
        :src="url"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen/>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      index: 0,
      startTime: 0
    }
  },
  created() {
    const date = new Date()
    const isAfterNoon = date.getHours() > 12;

    this.index = +isAfterNoon + 1;
    this.startTime = (date.getHours() % 12) * 3600 + date.getMinutes() * 60 + date.getSeconds();
  },
  computed: {
    isHelp() {
      return this.id.indexOf('help') > -1;
    },
    url() {
      if (this.isHelp) {
        return `https://www.youtube.com/embed/?list=${this.id.replace(/&.*/g, '')}&loop=1&autoplay=1&mute=1&rel=0&vq=highres&controls=0}`
      } else {
        return `https://www.youtube.com/embed/?list=${this.id}&index=${this.index}&loop=1&autoplay=1&mute=1&rel=0&vq=highres&controls=0&start=${this.startTime}`
      }

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
