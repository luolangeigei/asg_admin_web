<template>
  <div>
    发布公告
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <el-input type="textarea" :rows="3" v-model="msg" placeholder="请输入标题"></el-input>
    <el-button @click="pushNews">发布</el-button>
    公告表格
    <el-table
      :data="newsData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="msg"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="formName"
        label="管理员">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="danger" @click="delNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pushNews,getNews,delNews } from '../../api/news/index'
export default {
  name: "News",
  data(){
    return{
      title:'',
      msg:'',
      newsData:[]
    }
  },
  methods:{
    pushNews(){
      pushNews(this.title,this.msg)
      .then(()=>{
        this.$message.success('发布成功！');
        this.title='',
        this.msg = ''
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    //获取news
    initNews(){
         getNews()
         .then(res=>{
          this.newsData = res.data
         })
         .catch(err=>{
          console.log(err)
         })
    },
    //删除公告
    delNews(row){
      this.$confirm('是否缺人删除该公告', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            delNews(row.id)
            .then(()=>{
              this.$message.success('删除成功！')
              this.initNews()
            })
            .catch(()=>{console.log('err')})
        })
    }
  },
  mounted(){
    this.initNews()
  }
 
};
</script>

<style scoped lang="less"></style>
