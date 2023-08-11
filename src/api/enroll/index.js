import request from '../../utils/request'
export function searchInfo(data){
    return request.get(`/api/v1/admin/form/${data}`)
}
//报名列表
export function getEnrollList(page,pagesize,sort,eventsname){
    return request({
        url:`/api/v1/form/all?page=${page}&page_long=${pagesize}&sort=${sort}&eventsname=${eventsname}`,
        method:'get',
    })
}
//删除列表
export function delEnrollTeam(formname){
    return request.delete(`/api/v1/admin/form?formname=${formname}`)
}
//获取详细信息表单
export function getDetailForm(){
    return request.get('/api/v1/user/form')
}
