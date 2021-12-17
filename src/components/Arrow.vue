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

<style lang="scss">
.container {
  position: absolute;
  top: 50%;
  background: rgba(255,255,255); /* 明日調整 */
  width: 13%; /* 明日調整 */
  /* height: 56.25vw; */
  height: 105%;
  z-index: 20;
  cursor: pointer;

  &.left {
    left: 0;
    transform: translate(-1%, -50%);
  }

  &.right {
    right: 0;
    transform: translate(1%, -50%);
    .arrow {
      transform: translate(-50%, -50%) scale(-1, 1);
    }
  }

  &:hover {
    .cls-1 {
      stroke: #1c1c1c;
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
