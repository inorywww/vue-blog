import request from "./request";
import { setToken } from "@/utils/auth";
// import jwt_decode from 'jwt-decode';
export function login(data){
    return request({
        url: '/admin/login',
        method: 'post',
        data
    }).then((res) =>{
        setToken(res.data.token);
        // const decoded = jwt_decode(res.data.token);
    })
}