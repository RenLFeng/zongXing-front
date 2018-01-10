import './index.scss';

export function startAnimate() {
  initPage();
  bindEvent();
}

function initPage() {
    var swiper = new Swiper('.tab3con1 .swiper-container', {
        autoplay: 5000,
        speed: 1000,
        loop: true,
        pagination: '.tab3con1 .swiper-pagination',
        paginationClickable: true
    });
    $('.cal .len').eq(0).css('width', function(){
        return ($(this).data('value')-0)*8.3+'%';
    });
    $('.cal .len').eq(1).css('width', function(){
        return ($(this).data('value')-7)*10.25+'%';
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
