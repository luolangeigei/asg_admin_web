<template>
  <div>
    <el-form :inline="true" :model="seasonForm" class="demo-form-inline">
      <el-form-item label="赛季名">
        <el-input v-model="seasonForm.name" placeholder="输入赛季名"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input v-model="seasonForm.opentime"></el-input>
      </el-form-item>
      <el-form-item label="报名是否结束">
        <el-radio-group v-model="seasonForm.is_over">
          <el-radio :label="true">已结束</el-radio>
          <el-radio :label="false">未结束</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pushNewEvents">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pushNewEvents } from "@/api/gameSeason/index";
export default {
  name: "SetSeason",
  data() {
    return {
      seasonForm: {
        name: "",
        is_over: false,
        opentime: "xxxx-xx-xxT00:00:00",
      },
    };
  },
  methods: {
    pushNewEvents() {
      pushNewEvents(
        this.seasonForm.name,
        this.seasonForm.is_over,
        this.seasonForm.opentime
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less"></style>
