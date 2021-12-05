<template>
  <div class="carousel">
    <Arrow direction="left" v-on:click="increment" />
    <div class="exhibition-container">
      <Exhibition
        v-for="(id, i) in subIdList"
        :key="id"
        :class="`exhibition ${i === 1 ? 'visible': ''}`"
        :id="id"
      />
    </div>
    <Arrow direction="right" v-on:click="decrement" />
  </div>
</template>

<script>
import Exhibition from "./Exhibition.vue";
import Arrow from "./Arrow.vue";

const idList = [
  "HD_GCZgPChs",
  "5qap5aO4i9A",
  "KIXprc4-ifE",
  "HpdO5Kq3o7Y",
  "PeHvrD_jUBo",
];

export default {
  components: {
      Exhibition,
      Arrow,
  },
  data () {
    return {
      idList,
      index: 0,
    }
  },
  computed: {
    subIdList () {
      return [
        this.idList[(this.index-1+this.idList.length) % this.idList.length],
        this.idList[this.index],
        this.idList[(this.index+1) % this.idList.length],
      ];
    }
  },
  methods: {
    increment () {
      this.index++;
      this.index %= this.idList.length;
    },
    decrement () {
      if (this.index === 0) this.index = this.idList.length;
      this.index--;
    },
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
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  }
}
</style>
