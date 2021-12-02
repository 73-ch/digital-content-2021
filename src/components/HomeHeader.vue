<template>
  <div class="home-header">
    <div class="home-header__logo">
      <img src="@/assets/images/logo.png" alt="digicon-logo" >
    </div>
    <div class="home-header__title">
      メ創ディジコン展<span class="home-header__title-year">2021</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-header {
  height: $height__home-header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  &__logo {
    height: 100%;
    img {
      height: 100%;
    }
  }
  &__title {
    font-size: $font-size__home-title;
    margin-left: 1.6rem;
    &-year {
      margin-left: 1rem;
    }
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(to right, #fff 0%, $color__yellow 100%)
  }
}
</style>