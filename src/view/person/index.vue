<template>
  <div>
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="赛事组人员" name="1">
       <management></management>
    </el-tab-pane>
    <el-tab-pane label="裁判人员" name="2">
      <referee></referee>
    </el-tab-pane>
    <el-tab-pane label="解说人员" name="3">
      <commentator></commentator>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
   components:{
    commentator:()=>import('./components/commentator.vue'),
    referee:()=>import('./components/referee.vue'),
    management:()=>import('./components/management.vue')
   },
   data(){
    return{
      activeName:'1'
    }
   }
}
</script>

<style scoped lang="less">

</style>
