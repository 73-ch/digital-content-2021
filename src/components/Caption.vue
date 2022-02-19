<template>
  <div
    :class="`caption ${visible ? 'visible' : ''}  ${isFadeIn ? 'in' : 'out'}`"
    :id="'caption-' + work.author">
    <p class="caption-number">{{ work.number }}</p>
    <p class="caption-title">{{ work.title }}</p>
    <p class="caption-author">{{ work["real-name"] }}</p>
    <p class="caption-formnyear">{{ work.form }} / {{ work.year }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    isFadeIn() {
      console.log(this.work.index);
      return this.work.index == 1;
    },
    visible() {
      return this.$store.state.captionVisible && this.isFadeIn;
    }
  },
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

    if (this.work.number === "E-1" || this.work.number === "J-1") {
      document.getElementById("caption-" + this.work.author).style.height = "13%";
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
  &.in {
    transition: all 1s 1s;
  }
  &.out {
    transition: all 1s;
  }
  opacity: 0;
  position: fixed;
  width: 9%;
  height: 11%;
  background-color: white;
  z-index: 1000;
  padding: 0.5% 1.2%;
  color: black;
  font-size: 10px;
  line-height: 20px;
  &.visible {
    z-index: 10;
    opacity: 0.7;
  }
}
</style>
