<template>
  <div>
    컨테이너에요
    <div v-if="step == 0">
      <Post :posting="posting[i]" v-for="(a, i) in posting" :key="i" />
    </div>
    <!-- 필터선택페이지 step == 1 이면 보임-->
    <div v-if="step == 1">
      <div
        :class="filterPicked"
        class="upload-image"
        :style="`background-image: url(${image})`"
      ></div>
      <div class="filters">
        <FilterBox
          :filter="filter"
          :image="image"
          v-for="filter in filters"
          :key="filter"
          >{{ filter }}
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div
        :class="filterPicked"
        class="upload-image"
        :style="`background-image: url(${image}) `"
      ></div>
      <div class="write">
        <textarea
          @input="$emit('write', $event.target.value)"
          class="write-box"
        >
write!</textarea
        >
      </div>
    </div>
  </div>
</template>
<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";

export default {
  name: "Container",
  data() {
    return {
      filters: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      filterPicked: "",
    };
  },
  mounted() {
    this.emitter.on("filterApply", (a) => {
      this.filterPicked = a;
    });
  },
  components: {
    Post,
    FilterBox,
  },
  //props 등록할 때, 이름:데이터형식
  props: {
    posting: Array,
    step: Number,
    image: String,
    filter: String,
  },
};
</script>
<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
