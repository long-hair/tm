"use strict";$(".er").on("click",function(){"../image/login/er.png"===$(".er").attr("src")?($(".er")[0].src="../image/login/dn.png",$(".sm").css("display","none"),$(".box").css("display","none"),$(".box2").css("display","block")):($(".er")[0].src="../image/login/er.png",$(".sm").css("display","block"),$(".box").css("display","block"),$(".box2").css("display","none")),$(".box3").css("display","none")}),$(".box").on("click","span",function(){$(this).addClass("active"),$(this).siblings(".active").removeClass("active")}),$(".f").on("blur",".user",function(){/\d{8}/.test($(".user").val())?console.log(1):console.log(2)}),$(".f").on("blur",".pas",function(){/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test($(".pas").val())?console.log(1):console.log(2)}),$(".zc").on("click",function(){$(".box").css("display","none"),$(".box3").css("display","block")}),$(".btnc").on("click",function(){return $(".zcid").val()&&$(".zcpas").val()?void $.ajax({url:"../json/user.php",type:"get",data:{type:"add",user:$(".zcid").val(),pass:$(".zcpas").val()},dataType:"json",success:function(s){alert(s.msg),$(".box").css("display","block"),$(".box3").css("display","none")},error:function(){alert("提交失败")}}):(alert("帐号晦密码不能为空！"),!1)}),$(".btn").on("click",function(){return $(".logid").val()&&$(".logpas").val()?void $.ajax({url:"../json/user.php",type:"get",data:{type:"login",user:$(".logid").val(),pass:$(".logpas").val()},dataType:"json",success:function(s){localStorage.getItem("user")?(localStorage.getItem("user").split(",")[1]==$(".logid").val()?alert("请勿重复登录！"):(alert("您当前已存在登录账户，即将为您跳转到主页面!"),window.open("../pages/index.html?"+$(".logid").val())),console.log(1)):(localStorage.setItem("user",[1,$(".logid").val(),$(".logpas").val()]),alert(s.msg)),-1!=s.err||alert(s.msg)},error:function(){alert("提交失败")}}):(alert("帐号晦密码不能为空！"),!1)});