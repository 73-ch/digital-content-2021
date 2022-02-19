<template>
  <div>
    <Arrow direction="left" v-on:click="decrement" />
    <Arrow direction="dummy-left" v-if="propIndex === 0" />
    <div class="exhibition-container">
      <Exhibition
        v-for="(id, i) in subIdList"
        :key="id"
        :class="`exhibition ${i === 1 ? 'visible': ''}`"
        :style="transitionCssCreator(i === 1)"
        :id="id"
      />
    </div>
    <Arrow direction="right" v-on:click="increment" />
  </div>
</template>

<script>
import Exhibition from "./Exhibition.vue";
import Arrow from "./Arrow.vue";

const transitionTime = 1;

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
      this.$store.commit('setCaptionVisible', false);
      let index = this.index;
      index++;
      index %= this.config.length;
      this.index = index;
      this.sleepSwitcher();
    },
    decrement () {
      if (!this.switchable) return;
      this.$store.commit('setCaptionVisible', false);
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
        return `transition: all ${transitionTime}s`; }
  },
  mounted() {
    if (process.env.NODE_ENV !== "development") return;
    if (this.propIndex === 0) ;
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (keyName === ")") {
        this.increment();
      } else if (keyName === "(") {
        this.decrement();
      }
    });
  },
};
</script>

<style scoped lang="scss">
.exhibition-container {
  /* width: 100vw; */
  /* height: 100vh; */
  position: absolute;
  margin: auto 0;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;

  .exhibition {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 0;
    pointer-events: none;
    &.visible {
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>
