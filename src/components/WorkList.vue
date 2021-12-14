<template>
  <div class="work-list">
    <div
      class="work-list__item"
      v-for="(workSrc, idx) in workImageSrcs"
      :key="idx"
    >
      <img :src="workSrc">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    workImages: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const workImageSrcs = computed(() => props.workImages.map(imageName => require(`@/assets/images/thumbnails/${imageName}`)))
  
    return { workImageSrcs }
  }
}
</script>

<style scoped lang="scss">
.work-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__item {
    width: 128px;
    height: 128px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>