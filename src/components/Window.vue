<template>
  <div
    :id="work.author"
    :style="{ background: color }"
    class="window"
    v-on:click="jumpToWorkLink"
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
    return require(`@/assets/calibration-data/${id}test.json`);
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
    return {
      color: getColor(),
      parentElement: null,
      debugMode: process.env.NODE_ENV === "development",
    };
  },
  methods: {
    jumpToWorkLink() {
      window.open(this.work.url);
    },
  },
  mounted() {
    const targetElement = document.getElementById(this.work.author);
    targetElement.style.opacity = process.env.NODE_ENV === "development" ? 0.7 : 0;

    const transform = getTransformJson(this.work.author);
    if (transform === undefined) return;

    // const parentElement = targetElement.parentElement;
    // parentElement.style.transformStyle = "preserve-3d";
    // parentElement.style.perspective = transform.perspective + "px";
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
}
</style>
