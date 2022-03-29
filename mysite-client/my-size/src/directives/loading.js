import loadingUrl from "@/assets/loading.svg"
import styles from "./loading.module.less"
// 得到el中loading效果的img元素
function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]")
}

//创建一个img元素
function createLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading"
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}
//导出指令的配置对象
export default function (el, binding) {
    //    根据binding的值，决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if (binding.value) {//需要img,如果没有img则创建
        if (!curImg) {
            const img = createLoadingImg();
            el.appendChild(img);
        }
    } else {//不需要img,如果有img，则删除
        if (curImg) {
            curImg.remove();
        }
    }
}