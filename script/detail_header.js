var n = localStorage.getItem('user');
if(!n){
    n = [0,'sid'];
}
else{
    n = n.split(',');

}

$.ajax({
    type: 'get',
    url: '../json/details.json',
    dataType: 'json',
    success: function (json) {
        var newcon_left = '';
        var newhover = '';
        var news = '';

        $.each(json,function(k,v){
            // console.log(v.src);
            if (window.location.search === "?"+k){
                // newcon_left = `
                // <div class="artwork">
                //     <img src="${v.src[0]}"></img>
                //     <div class="mask"></div>
                // ` ;
                $('.artwork').find('img').attr('src',v.src[0]);
                $('.magnify').find('img').attr('src',v.srcmax[0]);
                // newhover += `
                //  <li class="hover"><img src="${v.srcmin[0]}" alt=""></li>
                //  <li class="hover"><img src="${v.srcmin[1]}" alt=""></li>
                //  <li class="hover"><img src="${v.srcmin[2]}" alt=""></li>
                //  <li class="hover"><img src="${v.srcmin[3]}" alt=""></li>
                //  <li class="hover"><img src="${v.srcmin[4]}" alt=""></li>
                // `;
                for(let i in v.srcmin){
                    $('.hover').find('img')[i].src = v.srcmin[i];
                }
                var newa = `
        <h3 class="con_title">${v.title}</h3>
                <p class="trait">${v.trait}</p>
                <img class="tmdq" src="../image/detail/tmdq.png" alt="">
                <div class="price">
                    <li><label for="">价格</label><del>${v.price1}</del></li>
                    <li><label for="">促销价</label><i>${v.price2}</i><img
                        class="cx" src="../image/detail/cx.png" alt=""></li>
                    <li><label for="">本店活动</label><em>${v.activity}</em><a>更多优惠<img src="../image/detail/xia.png" alt=""></a></li>
                </div>
                <div class="freight">
                    <li><label for="">运费</label><p>上海 至深圳<img src="../image/detail/xia.png" alt="">罗湖区<img src="../image/detail/xia.png" alt="">快递费：0.00</p></li>
                    <li>
                        <em>月销量<i>2342</i></em><span>|</span>
                        <em>累计评价<i>14678</i></em><span>|</span>
                        <em>送天猫积分<u>469</u></em>

                    </li>
                </div>
                <ul class="type">
                    <li>
                        <label for="">内存容量</label>
                        <div class="active">8GB</div>
                    </li>
                    <li>
                        <label for="">硬盘容量</label>
                        <div class="active">512G固态硬盘</div>
                    </li>
                    <li>
                        <label for="">颜色分类</label>
                        <div class="active"><img src="../image/detail/wmin.jpg" alt=""></div>
                        <div><img src="../image/detail/bmin.jpg" alt=""></div>
                    </li>
                    <li>
                        <label for="">套餐类型</label>
                        <h1>
                            <div class="active">官方标配</div>
                            <div>定制A:12G内存（本店加装）新店</div>
                            <div>定制B:32G傲腾（本店加装）</div>
                            <div>定制C:32G傲腾（本店加装）</div>
                            <div>官方标配+特惠套餐</div>
                            <div>定制A:12G内存（本店加装新品）+特惠套餐</div>
                        </h1>
                    </li>
                </ul>
                <div class="btn">
                    <button class="buy">立即购买</button>
                    <button sid="${v.id}" class="car">加入购物车</button>
                </div>
        `;
                $('.con_center').append(newa);
                $('.type').on('click', 'div', function () {
                    $(this).addClass('active');
                    $(this).siblings('.active').removeClass('active');
                });
                $('.con_center').on('click','.car',function(){
                    var _this = this;
                        var len = localStorage.length;
                        var p = true;
                        var a = '';
                        var arr = '';
                    if (!localStorage.getItem(n[1])){
                             a = [{'cid':$(_this).attr('sid'),"num":1}];
                           var  b= JSON.stringify(a);
                            localStorage.setItem(n[1], b);
                        }else{
                         arr = JSON.parse(localStorage.getItem(n[1]));
                        $.each(arr,function(i,v){
                               if (v.cid == $(_this).attr('sid')){
                                p =false;
                                v.num = ++v.num;
                               };
                               var c = JSON.stringify(arr);
                            localStorage.setItem(n[1], c);
                           });
                           if(p){
                               arr.push({ 'cid': $(_this).attr('sid'), "num": 1 });
                            var d = JSON.stringify(arr);
                               localStorage.setItem(n[1], d);
                           };
                        };
                       location.reload();

                });



                //放大镜
                (function () {
                    function Ms(option) {
                        this.init(option);
                    };
                    Ms.prototype.init = function (option) {
                        var _this = this;
                        //获取节点
                        this.left = document.querySelector(option.left);
                        this.mask = document.querySelector(option.mask);
                        this.right = document.querySelector(option.right);
                        this.move_img = document.querySelector(option.move_img);
                        this.img = new Image;
                        // this.img = getComputedStyle(this.right, null).backgroundImage
                        //
                        this.img.src = option.src;
                        //移入移出
                        this.left_enter();
                        this.move_leave();

                    };

                    //移入事件
                    Ms.prototype.left_enter = function () {
                        var _this = this;
                        this.left.onmouseenter = function (e) {
                            _this.pro_change(_this.mask, 'display', 'block');
                            _this.pro_change(_this.right, 'display', 'block');
                            //蒙版定位
                            _this.mask_move();

                        }
                    };

                    //蒙版位置定位
                    Ms.prototype.mask_move = function () {
                        var _this = this;
                        this.left.onmousemove = function (e) {
                            e = e || event;
                            // console.log(0)
                            _this.x = e.pageX - _this.parent(_this.left, true).left - _this.mask.clientWidth / 2;
                            _this.y = e.pageY - _this.parent(_this.left, true).top - _this.mask.clientHeight / 2;
                            //边界判定
                            _this.decide();
                            //蒙版位置
                            _this.pro_change(_this.mask, 'left', _this.x + 'px');
                            _this.pro_change(_this.mask, 'top', _this.y + 'px');
                            //放大效果
                            _this.pos_move();

                        }
                    };
                    //显示部分移动
                    Ms.prototype.pos_move = function () {
                        this.mox = this.x / (this.left.offsetWidth - this.mask.offsetWidth) * (this.img.width - this.right.clientWidth);
                        this.moy = this.y / (this.left.offsetHeight - this.mask.offsetHeight) * (this.img.height - this.right.clientHeight);
                        // this.pro_change(this.move_img, 'Position', -this.mox + 'px' + ' ' + -this.moy + 'px');
                        this.move_img.style.left = -this.mox + 'px';
                        this.move_img.style.top = -this.moy + 'px';
                    }
                    Ms.prototype.pro_change = function (dom, property, value) {
                        dom.style[property] = value;
                    };
                    //边框判定
                    Ms.prototype.decide = function () {
                        if (this.x <= 0) {
                            this.x = 0;
                        }
                        if (this.x >= this.left.clientWidth - this.mask.clientWidth) {
                            this.x = this.left.clientWidth - this.mask.clientWidth
                        }
                        if (this.y <= 0) {
                            this.y = 0;
                        }
                        if (this.y >= this.left.clientHeight - this.mask.clientHeight) {
                            this.y = this.left.clientHeight - this.mask.clientHeight
                        }
                    };
                    //找到屏幕的距离
                    Ms.prototype.parent = function (dom, bool) {
                        var x = 0, y = 0;
                        var l = dom.clientLeft;
                        var t = dom.clientTop;
                        do {
                            x += dom.offsetLeft + dom.clientLeft;;
                            y += dom.offsetTop + dom.clientTop;
                            dom = dom.offsetParent
                        } while (dom)
                        if (bool) {
                            // console.log(x, y);
                            return { 'left': x, 'top': y }
                        }
                        else {
                            return { 'left': x - l, 'top': y - t }
                        };
                    };
                    //移出
                    Ms.prototype.move_leave = function () {
                        var _this = this
                        this.left.onmouseleave = function () {
                            _this.pro_change(_this.mask, 'display', 'none');
                            _this.pro_change(_this.right, 'display', 'none');
                        };
                    };
                    function fac(option) {
                        return new Ms(option)
                    };
                    window.ms = fac;
                })();

                var min = document.querySelector('.min');
                var ac = document.querySelectorAll('.hover');
                var artwork_img = document.querySelector('.artwork img');
                var magnify_img = document.querySelector('.magnify img');
                $(min).on('click', 'li', function () {
                    var sr = $(this).find('img').attr('src');
                    sr = sr.slice(0, 18);
                    if (this.className == 'hover') {
                        for (var i = 0; i < ac.length; i++) {
                            ac[i].index = i + 1;
                            ac[i].className = 'hover';
                        };
                        this.className += ' ' + 'active';
                        artwork_img.src = sr +'.jpg';
                        magnify_img.src = sr +'max.jpg';
                    }
                });
                ms({
                    'left': '.artwork',
                    'mask': '.mask',
                    'right': '.magnify',
                    'move_img': '.magnify img',
                    'src': '../image/detail/a2max.jpg'
                });
                $('.video').on('click', function () {
                    // console.log(1);
                    $('video').css('display', 'block');
                    $('.close').css('display', 'block');
                    $('video')[0].play()
                });
                $('.close').on('click', function () {
                    $('video').css('display', 'none');
                    $('.close').css('display', 'none');
                    $('video')[0].currentTime = 0
                    $('video')[0].pause();
                });
                var len = v.banner.length / 5;
                var j = 0;
                for(var i = 0 ;i<len; i++){
                    news += `<div class="swiper-slide">
                            <a href=""><img src="${v.banner[j]}" alt=""></a>
                            <a href=""><img src="${v.banner[++j]}" alt=""></a>
                            <a href=""><img src="${v.banner[++j]}" alt=""></a>
                            <a href=""><img src="${v.banner[++j]}" alt=""></a>
                            <a href=""><img src="${v.banner[++j]}" alt=""></a>
                        </div>
                `;
                j++;
                };
                $('.swiper-wrapper').append(news);
                var mySwiper = new Swiper('.swiper-container', {
                    direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项
                    autoplay: true,



                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }); 
            };

        });
      
    },
    error:function(){
        alert('错误');
    }
});