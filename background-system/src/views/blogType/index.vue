<template>
  <div class="blog-type-container">
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入要添加的分类,左边选择该分类的等级"
      v-model="input"
      class="input-with-select blogAddInput"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </el-input>
    <el-button
      slot="append"
      type="primary"
      style="margin-left: 10px"
      @click="addBlogTypeHandle()"
      >添加</el-button
    >
    <!-- 表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column prop="description" label="文章数量">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="description"
        label="操作"
        width="150px"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑文章分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  delBlogType,
  findOneBlogType,
  updateOneBlogType,
} from "@/api/blogType.js";
export default {
  data() {
    return {
      input: "",
      select: "1",
      listLoading: false,
      data: [],
      dialogFormVisible: false, //默认不显示编辑框
      form: {
        name: "",
        order: "",
        id: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getBlogType().then((res) => {
        this.listLoading = false;
        this.data = res.data;
      });
    },
    //编辑文章分类方法
    editBlogTypeHandle({ id }) {
      // 1.请求返回数据回填到表单 2.打开dialog
      findOneBlogType(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    //删除文章分类方法
    deleteBlogTypeHandle({ id }) {
      this.$confirm(
        "删除该分类后，该分类下面的所有文章将变为未分类状态, 是否继续?",
        "是否删除此文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          //确认删除
          delBlogType(id).then((res) => {
            // console.log(res);
            //删除后重新获取一下数据
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加文章分类
    addBlogTypeHandle() {
      if (this.input) {
        //如果input里面有东西才添加
        addBlogType({ name: this.input, order: this.select }).then((res) => {
          this.fetchData();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        });
      } else {
        this.$message.error("分类名称不能为空");
      }
    },
    //确认编辑文章分类
    confirmEditBlogTypeHandle() {
      //编辑完成后,给服务器发送请求
      updateOneBlogType({ id: this.form.id, data: this.form }).then((res) => {
        this.fetchData();
        this.$message.success("更行分类成功");
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style>
.blogAddInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>