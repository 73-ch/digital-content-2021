<template>
  <div class="concept" :style="{ 'background-image': `url(${bgImage})` }">
    <p class="white">
      スマホでアクセスできません。
      <br />
      パソコンで
      <a href="http://digicon.mast.tsukuba.ac.jp/"
        >http://digicon.mast.tsukuba.ac.jp/</a
      >
      にアクセスしてください。
    </p>
    <img
      src="@/assets/images/smartPhoneDeny.png"
      alt="digicon-logo"
      class="smartPhone"
    />
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"));

    return { bgImage };
  },
};
</script>

<style scoped lang="scss">
.white {
  color: white;
  margin-top: 30px;
}

.smartPhone {
  margin-top: 90px;
  width: 100%;
}

.concept {
  font-family: dnp-shuei-nmincho-std, sans-serif;
  font-style: normal;
  font-weight: normal;
  width: 100vw;
  min-height: 100vh;
  padding: 1.6rem;
  background-repeat: repeat;
  background-size: cover;
  background-color: #777;
  &-message {
    width: 800px;
    &__title {
      font-size: $font-size__title;
      padding-bottom: 2px;
    }
    &__sentence {
      margin-top: 1.6rem;
      font-size: 16px;
      color: $color__default;
      line-height: 2.45rem;
    }
  }
}
</style>
