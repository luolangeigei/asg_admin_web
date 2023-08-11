<template>
  <div>
    <el-button
      type="success"
      icon="el-icon-refresh-left"
      circle
      size="mini"
      style="margin: 5px"
      @click="refresh"
    ></el-button
    >刷新
    <el-button v-if="scheduleData.length === 0" type="warning" @click="ballot" size="mini"
      >一键抽取</el-button
    >
    <el-select style="margin-left:20px" v-model="belong" placeholder="请选择赛程" size="mini" @change="handleChange">
      <el-option
      v-for="item in options"
      :key="item.name"
      :label="item.name"
      :value="item.name">
      <span>{{item.name}}</span>
      <i v-if="item.is_over" style="color:red;margin-left:20px;" class="el-icon-warning"></i>
      <i v-else style="color:green;margin-left:20px;" class="el-icon-success"></i>
    </el-option>
    </el-select>
    <el-table
      height="50vh"
      :data="scheduleData"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="opentime"
        label="开始时间"
        :formatter="formatterTime"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="team1_name" label="主场战队" width="150">
      </el-table-column>
      <el-table-column prop="team2_name" label="客场战队" width="150">
      </el-table-column>
      <el-table-column prop="commentary" label="解说" width="150">
      </el-table-column>
      <el-table-column prop="referee" label="导播" width="80">
      </el-table-column>
      <el-table-column label="回放链接" width="120">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.bilibiliuri !== 'lose' && scope.row.bilibiliuri !==null"
            :href="scope.row.bilibiliuri"
            target="_blank"
            type="success"
            >点击前往</el-link
          >
          <el-link v-else-if="scope.row.bilibiliuri === 'lose'" type="info">回放丢失</el-link>
          <el-link v-else type="danger">回放尚未上传</el-link>
        </template>
      </el-table-column>
      <el-table-column label="获胜队伍" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.winteam === null"
            >比赛进行中<i class="el-icon-loading"></i
          ></span>
          <span class="winner" v-else
            ><i class="el-icon-trophy"></i>{{ scope.row.winteam }}</span
          >
        </template>
      </el-table-column>
      <!-- 2023-07-23T13:00:00 -->
      <el-table-column label="操作" width="auto" align="center">
        <template slot-scope="scope">
          <el-button @click="updateGame(scope.row)" type="primary" size="small"
            >更新</el-button
          >
          <el-button @click="delGame(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="6"
    >
    </el-pagination>
    <!-- 表单 -->
    <el-dialog title="赛程信息" :visible.sync="dialogFormVisible">
      <el-form :model="diaData">
        <el-row>
          <el-col :span="10">
            <el-form-item label="开始时间" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.opentime"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="赛程分类" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.belong"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="主场战队" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.team1_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客场战队" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.team2_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="解说" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.commentary"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="回放链接" :label-width="formLabelWidth">
              <el-input
                v-model="diaData.bilibiliuri"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="裁判"
              v-model="diaData.player"
              :label-width="formLabelWidth"
            >
              <el-input autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="导播" :label-width="formLabelWidth">
              <el-input v-model="diaData.referee" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="赛选获胜队伍" :label-width="formLabelWidth">
            <el-col :span="8">
              <el-input v-model="winteam"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                style="margin-left: 20px"
                type="primary"
                @click="setWinner(diaData.id)"
                >设置获胜队伍</el-button
              >
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSchedule">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  delSchedule,
  getSchedule,
  ballotSchedule,
  updateSchedule,
  setWinGame,
} from "@/api/schedule/index";
import { getAllEvents } from '@/api/gameSeason/index'
export default {
  name: "ScheduleTable",
  data() {
    return {
      scheduleData: [],
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: "200",
      diaData: [],
      winteam: "",
      currentPage: 1,
      pageSize:5,
      belong:'all',
      options:[
        {
          value:'2-1',
          label:'第一届ASG高校赛'
        },
        {
          value:'1-4',
          label:'第四届ASG众创赛'
        },
        {
          value:'3-2',
          label:'第二届ASG神将赛'
        }
      ],
    };
  },
  methods: {
    // <!-- 2023-07-23T13:00:00 -->
    formatterTime(row, column, cellValue) {
      let rec = "";
      let year = cellValue.slice(0, 4);
      let month = cellValue.slice(5, 7);
      let day = cellValue.slice(8, 10);
      let time = cellValue.slice(11, 19);
      rec = year + "年" + month + "月" + day + "日" + " " + time;
      return rec;
    },
    //获取赛程
    initSchedule(page, pagesize,belong) {
      this.loading = true;
      getSchedule(page, pagesize,belong)
        .then((res) => {
          console.log(res.data);
          this.scheduleData = res.data;
          this.total = res.data.length;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    // 获取赛季
    initSeason(){
      getAllEvents()
      .then((res)=>{
         this.options = res.data
       })
       .catch((err)=>{
        console.log(err)
       })
      
    },
    delGame(row) {
      this.$confirm("是否删除该赛程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delSchedule(row.id)
          .then(() => {
            this.$message.success("删除成功！");
            this.initSchedule(this.currentPage, this.pageSize,this.belong);
          })
          .catch((err) => {
            this.$message.error(err);
          });
      });
    },
    refresh() {
      this.initSchedule(this.currentPage, this.pageSize,this.belong);
    },
    updateGame(row) {
      this.dialogFormVisible = true;
      this.diaData = row;
    },
    updateSchedule() {
      const info = {
        team1_name: this.diaData.team1_name,
        team2_name: this.diaData.team2_name,
        belong:this.diaData.belong,
        opentime: this.diaData.opentime,
        commentary: this.diaData.commentary,
        bilibiliuri: this.diaData.bilibiliuri,
        referee: this.diaData.referee,
      };
      updateSchedule(this.diaData.id, info)
        .then((res) => {
          console.log(res.data);
          this.dialogFormVisible = false;
          this.initSchedule(this.currentPage, this.pageSize,this.belong);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //抽签赛程
    ballot() {
      ballotSchedule()
        .then((res) => {
          console.log(res.data);
          this.initSchedule(this.currentPage, this.pageSize,this.belong);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initSchedule(this.currentPage, this.pageSize,this.belong);
    },
    setWinner(id) {
      setWinGame(id, this.winteam)
        .then(() => {
          this.$message.success("设置成功！");
          this.winteam = "";
          this.initSchedule(this.currentPage, this.pageSize,this.belong);
        })
        .catch((err) => {
          console.log(err);
          this.initSchedule(this.currentPage, this.pageSize,this.belong);
        });
    },
    handleChange(){
      this.currentPage = 1
      this.initSchedule(this.currentPage, this.pageSize,this.belong)
    },
  },
  mounted() {
    this.initSchedule(this.currentPage, this.pageSize,this.belong);
    this.initSeason();
  },
};
</script>

<style scoped lang="less">
.winner {
  color: #cccc00;
}
.el-col {
  margin: 0 10px;
}
</style>
