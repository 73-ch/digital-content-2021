<template>
  <div class="carousel">
    <Arrow direction="left" v-on:click="increment" />
    <div class="exhibition-container">
      <Exhibition class="exhibition prev" :id="youtubeId(index-1)" />
      <Exhibition class="exhibition" :id="youtubeId(index)" />
      <Exhibition class="exhibition next" :id="youtubeId(index+1)" />
    </div>
    <Arrow direction="right" v-on:click="decrement" />
  </div>
</template>

<script>
// 3つ表示（うち2つz-indexとかで非表示）
// ↓
// クリックアクション
// ↓
// css書き換え
// ↓
// 一つ置き換え

import Exhibition from "./Exhibition.vue";
import Arrow from "./Arrow.vue";

export default {
  components: {
      Exhibition,
      Arrow,
  },
  data () {
    return {
      index: 0,
    }
  },
  methods: {
    increment () {
      this.index++;
    },
    decrement () {
      this.index--;
    },
    youtubeId (index) {
      if (index % 2 == 0) return "HD_GCZgPChs";
      else return "5qap5aO4i9A";
    }
  }
};
</script>

<style scoped lang="scss">
$height: 800px;

.carousel {
  display: flex;
  flex-direction: row;
  height: $height;
}

.exhibition-container {
  position: relative;
  width: 800px;
  height: $height;

  .exhibition {
    position: absolute;
    width: 100%;
    height: 100%;

    &.prev {
      z-index: -1;
    }
    &.next {
      z-index: -1;
    }
  }
}
</style>
