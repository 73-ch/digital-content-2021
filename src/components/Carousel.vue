<template>
  <div class="carousel">
    <Arrow direction="left" v-on:click="increment" />
    <div class="exhibition-container">
      <Exhibition
        v-for="(id, i) in subIdList"
        :key="id"
        :class="`exhibition ${i === 1 ? 'visible': ''}`"
        :style="transitionCssCreator(i === 1)"
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
];

const transitionTime = 0.6;

export default {
  components: {
      Exhibition,
      Arrow,
  },
  data () {
    return {
      idList,
      index: 0,
      switchable: true,
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
      if (!this.switchable) return;
      this.index++;
      this.index %= this.idList.length;
      this.sleepSwitcher();
    },
    decrement () {
      if (!this.switchable) return;
      if (this.index === 0) this.index = this.idList.length;
      this.index--;
      this.sleepSwitcher();
    },
    sleepSwitcher () {
      this.switchable = false;
      const enableSwitcher = () => this.switchable = true;
      setTimeout(enableSwitcher, transitionTime * 2 * 1000);
    },
    transitionCssCreator (isVisibleClass) {
      if (isVisibleClass)
        return `transition: all ${transitionTime}s ${transitionTime}s`;
      else
        return `transition: all ${transitionTime}s`;
    }
  }
};
</script>

<style scoped lang="scss">
$height: 800px;
$transitionTime: 0.5s;

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
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
}
</style>
