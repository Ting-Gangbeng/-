import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

// @param {String} content消息内容
// @param {String} type消息类型 info error success warn
// @param{Number}duration多久消失，0为不消失
// @param {HTMLElement} container 容器，消息会显示在该容器正中，如果不传，则显示在页面正中
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "imfo";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    //创建消息元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, {
        type,
    });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    // 设置样式
    const typeClassname = styles[`message-${type}`]//类型样式名
    div.className = `${styles.message} ${typeClassname}`;

    //判断容器的position是否有改动
    if(options.container){
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }
    
    container.appendChild(div);

    //浏览器强行渲染d
    div.clientHeight;//导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    // 等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
        // 移除div
        div.addEventListener("transitionend", function () {
            div.remove();
            //有回调函数 运行回调函数
            options.callback && options.callback();
        }, { once: true })
    }, duration)
}