// import Home from "@/views/Home"
// import About from "@/views/About"
// import Blog from "@/views/Blog"
// import Project from "@/views/Project"
// import Message from "@/views/Message"
// import BlogDetail from "@/views/Blog/Detail"
import NotFound from "@/views/NotFound"
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
window.start = start;
window.done = done
configure({
    trickleSpeed: 20,
    showSpinner: false
})

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

function getPageComponent(pagecompResolver) {
    return async () => {
        start()
        console.log("组件开始加载")
        if (process.env.NODE_ENV === "development") {
            await delay(3000)
        }
        const comp = await pagecompResolver()
        done()
        console.log("组件加载结束")
        return comp;

    }

}

export default [
    {
        name: "Home", path: "/", component: getPageComponent(() =>
            import("@/views/Home")
        ), meta: { title: "首页" }
    },
    {
        name: "About", path: "/about", component: getPageComponent(() =>
            import("@/views/About")
        ), meta: { title: "关于我" }
    },
    {
        name: "Blog", path: "/artical", component: getPageComponent(() =>
            import("@/views/Blog")
        ), meta: { title: "文章" }
    },
    {
        name: "CategoryBlog", path: "/artical/cate/:categoryId", component: getPageComponent(() =>
            import("@/views/Blog")
        ), meta: { title: "文章" }
    },
    {
        name: "BlogDetail", path: "/artical/:id", component: getPageComponent(() =>
            import("@/views/Blog/Detail")
        ), meta: { title: "文章详情" }
    },
    {
        name: "Project", path: "/project", component: getPageComponent(() =>
            import("@/views/Project")
        ), meta: { title: "项目&效果" }
    },
    {
        name: "Message", path: "/message", component: getPageComponent(() =>
            import("@/views/Message")
        ), meta: { title: "留言板" }
    },
    {
        name: "NotFound",
        path: "*",
        component: NotFound
    },
]