<template>
  <div class="caption" :id="'caption-' + work.author">
    <p class="caption-number">{{ work.number }}</p>
    <p class="caption-title">{{ work.title }}</p>
    <p class="caption-author">{{ work["real-name"] }}</p>
    <p class="caption-formnyear">{{ work.form }} / {{ work.year }}</p>
  </div>
</template>

<script>
export default {
  props: {
    work: Object,
  },
  mounted() {
    const captionPosJson = getCaptionPosJson(this.work.author);

    const targetElement = document.getElementById(
      "caption-" + this.work.author
    );

    if (captionPosJson) {
      targetElement.style.top = `${captionPosJson.top}px`;
      targetElement.style.left = `${captionPosJson.left}px`;
    } else {
      targetElement.style.top = "578px";
      targetElement.style.left = "379px";
    }
  },
};

function getCaptionPosJson(id) {
  try {
    return require(`@/assets/caption-position-data/${id}.json`);
  } catch {
    return;
  }
}
</script>

<style scoped lang="scss">
.caption {
  opacity: 0.7;
  position: fixed;
  width: 12%;
  height: 14%;
  background-color: white;
  z-index: 1000;
  padding: 0.5% 1.5%;
  color: black;
  font-size: 12px;
  line-height: 27px;
}
</style>
