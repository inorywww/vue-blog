import request from "./request";

export async function getAllArticle() {
    return request({
        url: 'articleItems',
        method: 'get',
    })
}
export function getAllTags() {
    return request({
        url: 'tags',
        method: 'get',
    })
}
export function getAllSays() {
    return request({
        url: 'says',
        method: 'get',
    })
}

export function sendMessage(data) {
    return request({
        url: 'messages',
        method: 'post',
        data,
    })
}