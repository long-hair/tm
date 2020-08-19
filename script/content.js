let timer;
let index=0;
function time(){
    timer = setInterval(() => {
        $('.check').eq(index).removeClass('active');
        $('.tab').eq(index).css('display', 'none');
        index++;
        if (index == 2) {
            index = 0;
        };
        $('.check').eq(index).addClass('active');
        $('.tab').eq(index).css('display','block');
    }, 2000);
};
time();

$('.merchandise').on('mouseenter','.check',function () {
        clearInterval(timer);
        $(this).addClass('active');
        index = $(this).index();
         $('.tab').eq(index).css('display', 'block');
    $('.tab').eq(index).siblings('div').css('display','none')

        $(this).siblings('span').removeClass('active');
});
$('.double').on('mouseout', 'span', function () {
    time();
});
$.ajax({
    url:'../json/content.json',
    type:'get',
    dataType:'json',
    success: function(json){
        let len1 = json.new_fashion.src.length;
        var newli = '';
        let newli_2 = '';

        for(let i=0;i<len1;i++){
            newli+=`
             <li>
                <a href="">
                    <img src="${json.new_fashion.src[i]}" alt="">
                    <div class="mask"></div>
                </a>
            </li>
            `;
        };

    
           let  newdiv = `
            <div class="new_left">
                <div>
                    <h3>${json.new_fashion_sec.c_title[0]}</h3><h4>${json.new_fashion_sec.e_title[0]}</h4><span><img src="../image/more.png" alt=""></span>
                </div>
                <img src="${json.new_fashion_sec.src[0]}" alt="">
                <div class="mask"></div>
            </div>
            <div class="new_center">
                <div>
                    <h3>${json.new_fashion_sec.c_title[1]}</h3><h4>${json.new_fashion_sec.e_title[1]}</h4><span>更多<img src="../image/more.png" alt=""></span>
                </div>
                <img src="${json.new_fashion_sec.src[1]}" alt="">
                <div class="mask"></div>

            </div>
            <div class="new_right">
                <div>
                    <h3>${json.new_fashion_sec.c_title[2]}</h3><h4>${json.new_fashion_sec.e_title[2]}</h4><span>更多<img src="../image/more.png" alt=""></span>
                </div>
                <img src="${json.new_fashion_sec.src[2]}" alt="">
                <div class="mask"></div>

            </div>
            `;
        let newle = ` <img src="${json.merchiandise_1.title[0]}" alt="">
            <div class="mer_list">
                <div class="max">
                    <img src="${json.merchiandise_1.max}" alt="">
                    <div class="box">
                        <div class="cs"><p href="">天猫超市</p></div>
                        <div class="inform">
                            <span>1499抢</span>
                            <span>飞天茅台</span>
                        </div>
                    </div>
                    <img class="more" src="${json.merchiandise_1.more}" alt="">
                            <div class="mask"></div>

                </div>
                <ul></ul>`;
            let newul_1 = `
                 <div class="double ">
                        <span class="check active">今日疯抢</span>
                        <span class="check">量贩装</span>
                        <div class="con tab">
                            <img src="${json.merchiandise_1.double_src[0]}" alt="">
                            <div class="tag">
                                <img src="../image/img19.png" alt="">
                                <h2>${json.merchiandise_1.double_1_text[0]}</h2>
                                <p>${json.merchiandise_1.double_1_text[1]}</p>
                            </div>
                        </div>
                        <div class="con tab">
                            <img src="${json.merchiandise_1.double_src[1]}" alt="">
                            <div class="tag">
                                <img src="../image/img19.png" alt="">
                                <h2>${json.merchiandise_1.double_2_text[0]}</h2>
                                <p>${json.merchiandise_1.double_2_text[1]}</p>
                            </div>
                        </div>
                    </div>
            `;
            let len3 = json.merchiandise_1.src.length;
            for(var i =0;i<len3;i++){
                newul_1 +=`
                 <li>
                        <a href="">
                            <img src="${json.merchiandise_1.src[i]}" alt="">
                            <p class="title">${json.merchiandise_1.text[i]}</p>
                            <span class="price">${json.merchiandise_1.price[i]}</span>
                            <div class="mask"></div>
        
                        </a>
                    </li>
                `;
            };
            let len4 = json.merchiandise_2.length;
            for(var i =0;i<len4;i++){
                newli_2 +=`
                 <li>
                                <a href="">
                                    <img src="${json.merchiandise_2[i].src}" alt="">
                                    <$ class="title">${json.merchiandise_2[i].title}</p>
                                    <span class="price">${json.merchiandise_2[i].price}</span>
                                    <div class="mask"></div>
                
                                </a>
                            </li>
                `;
            };
        $('.new_fashion').append(newli);
        $('.new_fashion_sec').append(newdiv);
        $('.merchandise').eq(0).append(newle);
        $('.merchandise').eq(0).find('ul').append(newul_1);
        $('.merchandise').eq(1).find('ul').append(newli_2);

    },
    error: function (json) {

        console.log('请求失败');
    }
});
