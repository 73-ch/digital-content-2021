<template>
  <div class="modal">
    <div class="modal-board">
      <div class="modal-board__message">
        ネットワーク速度が速い環境でご視聴ください。
        また、この四角が全て見えている状態になるまで、ブラウザのウィンドウを拡大してください。
      </div>
      <div class="modal-board__button">
        <button v-if="isButtonClickable" @click="$emit('closeModal')">OK</button>
        <button v-else @click="$emit('closeModal')" disabled>OK</button>
      </div>
    </div>
    <div class="modal-background" />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    isButtonClickable: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const pointerEvents = computed(() => props.isButtonClickable ? 'auto' : 'none' )

    return { pointerEvents }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
  &-board {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1280px;
    height: 800px;
    background-color: #cccccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__message {
      width: 80%;
      font-size: 32px;
    }
    &__button {
      margin-top: 32px;
      button {
        cursor: pointer;
        font-size: 18px;
        padding: 16px 48px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    }
  }
  &-background {
    width: 100%;
    height: 100%;
    background-color: #00000044;
  }
}
</style>
