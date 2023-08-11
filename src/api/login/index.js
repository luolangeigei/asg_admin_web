import request from '../../utils/request'
//登录
export function loginUser(data){
    return request.post('/api/v1/login',{
        userName:data.username,
        password:data.password
    })
}
