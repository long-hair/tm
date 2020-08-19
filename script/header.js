var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    loop: true, // 循环模式选项
    effect: 'fade',

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },


})
//鼠标滑过pagination控制swiper切换
for (var i = 0; i < mySwiper.pagination.bullets.length; i++) {
    mySwiper.pagination.bullets[i].onmouseover = function () {
        this.click();
    };
}
