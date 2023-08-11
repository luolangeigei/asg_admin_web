import request from '@/utils/request'
//获取所有比赛
export function getAllEvents(){
    return request({
        url:'/api/v1/Events',
        method:'get'
    })
}
//发布新赛事
export function pushNewEvents(name,is_over,opentime){
    return request({
        url:'/api/v1/admin/Events',
        method:'post',
        params:{
          name,
          is_over,
          opentime
        }
    })
}