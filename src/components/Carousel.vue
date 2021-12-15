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

const transitionTime = 0.6;

export default {
  components: {
    Exhibition,
    Arrow,
  },
  props: {
    config: Array,
    propIndex: Number,
  },
  data () {
    return {
      switchable: true,
    }
  },
  computed: {
    index: {
      get() {
        return this.propIndex;
      },
      set(val){
        this.$emit('update:propIndex', val);
      },
    },
    subIdList () {
      return [
        this.config[(this.index-1+this.config.length) % this.config.length].youtubeId,
        this.config[this.index].youtubeId,
        this.config[(this.index+1) % this.config.length].youtubeId,
      ];
    }
  },
  methods: {
    increment () {
      if (!this.switchable) return;
      let index = this.index;
      index++;
      index %= this.config.length;
      this.index = index;
      this.sleepSwitcher();
    },
    decrement () {
      if (!this.switchable) return;
      let index = this.index;
      if (this.index === 0) index = this.config.length;
      index--;
      this.index = index;
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
  },
  mounted() {
    if (process.env.NODE_ENV !== "development") return;
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (keyName === "ArrowRight") {
        this.increment();
      } else if (keyName === "ArrowLeft") {
        this.decrement();
      }
    });
  },
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
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
}
</style>
