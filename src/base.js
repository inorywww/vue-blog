exports.install = function (Vue) {
    let lastPosition = 0;//上一时刻滚动条的位置
    let nowPosition = 0;//下一时刻滚动条的位置
    Vue.prototype.handleScroll = () => {
        window.addEventListener('scroll', ()=>{
            lastPosition = window.scrollY;
            let items = document.querySelectorAll('.fadeInUp');
            console.log(items);
            for (let i = 0; i < items.length; i++) {
                let rect = items[i].getBoundingClientRect();//当前元素离浏览器的边距
                if (nowPosition < lastPosition && rect.top - document.documentElement.clientHeight < 20
                    && !items[i].classList.contains('animate__fadeInUp')) {//下滚
                    items[i].classList.add('animate__animated','animate__fadeInUp');
                }
            }
            setTimeout(() => {
                nowPosition = lastPosition;
            }, 80);
        });
    }
};
