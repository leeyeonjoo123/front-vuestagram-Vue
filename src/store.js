import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    //모든 컴포넌트에서 사용가능, 사용방법 :  {{ $store.state.데이터명}}
    return {
      likes: 0,
      likesState: false,
      more: {},
    };
  },
  mutations: {
    likesUp(state) {
      if (state.likesState == false) {
        state.likes++;
        state.likesState = true;
      } else {
        state.likes--;
        state.likesState = false;
      }
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  actions: {
    getData(context) {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((result) => {
          console.log(result.data);
          context.commit("setMore", result.data);
        });
    },
  },
});

export default store;
