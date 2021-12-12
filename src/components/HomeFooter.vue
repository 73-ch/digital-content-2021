<template>
  <div class="home-footer">
    <div class="home-footer__btns">
      <div class="home-footer__btns-col">
        <button class="home-footer__btns-label">Member</button>
      </div>
      <div class="home-footer__btns-col">
        <button class="home-footer__btns-label">Producer</button>
        <button class="home-footer__btns-label">Namikawa Kosaku</button>
      </div>
      <div class="home-footer__btns-col">
        <button class="home-footer__btns-label">Teacher</button>
        <button class="link" @click="openPopupWindow('https://yoichiochiai.com/')">Ochiai Yoichi</button>
      </div>
      <div class="home-footer__btns-col">
        <button class="link" @click="openPopupWindow('http://localhost:8080/credit')">Many Other members involved in this project</button>
      </div>
    </div>
  </div>
</template>

<script>
import { openPopupWindow } from '@/helpers/PopupWindow.js'
export default {
  setup() {
    return { openPopupWindow }
  }
}
</script>

<style scoped lang="scss">
.home-footer {
  height: $height__home-footer;
  padding: 0 2rem;
  &__btns {
    margin-left: $width__home-contents-side;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    &-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        width: 180px;
        height: 100%;
        margin: 0.1rem;
        font-family: $font-family__default;
        font-weight: bold;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    }
    &-label {
      pointer-events: none;
    }
  }
  .link {
    color: #00f;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>