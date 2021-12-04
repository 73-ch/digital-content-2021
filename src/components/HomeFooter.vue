<template>
  <div class="home-footer">
    <div class="home-footer__btns">
      <div class="home-footer__btns-col">
        <button>Member</button>
      </div>
      <div class="home-footer__btns-col">
        <button class="home-footer__btns-label">Producer</button>
        <button>Namikawa Kosaku</button>
      </div>
      <div class="home-footer__btns-col">
        <button class="home-footer__btns-label">Teacher</button>
        <button><a href="https://yoichiochiai.com/">Ochiai Yoichi</a></button>
      </div>
      <div class="home-footer__btns-col">
        <button><a href="">Many Other members involved in this project</a></button>
      </div>
    </div>
  </div>
</template>

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
        background-color: #fff;
        border: none;
        width: 180px;
        height: 100%;
        margin: 0.1rem;
        font-family: $font-family__default;
        font-weight: bold;
        box-shadow: inset -5px 0px 2px rgba(0, 0, 0, 0.8), inset 0px -5px 2px rgba(64, 64, 64, 0.8);
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
        &:active {
          background-color: #ccc;
        }
      }
    }
    &-label {
      pointer-events: none;
    }
  }
}
</style>