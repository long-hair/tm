$('.er').on('click',function(){
    if ($(".er").attr('src') === "../image/login/er.png"){
        $('.er')[0].src = "../image/login/dn.png" ;
        $('.sm').css('display','none');
    }else{
        $('.er')[0].src = "../image/login/er.png";
        $('.sm').css('display', 'block');
    }
})