<template>
  <div class="home">
    <home-header />
    <home-contents />
    <home-footer />
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import HomeContents from '@/components/HomeContents.vue'
import HomeFooter from '@/components/HomeFooter.vue'
export default {
  components: {
    HomeHeader,
    HomeContents,
    HomeFooter
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  background-color: $color__blue;
  padding: 2rem;
}
</style>