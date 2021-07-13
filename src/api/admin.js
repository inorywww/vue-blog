import request from "./request";
import { setToken, getToken } from "@/utils/auth";
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

export function editArticle(articleID,data){
    return request({
        url:`/article/edit/${articleID}`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data
    })
}

export function delArticle(articleID){
    return request({
        url:`/article/delete/${articleID}`,
        method:'delete',
        headers:{
            Authorization:getToken()
        }
    })
}

export function releaseArticle(data){
    return request({
        url:'/article/add',
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function addTag(data){
    return request({
        url:`/tag/add`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function editTag(data,tagID){
    return request({
        url:`/tag/edit/${tagID}`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function delTag(tagID){
    return request({
        url:`/tag/delete/${tagID}`,
        method:'delete',
        headers:{
            Authorization:getToken()
        },
    })
}

