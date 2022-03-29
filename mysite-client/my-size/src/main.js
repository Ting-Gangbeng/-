// 入口文件
import "./mock"
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage";
import "./eventBus";
import store from "./store"
store.dispatch("setting/fetchSetting")
Vue.prototype.$showMessage = showMessage;





// 注册全局指令
import vLoading from "./directives/loading"
import vLazy from "./directives/lazy"
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy)



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// console.log(this.$route.params.categoryId)

// 测试
// console.log(this.$router)

//测试事件总线
// import eventBus from "./eventBus";

// function handler1(data) {
//   console.log("handler1", data)
// }
// eventBus.$on("event1", handler1)
// window.eventBus = eventBus;


// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).use(store).use(router).mount('#app')
