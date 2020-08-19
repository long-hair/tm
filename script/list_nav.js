// var id = window.location.search.slice(1);
// console.log(localStorage.getItem('user'));
if (!localStorage.getItem('user')){
    n = [0, 'sid'];
    console.log(n[1]);
}else{
    var n = localStorage.getItem('user').split(',');
    if (n[0] == 1) {
        $('.a1').text(n[1]);
        $('.a2').text('退出').attr('href', '#');
        $('.a2').on('click', function () {
            localStorage.removeItem('user');
            $('.nav_l').empty().append(`  <a href="./index.html">天猫首页</a>
            <p>喵，欢迎来到天猫</p>
            <a href="http://10.20.158.35/qianfeng/day0812/work/gulp-cli/dist/pages/login.html#">请登录</a>
            <a href="http://10.20.158.35/qianfeng/day0812/work/gulp-cli/dist/pages/login.html#">免费注册</a>`);

        });
    }
}
       
$.ajax({
    type: 'get',
    url: '../json/details.json',
    dataType: 'json',
    success: function (json) {
        var newd = '';
        var attr = localStorage.getItem(n[1]);
        attr = JSON.parse(attr);
        $.each(attr, function (i, v) {
            var j = v.cid;

            newd += `<li lid="${json[j].id}">
                    <img src="${json[j].src[0]}" alt=""><span>数量</span>
                    <div class="n">
                           <span class="jian">-</span><i class="num">${v.num}</i><span class="jia">+</span>
                        </div>
                    <span>价格</span><i class="pr">￥${Number(json[j].price2.slice(1)) * v.num}</i>
                    
                    <button class="del">删除</button></li>`;


        });
        $('.mycar').append(newd);
        var nu = $('.mycar').find('.num');
        $.each(nu, function (i, v) {
            if (Number($(v).text()) == 1) {

                $(v).siblings('.jian').css({
                    'opacity': 0.4,
                    'border': "1px solid red",
                    'cursor': "not-allowed"
                });
            };
        });
        $('.mycar').on('click', 'span', function () {
            var attr = localStorage.getItem(n[1]);
            attr = JSON.parse(attr);
            if ($(this).attr('class') == 'jia') {

               
                console.log(this);
                if (Number($(this).siblings('.num').text()) > 0) {

                    $(this).siblings('.jian').css({
                        'opacity': 1,
                        'border': "1px solid rgb(230,230,250)",
                        'cursor': "pointer"
                    });
                };

                var o = Number($(this).siblings('.num').text()) + 1;
                $(this).siblings('.num').text(o);
                var k = $(this).closest('li').attr('lid');
                $(this).parent().siblings('.pr').text('￥' + Number(json[k].price2.slice(1)) * o);
                $.each(attr, function (i, v) {
                    if (v.cid == k) {
                        v.num = o;
                    };
                });

                attr = JSON.stringify(attr);
                localStorage.setItem(n[1], attr);


            };
        });
        // $.each(nu,function())
        $('.mycar').on('click', 'span', function () {


            if ($(this).attr('class') == 'jian') {

                var o = Number($(this).siblings('.num').text()) - 1;
                if (o <= 1) {
                    o = 1;

                    var nu = $('.mycar').find('.num');
                    $.each(nu, function (i, v) {
                        if (Number($(v).text()) == 2) {

                            $(v).siblings('.jian').css({
                                'opacity': 0.4,
                                'border': "1px solid red",
                                'cursor': "not-allowed"
                            });
                        };
                    });

                }
                var attr = localStorage.getItem(n[1]);
                attr = JSON.parse(attr);

                $(this).siblings('.num').text(o);
                var k = $(this).closest('li').attr('lid');
                $(this).parent().siblings('.pr').text('￥' + Number(json[k].price2.slice(1)) * o);
                $.each(attr, function (i, v) {
                    if (v.cid == k) {
                        v.num = o;
                    };
                });

                attr = JSON.stringify(attr);

                localStorage.setItem(n[1], attr);
            };
        });
        $('.mycar').on('click', 'button', function () {
            var attr = localStorage.getItem(n[1]);
            attr = JSON.parse(attr);
            var k = $(this).closest('li').attr('lid');
            $(this).closest('li').remove();
            $.each(attr, function (i, v) {
                if (v.cid == k) {
                    attr.splice(i, 1);
                    return;
                };
            });
            attr = JSON.stringify(attr);

            localStorage.setItem(n[1], attr);

        });

    },
    error: function () {
        console.log('失败');
    }
});
