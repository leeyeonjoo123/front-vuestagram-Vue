<template>
  <div>
    컨테이너에요
    <Post />
    <Post />
    <Post />
  </div>
</template>
<script>
import Post from "./Post.vue";
export default {
  name: "Container",
  components: {
    Post,
  },
};
</script>
<style></style>
