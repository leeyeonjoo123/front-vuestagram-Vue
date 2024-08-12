<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step++" v-if="step == 1">Next</li>
      <li :class="filterPicked" @click="publish" v-if="step == 2">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
    <p>{{ newLikesNaming }} {{ age }} {{ name }}</p>
  </div>
  <!-- <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기버튼</button> -->

  <!-- props 보내려면 :보낼작명="이름"등록하고 쓰고 -->
  <Container
    :posting="posting"
    :step="step"
    :image="image"
    @write="mycontent = $event"
  />
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        multiple
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import postdata from "./assets/postdata.js";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      posting: postdata,
      moreClick: 0,
      step: 0,
      image: "",
      mycontent: "",
      filterPicked: "",
    };
  },
  mounted() {
    this.emitter.on("filterApply", (a) => {
      this.filterPicked = a;
    });
  },
  components: {
    Container,
  },
  //처음에만 실행되고 값을 간직함.
  computed: {
    name() {
      return this.$store.state.name;
    },
    //state를 간단하게 쓸 수 있다.
    ...mapState(["name", "age"]),
    //state 명을 바꿔서 사용 가능
    ...mapState({ newLikesNaming: "likes" }),
  },
  methods: {
    //mutations 함수들 간단하게 쓰기
    ...mapMutations(["setMore", "likesUp"]),

    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreClick}.json`)
        .then((result) => {
          this.posting.push(result.data);
          this.moreClick++;
        })
        .catch((err) => {
          alert("더 보기가 실패하였습니다. 잠시후에 시도해주세요");
        });
    },
    upload(e) {
      console.log("이미지");
      //업로드한 파일을 리스트로 알려준다.[] array처럼 사용하면 됨
      let file = e.target.files;
      //브라우저 끄면 없어지는 임시 URL
      let url = URL.createObjectURL(file[0]);
      this.image = url;
      this.step++;
      console.log(url);
      console.log(this.step);
    },
    publish() {
      var myposting = {
        name: "Kim Coco",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.image,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.mycontent,
        filter: this.filterPicked,
      };
      this.posting.unshift(myposting);
      console.log(this.filterPicked);
      this.step = 0;
      console.log("step reset" + this.filterPicked);
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
