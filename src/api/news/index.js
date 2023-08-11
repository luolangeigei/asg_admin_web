import request from '../../utils/request'
// 发布公告
export function pushNews(title,msg){
    return request.post('/api/v1/admin/news',{
        title,
        msg
    })
}
//获取公告
export function getNews(){
    return request.get('/api/v1/news')
}
//删除公告
export function delNews(id){
    return request.delete(`/api/v1/admin/news?newid=${id}`)
}