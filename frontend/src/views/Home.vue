<template>
  <div class="home">
    <Header />

    <Posts />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Posts from "@/components/Posts.vue";

export default {
  name: "Home",
  components: {
    Header, Posts
  },
};
</script>

<style>
html,
body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
</style>
