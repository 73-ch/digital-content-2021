<template>
  <div class="modal">
    <div class="modal-board">
      <div class="modal-board__message">
        <p>ネットワーク速度が速い環境でご視聴ください。</p>
        <p>また、この四角が全て見えている状態になるまで、ブラウザのウィンドウを拡大してください。</p>
        <p v-if="isOpen" style="color: limegreen">開館中</p>
        <p v-else style="color: orangered">閉館中(OPEN: 10:00~20:00)</p>
      </div>
      <div class="modal-board__button">
        <button v-if="isButtonClickable" @click="$emit('closeModal')">{{ isOpen ? "鑑賞する" : "覗く" }}</button>
        <button v-else @click="$emit('closeModal')" disabled>{{ isOpen ? "鑑賞する" : "覗く" }}</button>
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
  },
  computed: {
    isOpen() {
      const now = new Date().getUTCHours();
      return now >= 1 && now < 11;
    }
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
  z-index: 110;
  &-board {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1100px;
    height: 600px;
    background-color: #cccccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
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
