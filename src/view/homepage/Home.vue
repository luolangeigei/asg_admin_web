<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <el-image :src="$store.state.userInfo.base64" fit="cover">
              <div slot="error" class="image-slot">
                <i class="el-icon-document-delete"></i>
              </div>
            </el-image>
            <div class="userinfo">
              <el-tooltip
                class="item"
                effect="dark"
                :content="userInfo.chinaname"
                placement="top"
              >
                <p class="name">{{ userInfo.chinaname }}</p>
              </el-tooltip>
              <p v-if="userInfo.isadmin" class="access">
                {{ userInfo.roles[1] ? "超级管理员" : "管理员" }}
              </p>
              <p v-else class="access">普通用户</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              用户使用邮箱：<span>{{ userInfo.email }}</span>
            </p>
            <p>
              用户的序列号：<span>{{ userInfo.id }}</span>
            </p>
            <p>
              该用户的职位：<span>{{ userInfo.officium }}</span>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-row>
            <el-col class="updateInfo" :span="12">
              <el-row>
                <el-col :span="24">
                  <el-upload
                    action
                    :auto-upload="false"
                    list-type="picture-card"
                    :show-file-list="false"
                    style="margin: 10px"
                    :before-upload="beforeAvatarUpload"
                    :on-change="transformBase"
                    :on-success="uploadImg"
                  >
                    上传头像
                  </el-upload>
                </el-col>
              </el-row>
              <el-row>
                <el-input
                  v-model="ChinaName"
                  placeholder="请修改中文名"
                  maxlength="10"
                  show-word-limit
                ></el-input>
                <el-button @click="updateName" type="primary"
                  ><i class="el-icon-edit"></i>修改</el-button
                >
              </el-row>
              <el-row>
                <el-select v-model="job" placeholder="请选择">
                  <el-option
                    v-for="item in jobs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-input
                    v-model="adminPassword"
                    placeholder="请输入密码"
                    style="margin: 0 0 0 10px"
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" @click="beSuperAdmin" circle
                    ><i class="el-icon-thumb"></i
                  ></el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="1">
              <div class="line"></div>
            </el-col>
            <el-col :span="11">
              <el-input
                v-model="userName"
                placeholder="请输入用户名"
              ></el-input>
              <el-input v-model="password" placeholder="请输入密码"></el-input>
              <el-input v-model="eMail" placeholder="请输入邮箱"></el-input>
              <el-button @click="beAdmin" type="primary"
                ><i class="el-icon-user-solid"></i>新增人员</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="6">
        <el-input v-model="searchValue" placeholder="请输入名字搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          style="margin: 10px"
          type="success"
          @click.native="searchByName"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格开始 -->
    <el-row v-loading="loading">
      <el-col :span="24">
        <el-table :data="personList" border style="width: 100%">
          <el-table-column prop="id" label="序列号" width="70" align="center">
          </el-table-column>
          <el-table-column
            prop="roles"
            label="身份"
            width="150"
            :formatter="dealRoles"
          >
          </el-table-column>
          <el-table-column prop="chinaname" label="中文名" width="200">
          </el-table-column>
          <el-table-column prop="name" label="用户名" width="150">
          </el-table-column>
          <el-table-column
            prop="officium"
            label="职位"
            width="150"
            :formatter="formatRoles"
          >
          </el-table-column>
          <el-table-column
            prop="isadmin"
            label="查看权限"
            width="160"
            :formatter="formatBoolean"
          >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="auto">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <button class="operationBtn" @click="setRoles(scope.row.id)">
                设职
              </button>
              <button
                class="operationBtn"
                @click="handleSetAdmin(scope.row.id)"
              >
                设权
              </button>
              <button class="operationBtn" @click="handleDelUser(scope.row.id)">
                删除
              </button>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getUsers,
  updateChinaName,
  enrollAdmin,
  setAdmin,
  delUser,
  setRole,
  getSuperAdmin,
  uploadImg,
  searchName,
} from "@/api/home";
export default {
  data() {
    return {
      personList: [],
      ChinaName: "",
      userName: "",
      password: "",
      chinaname: "",
      eMail: "",
      //加载
      loading: false,
      //分页
      currentPage: 0,
      total: 200,
      jobs: [
        {
          value: "FrontEnd",
          label: "[研发]-前端",
        },
        {
          value: "BackEnd",
          label: "[研发]-后端",
        },
        {
          value: "Anchor",
          label: "[技术]-导播",
        },
        {
          value: "BOSS",
          label: "[管理]-主办方",
        },
        {
          value: "Arranger",
          label: "[管理]-排班人",
        },
        {
          value: "Secretary",
          label: "[管理]-秘书",
        },
        {
          value: "Recruiter",
          label: "[管理]-招募",
        },
        {
          value: "Designer",
          label: "[宣发]-海报",
        },
        {
          value: "Video",
          label: "[宣发]-视频剪辑",
        },
        {
          value: "Public",
          label: "[言论]-公关",
        },
        {
          value: "Administration",
          label: "[言论]-群管",
        },
        {
          value: "Commentator",
          label: "[技术]-解说",
        },
        {
          value: "referees",
          label: "[技术]-裁判",
        },
        {
          value:"none",
          label:"无职位"
        }
      ],
      job: "",
      adminPassword: "",
      logoImg: "",
      //搜索
      searchValue: "",
    };
  },
  mounted() {
    this.initGetUsers(1, 5);
  },
  methods: {
    initGetUsers(page, pagesize) {
      this.loading = true;
      getUsers(page, pagesize)
        .then((res) => {
          console.log(res.data);
          this.personList = res.data;
          setTimeout(() => {
            this.loading = false;
          }, 800);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.loading = false;
          }, 800);
        });
    },
    updateName() {
      updateChinaName(this.ChinaName)
        .then(() => {
          this.$message.success("修改成功！");
          this.initGetInfo();
        })
        .catch((err) => {
          this.$message.error(err.data);
        });
    },
    beAdmin() {
      enrollAdmin(this.userName, this.password, this.ChinaName, this.eMail)
        .then(() => {
          this.$message.success("成功！");
          this.initGetUsers(1, 5);
        })
        .catch((err) => {
          this.$message.error("失败" + err);
        });
    },
    // 设置管理员
    handleSetAdmin(id) {
      setAdmin(id)
        .then(() => {
          this.$message.success("设置成功！");
          this.initGetUsers(this.currentPage, 5);
        })
        .catch(() => {
          this.$message.error("设置失败，请联系超级管理员！");
        });
    },
    // 删除用户
    handleDelUser(id) {
      console.log(id);
      delUser(id)
        .then(() => {
          this.$message.success("删除成功！");
          this.initGetUsers(this.currentPage, 5);
        })
        .catch(() => {
          this.$message.error("删除失败，请联系超级管理员！");
        });
    },
    //分页改变
    handleCurrentChange(val) {
      this.initGetUsers(val, 5);
    },
    //formatter
    formatBoolean(row, column, cellValue) {
      var ret = ""; //你想在页面展示的值
      if (cellValue) {
        ret = "管理用户的增删改查"; //根据自己的需求设定
      } else {
        ret = "无权限";
      }
      return ret;
    },
    formatRoles(row, column, cellValue) {
      var rec = "";
      switch (cellValue) {
        case "FrontEnd":
          rec = "[研发]-前端";
          break;
        case "BackEnd":
          rec = "[研发]-后端";
          break;
        case "Anchor":
          rec = "[技术]-导播";
          break;
        case "BOSS":
          rec = "[管理]-主办方";
          break;
        case "Arranger":
          rec = "[管理]-排班人";
          break;
        case "Secretary":
          rec = "[管理]-秘书";
          break;
        case "Recruiter":
          rec = "[管理]-招募";
          break;
        case "Designer":
          rec = "[宣发]-海报";
          break;
        case "Video":
          rec = "[宣发]-视频剪辑";
          break;
        case "Public":
          rec = "[言论]-公关";
          break;
          case "Administration":
          rec = "[言论]-群管";
          break;
          case "Commentator":
          rec = "[技术]-解说";
          break;
          case "referees":
          rec = "[技术]-裁判";
          break;
          default:
          rec = '无职位'
      }
      return rec
    },
    dealRoles(row, column, cellValue) {
      let rec = "";
      if (cellValue.includes("nbadmin")) {
        rec = "超级管理员";
      } else if (cellValue.includes("admin")) {
        rec = "管理员";
      } else {
        rec = "普通用户";
      }
      return rec;
    },
    //设置职位
    setRoles(id) {
      setRole(id, this.job)
        .then(() => {
          this.$message.success("设置成功！");
          this.initGetUsers(this.currentPage, 5);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //成为超级管理员
    beSuperAdmin() {
      console.log(this.adminPassword);
      getSuperAdmin(this.adminPassword)
        .then(() => {
          this.$message.success("设置成功！");
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //上传头像
    transformBase(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      const self = this;
      reader.onload = function () {
        // 转换完成输出该文件base64编码
        self.logoImg = reader.result;
        self.$store.commit("SET_LOGO", self.logoImg);
        self.uploadImg(self.logoImg);
      };
    },
    //上传请求
    uploadImg(logoImg) {
      uploadImg(logoImg)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //判断文件大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(isLt2M);
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //搜索
    searchByName() {
      this.loading = true;
      searchName(this.searchValue)
        .then((res) => {
          if (res.data !== []) {
            this.personList = res.data;
          } else {
            this.$message.error("未搜索到该用户！");
          }
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style scoped lang="less">
@btn-color: #53a0d4;
.el-row {
  margin-bottom: 20px;
}
.updateInfo {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow-y: scroll;
  height: 220px;
  width: 40%;
}
.el-input {
  margin: 10px;
  width: 70%;
}
.el-button {
  margin: 0 10px;
  width: 70%;
}
.el-card {
  margin: 0 20px;
  height: 38vh;
}
.el-select {
  width: 70%;
  margin-left: 10px;
  margin-bottom: 10px;
}
.line {
  height: 30vh;
  width: 2px;
  border-right: 1px solid #ddd;
}

.operationBtn {
  text-align: center;
  line-height: 22px;
  float: left;
  height: 22px;
  width: 40px;
  outline: none;
  margin: 0 3px;
  background-color: @btn-color;
  border-color: transparent;
  color: #fff;
  &:nth-child(3) {
    background-color: red;
  }
  &:hover {
    background-color: #ddd;
    color: #333;
  }
}
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .el-image {
    margin-right: 10%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  /deep/.image-slot {
    color: #fff;
    background: red;
    text-align: center;
    line-height: 120px;
    font-size: 25px;
  }
  .userinfo {
    .name {
      width: 150px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 2em;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 24px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
</style>
