"use strict";for(var mySwiper=new Swiper(".swiper-container",{autoplay:{delay:3e3,disableOnInteraction:!1},loop:!0,effect:"fade",pagination:{el:".swiper-pagination",clickable:!0}}),i=0;i<mySwiper.pagination.bullets.length;i++)mySwiper.pagination.bullets[i].onmouseover=function(){this.click()};