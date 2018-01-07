import './index.scss';

$(function () {
    initPage();
    bindEvent();
});

function initPage() {
    var swiper = new Swiper('.tab3con1 .swiper-container', {
        autoplay: 5000,
        speed: 1000,
        loop: true,
        pagination: '.tab3con1 .swiper-pagination',
        paginationClickable: true
    });
}

function bindEvent() {
    $('body').on('click', '.tabs>.w>a', function(){
        let d = $('.section')[$(this).index()];
        av.top(d.offsetTop);
    });
    $('body').on('click', '.sec-qa .q', function(){
        $(this).toggleClass('close');
    });
}