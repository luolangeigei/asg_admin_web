<template>
  <div>
    <el-table :data="commentator" border>
      <el-table-column prop="id" label="序号" width="60"> </el-table-column>
      <el-table-column label="头像" width="150">
        <template slot-scope="scope">
          <el-image :src="scope.row.base64">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="职位" width="160">
        <template slot-scope="scope">
          <span v-if="!scope.row.isadmin"
            >ASG常驻解说<i style="color: gold" class="el-icon-s-check"></i
          ></span>
          <span v-else>解说管理员</span>
        </template>
      </el-table-column>
      <el-table-column prop="chinaname" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"> </el-table-column>
      <el-table-column label="是否是管理员" width="200">
        <template slot-scope="scope">
             <span v-if="scope.row.isadmin"><i class="el-icon-s-custom"></i>解说组长</span>
             <span v-else><i class="el-icon-user-solid"></i>普通用户</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <el-button type="success" size="mini">升级</el-button>
        <el-button type="warning" size="mini">替换</el-button>
        <el-button type="danger" size="mini">劝退</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserRoles } from "@/api/schedule/index";
export default {
  mounted() {
    this.initGetCommentary();
  },
  data() {
    return {
      commentator: [],
    };
  },
  methods: {
    initGetCommentary() {
      let params = {
        opname: "Commentator",
      };
      getUserRoles(params)
        .then((res) => {
          this.commentator = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less"></style>
