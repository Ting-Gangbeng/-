export default function (timestamp, showTime = false) {
    const date = new Date(+timestamp);
    //将月和日变成两位数
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = (date.getDate()).toString().padStart(2, "0")
    let str = `${date.getFullYear() + 1}-${month}-${day}`
    if (showTime) {//时分秒
        const hour = date.getHours.toString().padStart(2, "0")
        const minute = date.getHours.toString().padStart(2, "0")
        const second = date.getHours.toString().padStart(2, "0")
        str += ` ${hour}:${minute}:${second}`;
    }
    return str;
}