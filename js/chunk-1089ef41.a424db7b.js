(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1089ef41"],{"406e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t._self._c;return e("div",[e("el-table",{attrs:{data:t.commentator,border:""}},[e("el-table-column",{attrs:{prop:"id",label:"序号",width:"180"}}),e("el-table-column",{attrs:{label:"职位",width:"180"},scopedSlots:t._u([{key:"default",fn:function(n){return[n.row.isadmin?e("span",[t._v("解说管理员")]):e("span",[t._v("ASG常驻解说"),e("i",{staticClass:"el-icon-s-check",staticStyle:{color:"gold"}})])]}}])}),e("el-table-column",{attrs:{prop:"chinaname",label:"姓名",width:"180"}}),e("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"250"}}),e("el-table-column",{attrs:{label:"操作",width:"auto"}},[e("el-button",{attrs:{type:"success"}},[t._v("升级")]),e("el-button",{attrs:{type:"warning"}},[t._v("替换")]),e("el-button",{attrs:{type:"danger"}},[t._v("劝退")])],1)],1)],1)},o=[],r=n("c0c9"),i={mounted(){this.initGetCommentary()},data(){return{commentator:[]}},methods:{initGetCommentary(){let t={opname:"Commentator"};Object(r["d"])(t).then(t=>{this.commentator=t.data,console.log(t.data)}).catch(t=>{console.log(t)})}}},u=i,c=n("2877"),l=Object(c["a"])(u,a,o,!1,null,"42867f7d",null);e["default"]=l.exports},c0c9:function(t,e,n){"use strict";n.d(e,"e",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return u})),n.d(e,"a",(function(){return c})),n.d(e,"f",(function(){return l}));var a=n("b775");function o(t,e,n,o){return a["a"].post("/api/v1/admin/game",{team1_name:t,team2_name:e,opentime:n,closetime:o})}function r(t,e){return a["a"].get(`/api/v1/game?page=${t}&page_long=${e}`)}function i(t){return a["a"].delete("/api/v1/admin/game?gameid="+t)}function u(t){return Object(a["a"])({url:"/api/v1/getuserbyop",method:"get",params:t})}function c(){return a["a"].post("/api/v1/admin/team")}function l(t,e){return a["a"].put("/api/v1/admin/game?gameid="+t,e)}}}]);
//# sourceMappingURL=chunk-1089ef41.a424db7b.js.map