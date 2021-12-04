<template>
  <div class="home-contents">
    <div class="home-contents-side home-contents-section">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non placeat nobis tempore quis ea minus dolor quibusdam dolores voluptatem expedita magnam obcaecati ex fugit, quia, commodi excepturi delectus asperiores.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, tenetur enim provident.
    </div>
    <div class="home-contents-main home-contents-section">
      <div class="home-contents-main__work">
        <work-list 
          :workImages="filteredWorkImages"
        />
      </div>
      <div class="home-contents-main__concept">
        <a :href="conceptBannerLink"><img src="@/assets/images/concept_banner.png"></a>
      </div>
      <div class="home-contents-main__work">
        <work-list 
          :workImages="filteredWorkImages"
        />
      </div>
      <div class="home-contents-main__flyer">
        <div class="home-contents-main__flyer-banner">
          <a :href="flyerBannerLink"><img src="@/assets/images/flyer_banner.png"></a>
        </div>
        <div class="home-contents-main__flyer-message">
          是非ダウンロードしてお手元にご用意して頂いてからご覧ください。
        </div>
      </div>
      <div class="home-contents-main__info">
        <div class="home-contents-main__info-title">
          Who, When, How mach and Where?
        </div>
        <div class="home-contents-main__info-lines">
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Host : Media Arts, Science and Technology</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Date : January 1 (Fri) - January 1 (Fri)</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Price : Free</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Venue : Online</div>
        </div>
      </div>
    </div>
    <div class="home-contents-works home-contents-section">
      <div class="home-contents-works__img"></div>
      <div class="home-contents-works__link">↑作品展はこちら</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import WorkList from '@/components/WorkList.vue'
export default {
  components: {
    WorkList
  },
  setup() {
    const workImageIndex = ref(0)
    const conceptBannerLink = computed(() => require("@/assets/images/concept_banner.png"))
    const flyerBannerLink = computed(() => require("@/assets/images/flyer_banner.png"))
    const workImages = ["logo copy.png", "logo copy 2.png", "logo copy 3.png", "logo copy 4.png", "Test1.jpg", "Test2.jpg", "Test3.jpg"]
    const filteredWorkImages = computed(() => {
      if (workImageIndex.value + 4 > workImages.length) {
        // インデックスが画像の数を超えた時
        const remainder = workImageIndex.value + 4 - workImages.length
        return workImages.slice(workImageIndex.value).concat(workImages.slice(0, remainder))
      } else {
        return workImages.slice(workImageIndex.value, workImageIndex.value + 4)
      }
    })

    const initAutoImageSwitch = () => {
      setInterval(() => {
        workImageIndex.value = (workImageIndex.value + 4) % workImages.length
      }, 5000)
    }

    onMounted(() => {
      initAutoImageSwitch()
    })

    return { conceptBannerLink, flyerBannerLink, filteredWorkImages }
  }
}
</script>

<style scoped lang="scss">
.home-contents {
  font-size: $font-size__small;
  height: $height__home-content;
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  &-side {
    width: $width__home-contents-side;
  }
  &-main {
    width: $width__home-contents-main;
    &__work {

    } 
    &__concept {
      width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    &__flyer {
      margin-top: 10px;
      &-banner {
        width: 280px;
        img {
          width: 100%;
          height: auto;
          &:hover {

          }
        }
      }
      &-message {
        margin-top: 1rem;
      }
    }
    &__info {
      margin-top: 1.6rem;
      &-title {
        color: $color__yellow;
        font-style: italic;
        margin-bottom: 0.38rem;
      }
      &-lines {
        margin-left: 2rem;
        .circle {
          color: $color__red;
        }
        &__line {
          line-height: 1.1rem;
        }
      }
    }
  }
  &-works {
    height: fit-content;
    width: $width__home-contents-works;
    text-align: center;
    background-color: $color__default;
    &__img {
      height: 280px;
      margin: 1rem;
      background-color: $color__light-black;
    }
    &__link {
      color: $color__gold;
      margin-bottom: 1.6rem;
    }
  }
  &-section {
    & + & {
      margin-left: 2rem;
    }
  }
}
</style>