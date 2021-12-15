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
      <div class="home-contents-main__work-lower">
        <work-list
          :workImages="revFilteredWorkImages"
        />
      </div>
      <div class="home-contents-main__info">
        <div class="home-contents-main__info-title">
          Who, When, Where and How much?
        </div>
        <div class="home-contents-main__info-lines">
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Host : Media Arts, Science and Technology</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Date : Dec. 16(Thu) - Dec. 20(Mon), 2021</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Time : 10:00 ~ 20:00</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Price : Free</div>
          <div class="home-contents-main__info-lines__line"><span class="circle">&#9679;</span>Venue : Online</div>
          <div class="home-contents-main__info-lines__line">※17:00 ~ 21:00 on Dec. 16 / 9:00 ~ 17:00 on Dec. 20</div>
        </div>
      </div>
    </div>
    <div class="home-contents-works home-contents-section">
      <div class="home-contents-works__img">
        <a href="#"><img src="@/assets/images/navigation.png"></a>
      </div>
      <div class="home-contents-works__flyer">
        <div class="home-contents-works__flyer-banner">
          <a :href="flyerBannerLink" download="banner.png"><img src="@/assets/images/flyer_banner.png"></a>
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
    const flyerBannerLink = computed(() => require("@/assets/images/flyer.png"))
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
  width: $width__home-contents;
  //height: $height__home-content;
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
  &-side {
    width: $width__home-contents-side;
    line-height: 25.6px;
  }
  &-main {
    width: $width__home-contents-main;
    &__concept {
      cursor: pointer;
      width: 100%;
      z-index: 10;
      transform: translateY(-17px);
      img {
        width: 100%;
        height: auto;
      }
    }
    &__info {
      margin-top: 9.6px;
      &-title {
        color: $color__yellow;
        font-style: italic;
        margin-bottom: 6.08px;
      }
      &-lines {
        transform: translateX(-10px);
        .circle {
          color: $color__red;
        }
        &__line {
          line-height: 17.6px;
          &:last-child {
            margin-top: 9.6px;
          }
        }
      }
    }
    &__work-lower {
      transform: translateY(-17px);
    }
  }
  &-works {
    height: fit-content;
    width: $width__home-contents-works;
    &__img {
      img {
        width: 100%;
      }
    }
    &__flyer {
      margin-top: 4.8px;
      &-banner {
        img {
          width: 100%;
          height: auto;
        }
      }
      &-message {
        margin-top: 6.4px;
      }
    }
  }
  &-section {
    & + & {
      //margin-left: 2rem;
    }
  }
}
</style>
