<template>
  <div class="banner-container">
    <!-- //数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="120" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="description" label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg2"
            fit="fill"
          ></el-image
        ></template>
      </el-table-column>

      <el-table-column prop="description" label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg2"
            fit="fill"
          ></el-image
        ></template>
      </el-table-column>

      <el-table-column align="center" prop="description" label="操作">
        <template slot-scope="scope">
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
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- //编辑首页标语 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner.js";
import { server_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [], //存储的全部数据
      dialogFormVisible: false, //编辑对话框是否显示
      form: { //表示每行的数据
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      getBanner().then((res) => {
        //从服务器拿到数据
        this.data = res.data;
        for (let item of this.data) {
          item.midImg2 = server_URL + item.midImg;
          item.bigImg2 = server_URL + item.bigImg;
        }
      });
    },
    editBannerHandle(bannerInfo) {
      //scope.row每行的数据放入编辑框
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;//可见编辑框
    },
    editBannerConfirm() {
      //从upload表单里面拿到用户修改的数据，发送给服务器
      //由于api要返回全部的数据而不是单独的哪一行的数据
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form; //把修改过得那一行改掉
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false; //关闭掉编辑框
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();//重新发送一次数据
      });
    },
  },
};
</script>

<style>
</style>