<template>
  <div class="home-header">
    <div class="home-header__logo">
      <img src="@/assets/images/logo_kimoji.png" alt="digicon-logo" >
    </div>
    <div class="home-header__title">
      ディジコン制作展2021<span class="home-header__title-sub">-Beyond Internet-</span>
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
    height: 128px;
    img {
      height: 100%;
    }
  }
  &__title {
    font-size: $font-size__title;
    display: inline-block;
    white-space: nowrap;

    &-sub {
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
    transform: translateY(10px);
    background: linear-gradient(to right, #fff 0%, $color__yellow 100%)
  }
}
</style>
