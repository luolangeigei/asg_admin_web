<template>
  <el-menu
    :collapse="isCollapse"
    default-active="/index"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router='true'
    :unique-opened="true"
  >
    <h3>{{ isCollapse ? 'ASG' : 'ASG后台管理系统' }}</h3>
    <el-menu-item index="/index">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/index/person">
      <i class="el-icon-s-custom"></i>
      <span slot="title">人员管理</span>
    </el-menu-item>
    <el-submenu index="/index/enroll">
      <template slot="title">
        <i class="el-icon-s-marketing"></i>
        <span>赛事管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/enroll">报名管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/index/schedule">赛程管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/index/blok">
      <template slot="title">
        <i class="el-icon-data-line"></i>
        <span>文章公告栏</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/blok">公告管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/index/news">文章管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "",
  computed:{
    isCollapse(){
        return this.$store.state.isCollapse
    }
  }
};
</script>

<style scoped lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width:200px;
    min-height:400px;
  }
  .el-menu{
    height:100vh;
    border-right:none;
    h3{
        color:#fff;
        text-align: center;
    }
  }
</style>
