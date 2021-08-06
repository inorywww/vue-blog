import request from "./request";

export function getAllArticle() {
    return request({
        url: 'article',
        method: 'get',
    })
}

export function getRecentArticle() {
    return request({
        url: 'article/recent',
        method: 'get',
    })
}

export function getOneArticle(articleID) {
    return request({
        url: `article/${articleID}`,
        method: 'get',
    })
}
export function getAllTags() {
    return request({
        url: 'tag',
        method: 'get',
    })
}
export function getAllSays() {
    return request({
        url: 'say',
        method: 'get',
    })
}

export function getMessage(){
    return request({
        url:'message',
        method:'get'
    })
}

export function getOneTypeMessage(type){
    return request({
        url:`message/${type}`,
        method:'get'
    })
}

export function sendMessage(data) {
    return request({
        url: 'message/add',
        method: 'post',
        data,
    })
}

export function getAuthorInfo(){{
    return request({
        url:'authorInfo',
        method:'get',
    })
}}

