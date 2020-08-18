$('.er').on('click',function(){
    if ($(".er").attr('src') === "../image/login/er.png"){
        $('.er')[0].src = "../image/login/dn.png" ;
        $('.sm').css('display','none');
        $('.box').css('display','none');
        $('.box2').css('display','block');
        $('.box3').css('display','none');
    }else{
        $('.er')[0].src = "../image/login/er.png";
        $('.sm').css('display', 'block');
        $('.box').css('display', 'block');
        $('.box2').css('display', 'none');
        $('.box3').css('display', 'none');


    }
});
$('.box').on('click','span',function(){
    console.log(this);
    console.log($(this).siblings('active'));
    $(this).addClass('active');
    $(this).siblings('.active').removeClass('active')
})
$('.f').on('blur','.user',function(){
    var reg1 = /\d{8}/;
    
        if (reg1.test($('.user').val())) {
            console.log(1);
        } else {
            console.log(2);
        }
})

$('.f').on('blur', '.pas', function () {
   
    var reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

    if (reg2.test($('.pas').val())) {
        console.log(1);
    } else {
        console.log(2);
    }
})
$('.zc').on('click',function(){
    $('.box').css('display','none');
    $('.box3').css('display','block');
})
//注册
$('.btnc').on('click',function(){
    // $('.box3').css('display', 'none');

    if(!$('.zcid').val()||!$('.zcpas').val()){
        alert('帐号晦密码不能为空！');
        return false;
    };
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
            $('.box').css('display', 'block');
            $('.box3').css('display', 'none');

        },
        error: function (status) {
            alert('提交失败');
        }
    })
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
            alert(data.msg);
            localStorage.setItem('user', [1, $('.logid').val(), $('.logpas').val()]);
            if(data.err == -1){
                return;
            }
            window.open('../pages/index.html?'+$('.logid').val());
           

        },
        error: function (status) {
            alert('提交失败');
        }
    })


})


