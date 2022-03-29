// 公共的远程获取数据代码
export default function (defaultDataValue = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            }
        },
        async created() {
            this.data = await this.fData();
            this.isLoading = false;
        }
    }

}