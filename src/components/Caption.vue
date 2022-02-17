<template>
  <div class="caption" :id="'caption-' + work.author">
    <p class="caption-number">{{ work.number }}</p>
    <p class="caption-title">{{ work.title }}</p>
    <p class="caption-author">{{ work.author }} 2021</p>
  </div>
</template>

<script>
export default {
  props: {
    work: Object
  },
  mounted() {

    const captionPosJson = getCaptionPosJson(this.work.author);

    const targetElement = document.getElementById("caption-" + this.work.author);

    if (captionPosJson) {

      targetElement.style.top = `${captionPosJson.top}px`;
      targetElement.style.left = `${captionPosJson.left}px`;

    } else {

      targetElement.style.top = "578px";
      targetElement.style.left = "379px";

    }

  }
}

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
  position: fixed;
  width: 20%;
  height: 18%;
  background-color: white;
  z-index: 1000;
  padding: 1% 1%;
  color: black;
  font-size: 20px;
}
</style>
