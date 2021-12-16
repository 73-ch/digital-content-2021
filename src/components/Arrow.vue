<template>
  <div class="container" :class="direction">
    <ArrowSVG class="arrow" />
  </div>
</template>

<script>
import ArrowSVG from './ArrowSVG';

export default {
  components: { ArrowSVG, },
  props: {
    direction: String,
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(140, 140, 140); /* 明日調整 */
  width: 13%; /* 明日調整 */
  /* height: 56.25vw; */
  height: 100%;
  z-index: 5;
  cursor: pointer;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
    .arrow {
      transform: translate(-50%, -50%) scale(-1, 1);
    }
  }

  &:hover {
    .cls-1 {
      stroke: #333;
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    transform: translate(-50%, -50%);
  }
}
</style>
