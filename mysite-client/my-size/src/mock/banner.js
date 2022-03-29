import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
    code: 0,
    msg: "",
    data: [
        {
            id: "1",
            midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
            bigImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F01%2F79%2Fs_1198_b87c88a0d227e8567067eef0ce46db6a.jpg&refer=http%3A%2F%2Fpic.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647599793&t=8d8c2e95e33ebd0d07842800c6469e48",
            title: "凛冬将至",
            description: "人唯有恐惧的时候方能勇敢",
        },
        {
            id: "2",
            midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
            bigImg: "https://img1.baidu.com/it/u=1999719568,3578583273&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
            title: "血火同源",
            description: "如果我回头，一切都完了",
        },
        {
            id: "3",
            midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
            bigImg: "https://img1.baidu.com/it/u=172450038,3869677341&fm=26&fmt=auto",
            title: "听我怒吼",
            description: "兰尼斯特有债必偿",
        },
    ],
});
