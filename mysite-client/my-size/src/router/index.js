import Vue from "vue"
import VueRouter from "vue-router";
import routes from "./routes"
import { titleController } from "@/utils"
if(!window.VueRouter){
    Vue.use(VueRouter);//使用Vue插件

}



const router = new VueRouter({
    //配置
    routes,
    mode: "history",
});

router.afterEach((to, from) => {
    if (to.meta.title) {//设置路由标题
        titleController.setRouteTitle(to.meta.title)
    }
})

export default router;