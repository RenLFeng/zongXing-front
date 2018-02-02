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
  let secs = $('.section');
  $('body').on('click', '.sec-tabs .tabs a', function () {
    let $t = $(this);
    $t.addClass('hover').siblings().removeClass('hover');
    let d = secs[$t.index()];
    av.top(d.offsetTop - 130);
  });
  $('body').on('click', '.sec-qa .q', function () {
    $(this).toggleClass('close');
  });

  let d1 = $('.topnav'),
    d2 = $('.sec-tabs .tabs');
  let d2top = 0;
  $('.banner .big').on('load', function () {
    d2top = d2.offset().top - 74;
  });
  $(window).on('scroll', function () {
    if (!d2top) d2top = d2.offset().top - 74;
    let top = av.top();
    if (top > 120) {
      d1.addClass('fix');
    } else {
      d1.removeClass('fix');
    }
    for (let i = secs.length - 1; i >= 0; i--) {
      if (top > secs[i].offsetTop - 140) {
        d2.find('a').eq(i).addClass('hover').siblings().removeClass('hover');
        break;
      }
    }
    if (top > d2top) {
      d2.addClass('fix');
    } else {
      d2.removeClass('fix');
      d2.find('a.hover').removeClass('hover');
    }
  });
}
