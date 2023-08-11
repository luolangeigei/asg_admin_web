<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <span class="text"><router-link to="/index">首页</router-link></span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-image class="user" :src="$store.state.userInfo.base64">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><router-link to="/index">个人中心</router-link></el-dropdown-item
          >
          <el-dropdown-item><a @click="logout">退出</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    logout() {
      this.$store.commit("removeToken");
      this.$router.push("/");
      this.$message.warning("您已退出登录！");
    },
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
};
</script>

<style scoped lang="less">
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    a {
      color: #fff;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
