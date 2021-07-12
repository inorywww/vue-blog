import { Message } from 'element-ui';
import moment from "moment";
import store from '@/store'
import{sendMessage} from '@/api';

let lastPosition = 0; //上一时刻滚动条的位置
let nowPosition = 0; //下一时刻滚动条的位置

export function getYearMouth(date) {
    return moment(date).format('YYYY-MM');
}
export function getMouth(data){
    return moment(data).format('MM');
}
export function getYear(date) {
    return moment(date).format('YYYY');
}
export function handleScroll() { //动态添加滚动样式，使用的话给对应的标签加上.fadeInUp 然后调用这个方法即可
    const items = document.querySelectorAll('.fadeInUp'); //先给当前页面显示的元素添加样式
    for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect(); //当前元素离浏览器的边距
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) { //下滚
            items[i].classList.add('animate__animated', 'animate__fadeInUp');
        }
    }
    
    window.scroll1 =  window.addEventListener('scroll', () => { //当鼠标往下滚动时，给没有添加到的添加样式
        lastPosition = window.scrollY;
        for (let i = 0; i < items.length; i++) {
            const rect = items[i].getBoundingClientRect(); //当前元素离浏览器的边距
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            if (nowPosition < lastPosition && !(rect.bottom < 0 || rect.top - viewHeight >= 0) &&
                !items[i].classList.contains('animate__fadeInUp')) { //下滚
                items[i].classList.add('animate__animated', 'animate__fadeInUp');
            }
        }
        setTimeout(() => {
            nowPosition = lastPosition;
        }, 80);
    });
}

export function isEmail(val) {
    const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    const domains = [
        'qq.com',
        '163.com',
        'vip.163.com',
        '263.net',
        'yeah.net',
        'sohu.com',
        'sina.cn',
        'sina.com',
        'eyou.com',
        'gmail.com',
        'hotmail.com',
        '42du.cn'
    ]
    if (pattern.test(val)) {
        let domain = val.substring(val.indexOf('@') + 1)
        for (let i = 0; i < domains.length; i++) {
            if (domain === domains[i]) {
                return true
            }
        }
    }
    return false
}

export function alertInfo(message, type) {
    Message({
        showClose: true,
        message,
        type,
    });
}
//根据数组里面对象的某个属性排序
export function compare(property,type) {
    return (obj1, obj2) => {
        const value1 = obj1[property];
        const value2 = obj2[property];
        if(type === 'ascending'){
            return value1 - value2; // 升序
        }
        else{
            return value2 - value1;
        }
    };
}
export function checkInput(markdownForm){
    for (const key in markdownForm) {
        const val = markdownForm[key];
        switch (key) {
            case "username":
                if (val.trim() === "") {
                    //判断昵称是否为空
                    alertInfo("昵称不能为空哦~", "error");
                    return false;
                }
                continue;
            case "email":
                if (!isEmail(val)) {
                    //判断邮箱是否符合格式
                    alertInfo("邮箱格式有误哦~", "error");
                    return false;
                }
                continue;
            case "content":
                if (val.trim() === "") {
                    //判断内容是否符合形式
                    alertInfo("内容不能为空哦~", "error");
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

export function sendSays(markdownForm){
        // 判断输入是否正确
    if(markdownForm.content.trim() === ''){
        alertInfo("内容不能为空哦~", "error");
        return;
    }
    markdownForm['time'] = new Date().getTime();
    const sendInfo = {
        type:'saysMessage',
        info:markdownForm,
    }
    sendMessage(sendInfo)
        .then((res) => {
            if (res.status == 201) {
                alertInfo("发送成功~", "success");
                return 'success'
            }
        })
        .catch(() => {
            alertInfo("发送失败，服务器错误≧ ﹏ ≦", "error");
            return 'error'
        });
}
export function startLoading() {
    // console.log('start');
    store.state.isLoading = true;
}
export function stopLoading() {
    // console.log('stop');
    store.state.isLoading = false;
}