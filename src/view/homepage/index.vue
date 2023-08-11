<template>
  <el-container>
    <el-aside width="auto">
      <common-aside/>
    </el-aside>
    <el-container>
      <el-header><common-header/></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../../components/CommonAside.vue'
import CommonHeader from '../../components/CommonHeader.vue';
export default {
  name: "HomePage",
  components:{CommonAside,CommonHeader},
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style scoped lang="less">
   .el-header{
    padding:0;
   }
   .el-main{
    overflow-y: scroll;
    height:calc(100vh - 60px)
   }
   .el-aside::-webkit-scrollbar{
    display: none;
   }
</style>
