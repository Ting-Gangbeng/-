<template>
  <div class="blog-comment-container">
    <MassageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MassageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MassageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    //测试
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.handleScroll);

  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    // 加载下一页
    async fMore() {
      if (!this.hasMore) {
        //没有更多的数据
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.total++;
      this.data.rows.unshift(resp);
      callback("评论成功"); //告诉子组件，我这边处理完了，你继续
    },
    //滚动到底加载下一页
    handleScroll(dom) {
      if (this.isLoading||!dom) {
        //目前正在加载更多
        return;
      }
      const range = 100; //确定一个到底的范围
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        console.log("加载更多");
        this.fMore();
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>