//放大镜
(function () {
    function Ms(option) {
        this.init(option);
    }
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

    }

    //移入事件
    Ms.prototype.left_enter = function () {
        var _this = this;
        this.left.onmouseenter = function (e) {
            _this.pro_change(_this.mask, 'display', 'block');
            _this.pro_change(_this.right, 'display', 'block');
            //蒙版定位
            _this.mask_move();

        }
    }

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
    }
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
    }
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
    }
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
        }
    }
    //移出
    Ms.prototype.move_leave = function () {
        var _this = this
        this.left.onmouseleave = function () {
            _this.pro_change(_this.mask, 'display', 'none');
            _this.pro_change(_this.right, 'display', 'none');
        }
    }
    function fac(option) {
        return new Ms(option)
    }
    window.ms = fac;
})()

var min = document.querySelector('.min');
var ac = document.querySelectorAll('.hover');
var artwork_img = document.querySelector('.artwork img');
var magnify_img = document.querySelector('.magnify img'); 
$(min).on('click', 'li', function () {

    if (this.className == 'hover') {
        for (var i = 0; i < ac.length; i++) {
            ac[i].index = i + 1;
            ac[i].className = 'hover';
        }
        this.className += ' ' + 'active';
        artwork_img.src = '../image/detail/a' + this.index + '.jpg';
        magnify_img.src = '../image/detail/a' + this.index + 'max.jpg';
    }
});
ms({
    'left': '.artwork',
    'mask': '.mask',
    'right': '.magnify',
    'move_img': '.magnify img',
    'src': '../image/detail/a2max.jpg'
})
$('.video').on('click',function(){
    // console.log(1);
    $('video').css('display','block');
    $('.close').css('display', 'block');
    $('video')[0].play()
})
$('.close').on('click', function () {
    $('video').css('display', 'none');
    $('.close').css('display', 'none');
    $('video')[0].currentTime = 0
    $('video')[0].pause();
})