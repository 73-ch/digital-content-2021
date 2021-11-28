<template>
  <div class="home-footer">
    <div class="home-footer__btns">
      <div class="home-footer__btns-btn">
        <button>Member</button>
      </div>
      <div class="home-footer__btns-btn">
        <button class="home-footer__btns-label">Producer</button>
        <button>Namikawa Kosaku</button>
      </div>
      <div class="home-footer__btns-btn">
        <button class="home-footer__btns-label">Teacher</button>
        <button>Ochiai Yoichi</button>
      </div>
      <div class="home-footer__btns-btn">
        <button>Other members involved in this project</button>
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
    &-btn {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        width: 180px;
        height: 100%;
        margin: 0.1rem;
      }
    }
    &-label {
      pointer-events: none;
    }
  }
}
</style>