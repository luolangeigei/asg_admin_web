import { getToken } from "../../utils/auth";
import request from "../../utils/request";
//登录
export function getInfo() {
  return request.get("/api/v1/user");
}
export function getUsers(page,pagesize) {
  return request.get(`/api/v1/admin/allperson?page=${page}&page_long=${pagesize}`);
}
//修改用户中文名
export function updateChinaName(newchinaname) {
  return request.post("/api/v1/user/name", null, {
    params: {
      newchinaname,
    },
  });
}
//注册管理员
export function enrollAdmin(userName, password, chinaname, eMail) {
  return request.post("/api/v1/admin/enroll", {
    userName,
    password,
    chinaname,
    eMail,
  },{
    params:{
        captoken:getToken()
    }
  });
}
//设置管理员
export function setAdmin(userid){
   return request.post('/api/v1/admin/setadmin',null,{
    params:{
        userid
    }
   })
}
//删除用户
export function delUser(userid){
  return request.delete(`/api/v1/admin/deluser?userid=${userid}`)
}
//设置职位
export function setRole(userid,officium){
  return request.post(`/api/v1/admin/officium?userid=${userid}&officium=${officium}`)
}
//成为管理员
export function getSuperAdmin(password){
  return request.post(`/api/v1/getadmin?password=${
    password
  }`)
}
//上传头像
export function uploadImg(baseImg){
  return request({
    url:'/api/v1/setimg',
    method:'post',
    data:baseImg
  })
}
//搜索接口
export function searchName(name){
  return request.get(`/api/v1/admin/user/${name}`)
}
