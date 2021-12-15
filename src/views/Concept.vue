<template>
  <div class="concept" :style="{'background-image': `url(${bgImage})`}">
    <div class="concept-message">
      <div class="concept-message__title">
        Concept
      </div>
      <div class="concept-message__sentence">
        本制作展は、筑波大学情報メディア創成学類開講のディジタルコンテンツ表現実習の制作展です。
        世界的なCOVID-19の流行によって多くの展示活動は休止することを余儀なくされ、その中でオンラインを用いた様々な展示活動及びそれらに関する議論が生まれました。
        このようなオンラインをテーマにした作品、テレプレゼンスの発端は、通信技術によって距離を超えてつながる世界に多くのアーティストやエンジニア、研究者が希望や懸念を抱き、様々な作品を制作した1990年台から2000年台初頭に遡ります。
        テレプレゼンス黎明期と現在を比べると配信やWebなどの技術は大きく進歩し、それらを取り巻く社会情勢も全く異なりますが、当時の作品は今の時代においても大きな輝きを放ち、テレプレゼンスの核心に迫るような作品ばかりです。
        物理的な繋がりにデジタルのつながりがもたらされた時代に生まれ、物理的なつながりが断たれデジタルのつながりに制限された時代を生きる私たちには何ができるのでしょうか。
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
.concept {
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