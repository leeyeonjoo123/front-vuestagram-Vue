import { createStore } from "vuex";

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
  },
  actions: {},
});

export default store;
