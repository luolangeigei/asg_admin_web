<template>
  <div>
    <el-row>
      <el-select
        v-model="eventsname"
        size="mini"
        style="margin-bottom: 10px; margin-right: 30px"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
          <span>{{ item.name }}</span>
          <i
            v-if="item.is_over"
            style="color: red; margin-left: 20px"
            class="el-icon-warning"
          ></i>
          <i
            v-else
            style="color: green; margin-left: 20px"
            class="el-icon-success"
          ></i>
        </el-option>
      </el-select>
      <span style="color: red" v-if="isOver">
        比赛已经结束
        <el-tooltip
          effect="dark"
          content="进入赛程页面-赛季-结束赛程"
          placement="top"
        >
         <span><i class="el-icon-question"></i></span>
        </el-tooltip>
      </span>
      <span style="color: green" v-else
        >比赛正在进行中<i class="el-icon-more"></i
      ></span>
    </el-row>
    <el-table
      height="75vh"
      style="width: 100%"
      :data="teamList"
      border
      v-loading="loading"
    >
      <el-table-column
        prop="timer"
        label="报名日期"
        width="200"
        :formatter="formatterTimer"
      >
      </el-table-column>
      <el-table-column label="LOGO" width="80" align="center">
        <template slot-scope="scope">
          <img class="logo_url" :src="scope.row.logo_uri" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="战队名" width="200">
      </el-table-column>
      <el-table-column prop="piaoshu" label="获赞数" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="auto">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="primary" size="small"
            >检查</el-button
          >
          <el-button type="danger" size="small" @click="delTeam(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getEnrollList, delEnrollTeam } from "@/api/enroll/index";
import { getAllEvents } from "@/api/gameSeason/index";
export default {
  name: "AllTeam",
  mounted() {
    this.initData(1, 10, "time", this.eventsname);
    this.initSeason();
  },
  data() {
    return {
      teamList: [],
      options: [],
      currentPage: 1,
      total: 200,
      loading: false,
      // 是否结束
      isOver: null,
      eventsname: "第一届ASG高校赛",
    };
  },
  methods: {
    initData(page, size, sort, eventsname) {
      this.loading = true;
      getEnrollList(page, size, sort, eventsname)
        .then((res) => {
          this.teamList = res.data;
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
    //格式化日期
    formatterTimer(row, column, cellValue) {
      let rec;
      let year = cellValue.slice(0, 4);
      let month = cellValue.slice(5, 7);
      let day = cellValue.slice(8, 10);
      let time = cellValue.slice(11, 19);
      rec = year + "年" + month + "月" + day + "日" + " " + time;
      return rec;
    },
    //检查事件
    check(row) {
      console.log(row);
      this.$store.commit("updateTeamName", row.name);
      this.$emit("searchteam");
    },
    //删除战队
    delTeam(row) {
      this.$confirm("是否删除该战队信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          delEnrollTeam(row.name)
            .then(() => {
              this.$message.success("删除成功");
              this.initData(1, 10, "time", this.eventsname);
            })
            .catch((err) => {
              this.$message.error("删除失败") + err;
            });
        })
        .catch(() => {
          this.$message.warning("取消删除！");
        });
    },
    handleCurrentChange() {
      this.initData(this.currentPage, 10, "time", this.eventsname);
    },
    // 获取赛季
    initSeason() {
      getAllEvents()
        .then((res) => {
          this.options = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //处理选择框
    handleChange(e) {
      let index = this.options.map((item) => item.name).indexOf(e);
      this.isOver = this.options[index].is_over;
      this.initData(1, 10, "time", this.eventsname);
    },
  },
};
</script>

<style scoped lang="less">
.logo_url {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
