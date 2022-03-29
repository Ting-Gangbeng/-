<template>
  <div class="add-project-container">
    <div class="block">项目名称</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.name"
        placeholder="请输入项目的描述(每一项以英文逗号分隔）"
      ></el-input>
    </div>

    <div class="block">项目描述</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.description"
        placeholder="请输入项目的描述"
      ></el-input>
    </div>

    <div class="block">项目链接</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.url" placeholder="请输入项目的链接"></el-input>
    </div>

    <div class="block">github地址</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.github"
        placeholder="请输入项目的github地址"
      ></el-input>
    </div>

    <div style="margin-bottom: 15px">
      <Upload v-model="form.thumb" uploadTitle="项目预览图地址" />
    </div>

    <div class="block">项目等级</div>
    <div style="margin-bottom: 15px">
      <el-select v-model="form.order" placeholder="分类等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <div>
      <el-button type="primary" round @click="addProjectHandle"
        >发布项目</el-button
      >
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import { addProject } from "@/api/project.js";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  methods: {
    addProjectHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);
      addProject(obj).then((res) => {
        console.log(res);
        this.$router.push("/projectsList");
        this.$message.success("添加项目成功");
      });
    },
  },
};
</script>

<style scoped lang="scss">
.block {
  font-weight: 100;
}
.add-project-container {
  margin: 15px 15px;
}
</style>