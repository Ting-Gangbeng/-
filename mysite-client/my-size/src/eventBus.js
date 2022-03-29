// let listeners = []
// export default {
//     //监听
//     $on(eventName, handler) {
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler);
//     },
//     //取消监听
//     $off(eventName, handler) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         listeners[eventName].delete(handler);
//     },
//     //触发事件
//     $emit(eventName, ...args) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         for (const handler of listeners[eventName]) {
//             handler(...args);
//         }
//     }
// }
import Vue from "vue";
const app = new Vue({});

Vue.prototype.$bus = app;
export default app


// 事件名：mainScroll
// 含义：主区域滚动条位置变化后触发

// 事件名：setMainScroll
// 含义：当需要设置主区域位置是触发
