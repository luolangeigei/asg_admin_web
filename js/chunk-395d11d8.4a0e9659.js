(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-395d11d8"],{"050d":function(e,a,t){},"1b42":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e._self._c;return a("div",[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("div",{staticClass:"user"},[a("el-image",{attrs:{src:e.$store.state.userInfo.base64,fit:"cover"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-document-delete"})])]),a("div",{staticClass:"userinfo"},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.userInfo.chinaname,placement:"top"}},[a("p",{staticClass:"name"},[e._v(e._s(e.userInfo.chinaname))])]),e.userInfo.isadmin?a("p",{staticClass:"access"},[e._v(" "+e._s(e.userInfo.roles[1]?"超级管理员":"管理员")+" ")]):a("p",{staticClass:"access"},[e._v("普通用户")])],1)],1),a("div",{staticClass:"login-info"},[a("p",[e._v(" 用户使用邮箱："),a("span",[e._v(e._s(e.userInfo.email))])]),a("p",[e._v(" 用户的序列号："),a("span",[e._v(e._s(e.userInfo.id))])]),a("p",[e._v(" 该用户的职位："),a("span",[e._v(e._s(e.userInfo.officium))])])])])],1),a("el-col",{attrs:{span:16}},[a("el-card",[a("el-row",[a("el-col",{staticClass:"updateInfo",attrs:{span:12}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-upload",{staticStyle:{margin:"10px"},attrs:{action:"","auto-upload":!1,"list-type":"picture-card","show-file-list":!1,"before-upload":e.beforeAvatarUpload,"on-change":e.transformBase,"on-success":e.uploadImg}},[e._v(" 上传头像 ")])],1)],1),a("el-row",[a("el-input",{attrs:{placeholder:"请修改中文名",maxlength:"10","show-word-limit":""},model:{value:e.ChinaName,callback:function(a){e.ChinaName=a},expression:"ChinaName"}}),a("el-button",{attrs:{type:"primary"},on:{click:e.updateName}},[a("i",{staticClass:"el-icon-edit"}),e._v("修改")])],1),a("el-row",[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.job,callback:function(a){e.job=a},expression:"job"}},e._l(e.jobs,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-input",{staticStyle:{margin:"0 0 0 10px"},attrs:{placeholder:"请输入密码"},model:{value:e.adminPassword,callback:function(a){e.adminPassword=a},expression:"adminPassword"}})],1),a("el-col",{attrs:{span:6}},[a("el-button",{attrs:{type:"success",circle:""},on:{click:e.beSuperAdmin}},[a("i",{staticClass:"el-icon-thumb"})])],1)],1)],1),a("el-col",{attrs:{span:1}},[a("div",{staticClass:"line"})]),a("el-col",{attrs:{span:11}},[a("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.userName,callback:function(a){e.userName=a},expression:"userName"}}),a("el-input",{attrs:{placeholder:"请输入密码"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}}),a("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.eMail,callback:function(a){e.eMail=a},expression:"eMail"}}),a("el-button",{attrs:{type:"primary"},on:{click:e.beAdmin}},[a("i",{staticClass:"el-icon-user-solid"}),e._v("新增人员")])],1)],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入名字搜索"},model:{value:e.searchValue,callback:function(a){e.searchValue=a},expression:"searchValue"}})],1),a("el-col",{attrs:{span:2}},[a("el-button",{staticStyle:{margin:"10px"},attrs:{type:"success"},nativeOn:{click:function(a){return e.searchByName.apply(null,arguments)}}},[e._v("搜索")])],1)],1),a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("el-col",{attrs:{span:24}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.personList,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"序列号",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"roles",label:"身份",width:"150",formatter:e.dealRoles}}),a("el-table-column",{attrs:{prop:"chinaname",label:"中文名",width:"200"}}),a("el-table-column",{attrs:{prop:"name",label:"用户名",width:"150"}}),a("el-table-column",{attrs:{prop:"officium",label:"职位",width:"150",formatter:e.formatRoles}}),a("el-table-column",{attrs:{prop:"isadmin",label:"查看权限",width:"160",formatter:e.formatBoolean}}),a("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"auto"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button",{staticClass:"operationBtn",on:{click:function(a){return e.setRoles(t.row.id)}}},[e._v(" 设职 ")]),a("button",{staticClass:"operationBtn",on:{click:function(a){return e.handleSetAdmin(t.row.id)}}},[e._v(" 设权 ")]),a("button",{staticClass:"operationBtn",on:{click:function(a){return e.handleDelUser(t.row.id)}}},[e._v(" 删除 ")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":5,layout:"prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(a){e.currentPage=a},"update:current-page":function(a){e.currentPage=a}}})],1)],1)],1)},l=[],r=t("2f3b"),o={data(){return{personList:[],ChinaName:"",userName:"",password:"",chinaname:"",eMail:"",loading:!1,currentPage:0,total:200,jobs:[{value:"FrontEnd",label:"[研发]-前端"},{value:"BackEnd",label:"[研发]-后端"},{value:"Anchor",label:"[技术]-导播"},{value:"BOSS",label:"[管理]-主办方"},{value:"Arranger",label:"[管理]-排班人"},{value:"Secretary",label:"[管理]-秘书"},{value:"Recruiter",label:"[管理]-招募"},{value:"Designer",label:"[宣发]-海报"},{value:"Video",label:"[宣发]-视频剪辑"},{value:"Public",label:"[言论]-公关"},{value:"Administration",label:"[言论]-群管"},{value:"Commentator",label:"[技术]-解说"},{value:"referees",label:"[技术]-裁判"},{value:"none",label:"无职位"}],job:"",adminPassword:"",logoImg:"",searchValue:""}},mounted(){this.initGetUsers(1,5)},methods:{initGetUsers(e,a){this.loading=!0,Object(r["e"])(e,a).then(e=>{console.log(e.data),this.personList=e.data,setTimeout(()=>{this.loading=!1},800)}).catch(e=>{console.log(e),setTimeout(()=>{this.loading=!1},800)})},updateName(){Object(r["i"])(this.ChinaName).then(()=>{this.$message.success("修改成功！"),this.initGetInfo()}).catch(e=>{this.$message.error(e.data)})},beAdmin(){Object(r["b"])(this.userName,this.password,this.ChinaName,this.eMail).then(()=>{this.$message.success("成功！"),this.initGetUsers(1,5)}).catch(e=>{this.$message.error("失败"+e)})},handleSetAdmin(e){Object(r["g"])(e).then(()=>{this.$message.success("设置成功！"),this.initGetUsers(this.currentPage,5)}).catch(()=>{this.$message.error("设置失败，请联系超级管理员！")})},handleDelUser(e){console.log(e),Object(r["a"])(e).then(()=>{this.$message.success("删除成功！"),this.initGetUsers(this.currentPage,5)}).catch(()=>{this.$message.error("删除失败，请联系超级管理员！")})},handleCurrentChange(e){this.initGetUsers(e,5)},formatBoolean(e,a,t){var s="";return s=t?"管理用户的增删改查":"无权限",s},formatRoles(e,a,t){var s="";switch(t){case"FrontEnd":s="[研发]-前端";break;case"BackEnd":s="[研发]-后端";break;case"Anchor":s="[技术]-导播";break;case"BOSS":s="[管理]-主办方";break;case"Arranger":s="[管理]-排班人";break;case"Secretary":s="[管理]-秘书";break;case"Recruiter":s="[管理]-招募";break;case"Designer":s="[宣发]-海报";break;case"Video":s="[宣发]-视频剪辑";break;case"Public":s="[言论]-公关";break;case"Administration":s="[言论]-群管";break;case"Commentator":s="[技术]-解说";break;case"referees":s="[技术]-裁判";break;default:s="无职位"}return s},dealRoles(e,a,t){let s="";return s=t.includes("nbadmin")?"超级管理员":t.includes("admin")?"管理员":"普通用户",s},setRoles(e){Object(r["h"])(e,this.job).then(()=>{this.$message.success("设置成功！"),this.initGetUsers(this.currentPage,5)}).catch(e=>{this.$message.error(e)})},beSuperAdmin(){console.log(this.adminPassword),Object(r["d"])(this.adminPassword).then(()=>{this.$message.success("设置成功！")}).catch(e=>{this.$message.error(e)})},transformBase(e){const a=new FileReader;a.readAsDataURL(e.raw);const t=this;a.onload=function(){t.logoImg=a.result,t.$store.commit("SET_LOGO",t.logoImg),t.uploadImg(t.logoImg)}},uploadImg(e){Object(r["j"])(e).then(e=>{console.log(e.data)}).catch(e=>{console.log(e)})},beforeAvatarUpload(e){const a=e.size/1024/1024<2;return console.log(a),a||this.$message.error("上传头像图片大小不能超过 2MB!"),a},searchByName(){this.loading=!0,Object(r["f"])(this.searchValue).then(e=>{e.data!==[]?this.personList=e.data:this.$message.error("未搜索到该用户！"),setTimeout(()=>{this.loading=!1},500)}).catch(e=>{console.log(e),setTimeout(()=>{this.loading=!1},500)})}},computed:{userInfo(){return this.$store.state.userInfo}}},n=o,i=(t("fd12"),t("2877")),c=Object(i["a"])(n,s,l,!1,null,"bf62338c",null);a["default"]=c.exports},fd12:function(e,a,t){"use strict";t("050d")}}]);
//# sourceMappingURL=chunk-395d11d8.4a0e9659.js.map