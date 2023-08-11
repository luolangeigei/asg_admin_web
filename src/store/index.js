//引入Vuex和Vue
import Vuex from "vuex";
import Vue from "vue";
import { getToken, setToken, removeToken } from "../utils/auth";
// 使用Vuex
Vue.use(Vuex);
//准备actions——用于相应组件中的动作
const actions = {
  
};
//准备mutations——用于操作数据state
const mutations = {
  setToken(state, token) {
    //第一次拿到token写
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  //修改菜单展开收起的方法
  collapseMenu(state){
    state.isCollapse = !state.isCollapse
  },
  //存储用户数据
  getUserInfo(state, info){
    state.userInfo = info
  },
  //修改查询队伍详细信息的name
  updateTeamName(state, team_name){
    state.team_name = team_name
  },
  SET_LOGO(state,value){
    state.userInfo.base64 = value
  }
};
//准备state——用于存储数据
const state = {
  token: getToken(),
  isCollapse:false, //控制菜单的展开还是收起
  userInfo:{},
  team_name:'',
  team1_name:'',
  team2_name:''
};

//创建store并暴露
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
