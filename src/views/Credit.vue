<template>
  <div class="credit" :style="{'background-image': `url(${bgImage})`}">
    <div class="wrapper">
      <div class="credit-title">
        Credit
      </div>
      <div class="credit-list">
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Producer
          </div>
          <div class="credit-list__item-name">
            浪川洪作
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Director
          </div>
          <div class="credit-list__item-name">
            梅津友翔
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Web
          </div>
          <div class="credit-list__item-name">
            西村純, 内田大智, 山浦一輝, 角田陸
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Design
          </div>
          <div class="credit-list__item-name">
            平戸航之介, 北岡直紀, 野渡蒼美, 永石昂大, 岡村美紀
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            SetUp & Install
          </div>
          <div class="credit-list__item-name">
            猪瀬暖基, 小西智樹, 土佐凛斗, 永倉昂暉, 櫻井澄香, 芳賀 郁弥
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Advertisement
          </div>
          <div class="credit-list__item-name">
            鈴木紫琉, 横山拓巳, 福永将也
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            Teacher
          </div>
          <div class="credit-list__item-name">
            落合陽一
          </div>
        </div>
        <div class="credit-list__item">
          <div class="credit-list__item-label">
            TA
          </div>
          <div class="credit-list__item-name">
            鳥居万椰
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return { bgImage }
  }
}
</script>

<style scoped lang="scss">
.credit {
  font-family: dnp-shuei-nmincho-std, sans-serif;
  font-style: normal;
  font-weight: normal;
  width: 100vw;
  height: 100vh;
  padding: 1.6rem;
  background-repeat: repeat;
  background-size: cover;
  .wrapper {
    width: 800px;
  }
  &-title {
    font-size: $font-size__title;
  }
  &-list {
    &__item {
      font-size: 16px;
      line-height: 1.6rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 0.618rem;
      &-label {
        width: 160px;
      }
      &-name {
        text-align: left;
        margin-left: 0.6rem;
      }
    }
  }
}
</style>
