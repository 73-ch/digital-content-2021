<template>
  <div
    :id="work.author"
    :style="{ background: color }"
    :class="`window ${!debugMode ? 'production' : ''}`"
    v-on:click="jumpToWorkLink"
    v-on:mouseover="fadeIn"
    v-on:mouseleave="fadeOut"
  >
  </div>
</template>

<script>
function getColor(){ 
  return "hsl(" + 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' + 
    (85 + 10 * Math.random()) + '%)'
}
function getTransformJson(id) {
  try {
    return require(`@/assets/calibration-data/${id}.json`);
  } catch {
    return;
  }
}

export default {
  props: {
    work: {
      author: String,
      url: String,
    },
    id: String,
  },
  data() {
    const debugMode = process.env.NODE_ENV === "development";
    return {
      color: debugMode ? getColor() : '#fff',
      debugMode,
    };
  },
  methods: {
    jumpToWorkLink() {
      window.open(this.work.url);
    },
    fadeIn() {
      if (this.debugMode) return;
      const targetElement = document.getElementById(this.work.author);
      targetElement.style.opacity = 0.4;
    },
    fadeOut() {
      if (this.debugMode) return;
      const targetElement = document.getElementById(this.work.author);
      targetElement.style.opacity = 0;
    }
  },
  mounted() {
    const targetElement = document.getElementById(this.work.author);
    targetElement.style.opacity = process.env.NODE_ENV === "development" ? 0.7 : 0;

    const transform = getTransformJson(this.work.author);
    if (transform === undefined) return;
    targetElement.style.transform = transform.transformString;
  }
};
</script>

<style scoped lang="scss">
.window {
  z-index: 2;
  position: absolute;
  width: 192px;
  height: 108px;
  top: 50%;
  left: 50%;
  opacity: 0;

  &.production {
    transition: opacity 0.3s;
    cursor: pointer;
    background: white;
    z-index: 10;
  }
}
</style>
