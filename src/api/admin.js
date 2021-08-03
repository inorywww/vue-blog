import request from "./request";
import { setToken, getToken } from "@/utils/auth";
export function login(data){
    return request({
        url: '/admin/login',
        method: 'post',
        data
    }).then((res) =>{
        setToken(res.data.token);
    })
}

export function getHome(){
    return request({
        url:'/home',
        method:'get',
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
export function uploadFile(data){
    return request({
        url:'/article/upload',
        method:'post',
        headers:{
            Authorization:getToken(),
            'Content-Type': 'multipart/form-data' 
        },
        data,
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

export function addSay(data){
    return request({
        url:`/say/add`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function editSay(sayID,data){
    return request({
        url:`/say/edit/${sayID}`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function delSay(sayID){
    return request({
        url:`/say/delete/${sayID}`,
        method:'delete',
        headers:{
            Authorization:getToken()
        },
    })
}


export function editMessage(id,data){
    return request({
        url:`/message/edit/${id}`,
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data,
    })
}

export function delMessage(id){
    return request({
        url:`/message/delete/${id}`,
        method:'delete',
        headers:{
            Authorization:getToken()
        },
    })
}

export function getCourse(){
    return request({
        url:'/course',
        method:'get',
        headers:{
            Authorization:getToken()
        },
    })
}

export function addCourse(data){
    return request({
        url:'/course/add',
        method:'post',
        headers:{
            Authorization:getToken()
        },
        data
    })
}