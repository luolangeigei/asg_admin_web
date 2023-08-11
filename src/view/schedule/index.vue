<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>赛程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
          <el-step title="步骤 4"></el-step>
        </el-steps>
        <div class="opeBox">
          <template v-if="this.active === 1">
            <el-input v-model="belong" placeholder="请输入赛程分类"></el-input>
            <el-select v-model="team1_name" placeholder="请选择主场战队">
              <el-option
                v-for="item in allTeam"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-select v-model="team2_name" placeholder="请选择客场战队">
              <el-option
                v-for="item in allTeam"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="this.active === 2">
            <el-input v-model="startTime" placeholder="选择比赛开始日期">
            </el-input>
            <!-- <el-date-picker
              v-model="closeTime"
              type="datetime"
              placeholder="选择比赛结束日期"
            >
            </el-date-picker> -->
          </template>
          <template v-else-if="this.active === 3">
            <el-select v-model="referee_value" placeholder="请选择裁判">
              <el-option
                v-for="item in referee"
                :key="item.chinaname"
                :label="item.chinaname"
                :value="item.chinaname"
              >
              </el-option>
            </el-select>
            <el-select v-model="commentary_value" placeholder="请选择解说">
              <el-option
                v-for="item in commentary"
                :key="item.chinaname"
                :label="item.chinaname"
                :value="item.chinaname"
              >
              </el-option>
            </el-select>
            <el-select v-model="instructor_value" placeholder="请选择导播">
              <el-option
                v-for="item in instructor"
                :key="item.chinaname"
                :label="item.chinaname"
                :value="item.chinaname"
              >
              </el-option>
            </el-select>
          </template>
          <div class="btn_wrap">
            <el-button
              v-if="active !== 1"
              type="primary"
              style="margin-top: 12px"
              @click="retry"
              ><i class="el-icon-caret-left"></i>上一步</el-button
            >
            <el-button
              v-if="active !== 4"
              type="primary"
              style="margin-top: 12px"
              @click="next"
              ><i class="el-icon-caret-right"></i>下一步</el-button
            >
            <el-button
              v-if="active === 4"
              type="warning"
              style="margin-top: 12px"
              v-loading="btnloading"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              @click.native="submit"
              >发布</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 赛程表 -->
    <el-row>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="赛程信息" name="first">
          <schedule-table />
        </el-tab-pane>
        <el-tab-pane label="赛季管理" name="second">
          <SetSeason />
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import { pushSchedule, getUserRoles } from "@/api/schedule/index";
import { getEnrollList } from "@/api/enroll/index";
export default {
  name: "",
  data() {
    return {
      active: 1,
      allTeam: [],
      team1_name: "",
      team2_name: "",
      belong: "",
      startTime: "YYYY-MM-DDThh:mm:ss.0000000",
      btnloading: false,
      scheduleData: [],
      referee: [], //裁判
      referee_value: "",
      commentary: [], //解说1
      commentary_value: "",
      instructor: [], //导播
      instructor_value: "",
      bilibiliuri: "",
      // 选项卡
      activeName:'first'
    };
  },
  components: {
    ScheduleTable: () => import("./components/ScheduleTable.vue"),
    SetSeason:()=>import("./components/SetSeason.vue")
  },
  methods: {
    next() {
      if (this.active === 1 || this.active === 2) {
        this.active++;
      } else if (this.active === 3) {
        this.active++;
      } else {
        return;
      }
    },
    retry() {
      if (this.active === 1) {
        return;
      } else {
        this.active--;
      }
    },
    // 发布
    submit() {
      (this.btnloading = true), this.setSchedule();
      setTimeout(() => {
        this.btnloading = false;
      }, 2000);
    },
    setSchedule() {
      pushSchedule(
        this.team1_name,
        this.team2_name,
        this.startTime,
        this.belong,
        this.commentary_value,
        this.referee_value,
        this.bilibiliuri
      )
        .then((res) => {
          this.$message.success(res.data);
        })
        .catch((err) => {
          this.$message.error("设置失败！");
          console.log(err);
        });
    },
    // 获取战队信息
    initTeamName() {
      getEnrollList(1, 5,'time','第一届ASG高校赛')
        .then((res) => {
          console.log(res);
          this.allTeam = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取解说列表
    initGetCommentary() {
      let params = {
        opname: "Commentator",
      };
      getUserRoles(params)
        .then((res) => {
          this.commentary = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取裁判列表
    initGetReferee() {
      let params = {
        opname: "referees",
      };
      getUserRoles(params)
        .then((res) => {
          this.referee = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取导播列表
    initGetAnchor() {
      let params = {
        opname: "Anchor",
      };
      getUserRoles(params)
        .then((res) => {
          this.instructor = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // handleClick
  handleClick(tab){
     this.activeName = tab.name
  },
  mounted() {
    this.initTeamName();
    this.initGetCommentary();
    this.initGetAnchor();
    this.initGetReferee();
  },
};
</script>

<style scoped lang="less">
.el-row {
  margin: 20px;
}
.el-input {
  width: 20%;
  margin: 10px;
}
.el-select {
  margin: 10px;
}
.btn_wrap {
  float: right;
}
</style>
