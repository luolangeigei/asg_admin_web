<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>报名管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="topSearch">
            <h3>请输入战队名进行搜索:</h3>
            <el-row>
              <el-col :span="16">
                <el-input v-model="$store.state.team_name" placeholder="请输入战队名"  @keyup.enter.native="search"></el-input>
              </el-col>
              <el-button style="margin-left: 10px" type="primary" @click.native = "search">搜索</el-button>
            </el-row>
          </div>
          <div class="showTeam" v-if="teamInfo.length!==0" v-loading="loading">
             <li>
                <span>阵营</span>
                <span>选手ID</span>
                <span>选手名</span>
             </li>
             <li v-for="item in teamInfo[0].role" :key="item.id">
                <img v-if="item.role_lin==='求生者'" src="@/assets/求生者.png">
                <img v-else src="@/assets/监管者.png">
                <span>{{item.role_id}}</span>
                <span>{{teamInfo[0].name}}_{{item.role_name}}</span>
             </li>
          </div>
          <div class="showTeam" v-else>
            <el-empty style="height:62vh" description="暂无搜索到的战队"></el-empty>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
          <all-team @searchteam="search" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {searchInfo,getDetailForm } from '@/api/enroll/index'
const AllTeam = () => import('./component/AllTeam.vue');
export default {
  name: "",
  components:{
    AllTeam
  },
  methods: {
    search(){
      this.loading = true
      searchInfo(this.$store.state.team_name)
      .then(res=>{
        this.teamInfo = res.data
        setTimeout(()=>{
          this.loading = false
        },800)
      })
      .catch(()=>{
        this.loading = false
        this.$message.error('未寻找到该战队！')
      })
    }
  },
  data(){
    return{
      teamInfo:[],
      //加载
      loading:false
    }
  },
  mounted(){
    getDetailForm()
    .then(res=>{
      console.log('战队详细信息：',res.data)
    })
  }
};
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}
.el-col{
  margin-right:10px;
}
.topSearch{
  padding:10px;
  border-bottom:1px solid #ddd;
  h3{
    margin-bottom: 5px;
  }
}
.showTeam{
    li{
      box-sizing: border-box;
      list-style: none;
      width:100%;
      height: 58px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        width:50px;
        height: 50px;
      }
    }
}
</style>
