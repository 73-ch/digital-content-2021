<template>
  <div class="home" :style="{'background-image': `url(${bgImage})`}">
    <main>
      <home-header/>
      <home-contents/>
      <home-footer/>
    </main>
  </div>
</template>

<script>
import {computed} from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeContents from '@/components/HomeContents.vue'
import HomeFooter from '@/components/HomeFooter.vue'

export default {
  components: {
    HomeHeader,
    HomeContents,
    HomeFooter
  },
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return {bgImage}
  }
}
</script>

<style scoped lang="scss">
.home {
  font-family: dnp-shuei-nmincho-std, sans-serif;
  font-style: normal;
  font-weight: bold;
  width: 1920px;
  height: 1009px;
  padding: 25.6px;
  background-repeat: repeat;
  background-size: cover;
  background-color: #777;
}
</style>
