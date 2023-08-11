import request from '@/utils/request'
export function pushSchedule(team1_name,team2_name,opentime,belong,commentary,referee,bilibiliuri){
    return request.post('/api/v1/admin/game',{
        team1_name,
        team2_name,
        opentime,
        belong,
        commentary,
        referee,
        bilibiliuri
    })
}
//获取赛程
export function getSchedule(page,pagesize,belong){
    return request.get(`/api/v1/game?page=${page}&page_long=${pagesize}&belong=${belong}`)
}

//删除赛程
export function delSchedule(id){
    return request.delete(`/api/v1/admin/game?gameid=${id}`)
}
//根据职位获取用户列表 opname
export function getUserRoles(params){
    return request({
        url:'/api/v1/getuserbyop',
        method:'get',
        params,
    })
}
//抽取赛程
export function ballotSchedule(){
    return request.post('/api/v1/admin/team')
}
//修改赛程信息
export function updateSchedule(gameid,info){
    return request.put(`/api/v1/admin/game?gameid=${gameid}`,info)
}
//设置获胜队伍
export function setWinGame(id,winteam){
    return request({
        url:`/api/v1/admin/game/win?teamid=${id}&winteam=${winteam}`,
        method:'post',

    })
}