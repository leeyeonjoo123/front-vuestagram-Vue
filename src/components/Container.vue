<template>
  <div>
    컨테이너에요
    <Post :posting="posting[i]" v-for="(a, i) in posting" :key="i" />
  </div>
</template>
<script>
import Post from "./Post.vue";
export default {
  name: "Container",
  components: {
    Post,
  },
  //props 등록할때, 데이터형식도 넣어줌
  props: {
    posting: Array,
  },
};
</script>
<style></style>
