<template>
  <div :id="id" :style="{ background: color }" class="window">
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
    id: String,
  },
  data() {
    return {
      color: getColor(),
      targetElement: null,
      parentElement: null,
      debugMode: process.env.NODE_ENV === "development",
    };
  },
  mounted() {
    // if (this.debugMode) return;
    const transform = getTransformJson(this.id);
    if (transform === undefined) return;
    const targetElement = document.getElementById(this.id);

    this.targetElement = targetElement;
    this.parentElement = targetElement.parentElement;
    this.parentElement.style.transformStyle = "preserve-3d";
    this.parentElement.style.perspective = transform.perspective + "px";
    this.targetElement.style.transform = transform.transformString;
    targetElement.style.opacity = process.env.NODE_ENV === "development" ? 0.7 : 0;
  }
};
</script>

<style scoped lang="scss">
.window {
  position: absolute;
  width: 192px;
  height: 108px;
}
</style>
