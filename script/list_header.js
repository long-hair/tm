
if (window.location.search==="?c"){
    $.ajax({
        type: 'get',
        url: '../json/computer.json',
        dataType: 'json',
        success: function (json) {
            var newli = '';
            var newa = '';
            var newdiv = '';
            var arr1 = json.list;
            $.each(json.brand, function (index, con) {
                newli += `
            <li><a href="">${con}</a></li>
           `
            })
            $.each(json.classify, function (index, item) {
                newa += `
                    <i class='cla' >${item}</i>
            `
            })
            //渲染初始商品
            function newd(json){
                newdiv = '';
                $.each(json, function (index, item) {
                    newdiv += `
             <div nameid="${item.id}">
                <img src="${item.src}" alt="">
                <span class="price">
                    ${item.price}
                </span>
                <a href="">
                    <p>iKBC C系列</p><i>${item.classify}</i>
                </a>
                <div>
                    <a href="">ikbc旗舰店</a>
                    <a href="">等更多商家 <em>></em></a>
                </div>
                <p>该月成交 <i>${item.sell}</i></p>
                <div class="lx">
                    <img src="../image/list/lianxi.png" alt="">
                </div>

        </div>
            
            `
                })
            }
            newd(arr1);
            $('.brand_center').append(newli);
            $('.classify_left').find('label').text('>' + ' ' + json.class);
            $('.classify_right').append(newa);
            $('.con_wrap').append(newdiv);
            
            $('.classify_right').on('click','.cla',function(){
                let _this =this;
                newdiv = '';
                $.each(json.list,function(index,item){
                    if(item.classify === $(_this).text()){
                        newdiv += `
                        <div nameid="${item.id}">
                            <img src="${item.src}" alt="">
                            <span class="price">
                                ${item.price}
                            </span>
                            <a href="">
                                <p>iKBC C系列</p><i>${item.classify}</i>
                            </a>
                            <div>
                                <a href="">ikbc旗舰店</a>
                                <a href="">等更多商家 <em>></em></a>
                            </div>
                            <p>该月成交 <i>${item.sell}</i></p>
                            <div class="lx">
                                <img src="../image/list/lianxi.png" alt="">
                            </div>

                    </div>
                        
            `
                    }

                });
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);
                


                
    

            })
            $('.sizer').on('click','.price',function(){
                $('.active').removeClass('active');
                $(this).addClass('active');
                let _this = this;
                var str = JSON.stringify(json.list);
                var str = JSON.parse(str);
                let arr = str;
                let tmp;
                bubbleSort(arr);
                function bubbleSort(arr) {
                    for (var n = 0; n < arr.length - 1; n++) {//比较轮数
                        for (var i = 0; i < arr.length - (n + 1); i++) {
                            if (parseInt(arr[i].price.slice(1)) > parseInt(arr[i + 1].price.slice(1))) {//两两比较
                                // 换位
                                var tmp = arr[i];
                                arr[i] = arr[i + 1];
                                arr[i + 1] = tmp;
                            }
                        }
                    }
                    return arr;
                };
                newd(arr);
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);
                

            });
            $('.sizer').on('click', '.zh', function (){
                $('.active').removeClass('active');
                $(this).addClass('active');
                newd(arr1);
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);
                


            });
            $('.con_wrap').on('click','div[nameid]',function(){

                window.open('../pages/detail.html?'+$(this).attr('nameid'));
            })
            // $('.content_list').on('click',)

        },
        error: function () {
            console.log('错误');
        }
    });
}else{

    $.ajax({
        type: 'get',
        url: '../json/list.json',
        dataType: 'json',
        success: function (json) {
            var newli = '';
            var newa = '';
            var newdiv = '';
            var arr1 = json.list

            $.each(json.brand, function (index, con) {
                newli += `
            <li><a href="">${con}</a></li>
           `;
            });
            $.each(json.classify, function (index, item) {
                newa += `
                    <i class="cla">${item}</i>
            `;
            });
            //渲染初始商品
            function newd(json) {
                newdiv = '';
                $.each(json, function (index, item) {
                    newdiv += `
             <div nameid="${item.id}">
                <img src="${item.src}" alt="">
                <span class="price">
                    ${item.price}
                </span>
                <a href="">
                    <p>iKBC C系列</p><i>${item.classify}</i>
                </a>
                <div>
                    <a href="">ikbc旗舰店</a>
                    <a href="">等更多商家 <em>></em></a>
                </div>
                <p>该月成交 <i>${item.sell}</i></p>
                <div class="lx">
                    <img src="../image/list/lianxi.png" alt="">
                </div>

        </div>
            
            `;
                });
            };
            newd(arr1);
            $('.brand_center').append(newli);
            $('.classify_left').find('label').text('>' + ' ' + json.class);
            $('.classify_right').append(newa);
            $('.con_wrap').append(newdiv);
            $('.classify_right').on('click', '.cla', function () {
                let _this = this;
                newdiv = '';

                $.each(json.list, function (index, item) {
                    if (item.classify === $(_this).text()) {
                        newdiv += `
                        <div nameid="${item.id}">
                            <img src="${item.src}" alt="">
                            <span class="price">
                                ${item.price}
                            </span>
                            <a href="">
                                <p>iKBC C系列</p><i>${item.classify}</i>
                            </a>
                            <div>
                                <a href="">ikbc旗舰店</a>
                                <a href="">等更多商家 <em>></em></a>
                            </div>
                            <p>该月成交 <i>${item.sell}</i></p>
                            <div class="lx">
                                <img src="../image/list/lianxi.png" alt="">
                            </div>

                    </div>
            `;
                    };

                });
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);
            });
            $('.sizer').on('click', '.price', function () {
                $('.active').removeClass('active');
                $(this).addClass('active');
                let _this = this;
                var str = JSON.stringify(json.list);
                var str = JSON.parse(str);
                let arr = str;
                let tmp;
                bubbleSort(arr);
                function bubbleSort(arr) {
                    for (var n = 0; n < arr.length - 1; n++) {//比较轮数
                        for (var i = 0; i < arr.length - (n + 1); i++) {
                            if (parseInt(arr[i].price.slice(1)) > parseInt(arr[i + 1].price.slice(1))) {//两两比较
                                // 换位
                                var tmp = arr[i];
                                arr[i] = arr[i + 1];
                                arr[i + 1] = tmp;
                            };
                        };
                    };
                    return arr;
                };
                newd(arr);
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);
            });
            $('.sizer').on('click', '.zh', function () {
                $('.active').removeClass('active');
                $(this).addClass('active');
                newd(arr1);
                $('.con_wrap').empty();
                $('.con_wrap').append(newdiv);

            });
            $('.con_wrap').on('click', 'div[nameid]', function () {

                window.open('../pages/detail.html?' + $(this).attr('nameid'));
            });

        },
        error: function () {
            console.log('错误');
        }
    });

};
