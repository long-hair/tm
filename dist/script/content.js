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

$('.double').on('mouseenter','span',function () {
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