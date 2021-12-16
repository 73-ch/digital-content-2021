<template>
  <main>
    <section class="caption">
      <h2>{{this.$route.query.number}}</h2>
      <h1>{{this.$route.query.title}}</h1>
      <h2>{{this.$route.query.creator}}</h2>
    </section>
    <section class="video">
      <iframe id="youtube" :width="this.$route.query.width" :height="this.$route.query.height" :src="`https://www.youtube.com/embed/${this.$route.query.id}?autoplay=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white`" title="YouTube video player"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>

    </section>
    <section class="control">
      <button @click="close">閉じる</button>
    </section>

  </main>
</template>

<script>
export default {
  name: "YoutubeViewer",
  methods: {
    close() {
      window.close();
    }
  }
}
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.caption {
  width: 100%;
  padding: 2.5vh 10vw;
}

h1 {
  font-size: 50px;
}
h2 {
  font-size: 25px;
}

h1,h2 {
  color: black;
  text-align: left;
}

.video {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 39.375vw;
}

#youtube {
  width: 70vw;
  height: 39.375vw;
}

.control {
  margin: 50px 0;
}
</style>
