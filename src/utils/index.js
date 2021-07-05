import { Message } from 'element-ui';
import store from '@/store'
let lastPosition = 0; //上一时刻滚动条的位置
let nowPosition = 0; //下一时刻滚动条的位置
export function handleScroll() { //动态添加滚动样式，使用的话给对应的标签加上.fadeInUp 然后调用这个方法即可
    const items = document.querySelectorAll('.fadeInUp'); //先给当前页面显示的元素添加样式
    for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect(); //当前元素离浏览器的边距
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) { //下滚
            items[i].classList.add('animate__animated', 'animate__fadeInUp');
        }
    }
    window.addEventListener('scroll', () => { //当鼠标往下滚动时，给没有添加到的添加样式
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
        type: type,
    });
}

export function startLoading() {
    console.log('start');
    store.state.isLoading = true;
}
export function stopLoading() {
    console.log('stop');
    store.state.isLoading = false;
}