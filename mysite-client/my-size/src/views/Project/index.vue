<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <a
        :href="item.url ? item.url : 'javascript:void(0)'"
        :target="item.url ? 'blank' : '_self'"
        ><img v-lazy="item.thumb" alt="" class="thumb"
      /></a>
      <div class="info">
        <h2>
          <a
            :href="item.url ? item.url : 'javascript:void(0)'"
            :target="item.url ? 'blank' : '_self'"
          >
            {{ item.name }}
          </a>

          <a
            :href="item.github"
            target="_blank"
            class="github"
            v-if="item.github"
            >github</a
          >
        </h2>
        <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mainScroll from "@/mixins/mainScroll.js";
import { mapState } from "vuex";
export default {
  mixins: [mainScroll("projectContainer")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.project-container {
  transition: 0.5s;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.project-item {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .thumb {
    flex: 0 0 auto;
    width: 250px;
    min-height: 150px;
    // height: 250px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
}
</style>
