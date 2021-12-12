<template>
  <div class="home-contents">
    <div class="home-contents-side home-contents-section">
      本ウェブサイトは筑波大学情報メディア創成学類開講のディジタルコンテンツ表現演習の制作展のウェブサイトです。受講生たちの作品をぜひご覧になっていってください！！<br>
      また、オンライン展示の視聴体験を考えて本ウェブサイト自体にも様々な工夫が凝らされています。ご注目ください！
    </div>
    <div class="home-contents-main home-contents-section">
      <div class="home-contents-main__work">
        <work-list
          :workImages="filteredWorkImages"
        />
      </div>
      <div class="home-contents-main__concept">
        <img @click="openPopupWindow('http://localhost:8080/concept')" src="@/assets/images/concept_banner.png">
      </div>
      <div class="home-contents-main__work">
        <work-list
          :workImages="revFilteredWorkImages"
        />
      </div>
      <div class="home-contents-main__info">
        <div class="home-contents-main__info-title">
          Who, When, How mach and Where?
        </div>
        <div class="home-contents-main__info-lines">
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Host : Media Arts, Science and Technology</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Date : 2021.12.16 - January 1 (Fri)</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Price : Free</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Venue : Online</div>
        </div>
      </div>
    </div>
    <div class="home-contents-works home-contents-section">
      <div class="home-contents-works__img"></div>
      <div class="home-contents-works__flyer">
        <div class="home-contents-works__flyer-banner">
          <a :href="flyerBannerLink"><img src="@/assets/images/flyer_banner.png"></a>
        </div>
        <div class="home-contents-works__flyer-message">
          是非ダウンロードしてお手元にご用意して頂いてからご覧ください。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openPopupWindow } from '@/helpers/PopupWindow.js'
import { ref, computed, onMounted } from 'vue'
import WorkList from '@/components/WorkList.vue'
export default {
  components: {
    WorkList
  },
  setup() {
    const thumbnailNum = 3
    const workImageIndex = ref(0)
    const workImages = ref([])
    const revWorkImages = ref([])
    const flyerBannerLink = computed(() => require("@/assets/images/flyer_banner.png"))
    const filteredWorkImages = computed(() => getPartOfArray(workImages.value, workImageIndex.value, thumbnailNum))
    const revFilteredWorkImages = computed(() => getPartOfArray(revWorkImages.value, workImageIndex.value, thumbnailNum))
    
    // arrayの一部を返す
    const getPartOfArray = (array, startIdx, count) => {
      if (startIdx + count > array.length) {
        const remainder = startIdx + count - array.length
        const array1 = array.slice(startIdx)
        const array2 = array.slice(0, remainder)
        return array1.concat(array2)
      } else {
        return array.slice(startIdx, startIdx + count)
      }
    }

    const initAutoImageSwitch = () => {
      setInterval(() => {
        workImageIndex.value = (workImageIndex.value + thumbnailNum) % workImages.value.length
      }, 5000)
    }

    // サムネディレクトリから画像一覧を取得
    const importImages = () => {
      const result = require.context("@/assets/images/thumbnails/", true, /\.png$/)
      workImages.value = result.keys().map(filename => filename.replace(/.\//g, ''))
      revWorkImages.value = workImages.value.slice().reverse()
    }

    onMounted(() => {
      importImages()
      initAutoImageSwitch()
    })

    return { openPopupWindow, flyerBannerLink, filteredWorkImages, revFilteredWorkImages }
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
    line-height: 1.6rem;
  }
  &-main {
    width: $width__home-contents-main;
    &__concept {
      cursor: pointer;
      width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    &__info {
      margin-top: 0.6rem;
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
    &__img {
      height: 280px;
      margin: 1rem;
      background-color: $color__light-black;
    }
    &__flyer {
      margin-top: 0.3rem;
      &-banner {
        width: 280px;
        img {
          width: 100%;
          height: auto;
        }
      }
      &-message {
        margin-top: 0.4rem;
      }
    }
  }
  &-section {
    & + & {
      margin-left: 2rem;
    }
  }
}
</style>