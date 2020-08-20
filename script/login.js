var ts = $('.tishi');
var tsi = $('.tishi').find('i');

$('.er').on('click',function(){
    if ($(".er").attr('src') === "../image/login/er.png"){
        $('.er')[0].src = "../image/login/dn.png" ;
        $('.sm').css('display','none');
        $('.box').css('display','none');
        $('.box2').css('display','block');
        $('.box3').css('display','none');
        ts.css('display','none');
    }else{
        $('.er')[0].src = "../image/login/er.png";
        $('.sm').css('display', 'block');
        $('.box').css('display', 'block');
        $('.box2').css('display', 'none');
        $('.box3').css('display', 'none');
        ts.css('display', 'none');



    }
});
$('.box').on('click','span',function(){
    $(this).addClass('active');
    $(this).siblings('.active').removeClass('active')
});
$('.f').on('blur','.user',function(){
    var reg1 = /\d{8}/;
        if (reg1.test($(this).val())) {
            ts.css('display', 'none');

        } else {
            ts.css('display', 'block');
            tsi.text('请输入8位纯数字！');
        }
});

$('.f').on('blur', '.pas', function () {
   
    var reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

    if (reg2.test($(this).val())) {
        ts.css('display', 'none');
    } else {
        ts.css('display', 'block');
        tsi.text('大小写与其他字符组成8 - 16位的密码');
    }
});
$('.zc').on('click',function(){
    $('.box').css('display','none');
    $('.box3').css('display','block');

    ts.css('display', 'none');


});
//注册
$('.btnc').on('click',function(){
    // $('.box3').css('display', 'none');
    if (ts.css('display') == 'block'){
        return
    }
    $.ajax({
        url: '../json/user.php',
        type: 'get',
        data: {
            type: 'add',
            user: $('.zcid').val(),
            pass: $('.zcpas').val()
        },
        dataType: 'json',
        success: function (data) {
            alert(data.msg);
            if(data.err == 3){
                $('.box').css('display', 'block');
                $('.box3').css('display', 'none');
            }
           

        },
        error: function (status) {
            alert('提交失败');
        }
    });
});
//登录
$('.btn').on('click', function () {
    // $('.box3').css('display', 'none');

    if (!$('.logid').val() || !$('.logpas').val()) {
        alert('帐号晦密码不能为空！');
        return false;
    };
    $.ajax({
        url: '../json/user.php',
        type: 'get',
        data: {
            type: 'login',
            user: $('.logid').val(),
            pass: $('.logpas').val()
        },
        dataType: 'json',
        success: function (data) {
            if (!localStorage.getItem('user')){
                alert(data.msg);
                if (data.err == -1) {
                    return;
                }     
                localStorage.setItem('user', [1, $('.logid').val(), $('.logpas').val()]);
                window.open('../pages/index.html?' + $('.logid').val());

            }else{
                if (localStorage.getItem('user').split(',')[1] == $('.logid').val()) {
                    alert('请勿重复登录！')
                }else{
                    alert('您当前已存在登录账户，即将为您跳转到主页面!');
                    window.open('../pages/index.html?' + $('.logid').val());
                }
                window.open('../pages/index.html?' + $('.logid').val());

            }
            if (data.err == -1) {
                alert(data.msg);
                return;
            };     

        },
        error: function (status) {
            alert('提交失败');
        }
    });


});


