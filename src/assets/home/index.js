import './index.scss';
import {animate} from './animate';

export function startAnimate() {
  animate();
}


export function initPage() {
    $('.banner .swiper-slide').css('width', $(window).width());
    var swiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        speed: 1000,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}


