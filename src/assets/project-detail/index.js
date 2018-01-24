import './index.scss';
import {knob} from '../common/module/knob';

export default function () {
    initPage();
    bindEvent();
}

function initPage() {
    timeClock();
    knob();
}

function bindEvent() {
    leftNav();
    picView();
    comment();

    $('.pd-body .tnav>a').on('click', function () {
        let $t = $(this);
        $t.addClass('hover').siblings().removeClass('hover');
        $('.pd-con').addClass('none').eq($t.index()).removeClass('none');
        if ($t.index() == 2) {
            genzong();
        }
    });
    rightEvent();
}

function leftNav() {
    let nav = $('.pd-body>.lbody .lnav');
    nav.on('click', 'a', function () {
        let $t = $(this);
        //$t.addClass('hover').siblings().removeClass('hover');
        let $d = $('.pd-body>.lbody .textbox').eq($t.index());
        av.top($d.offset().top - 20);
    });
    let t0 = parseInt(nav.css('top'), 10);
    $(window).on('scroll', function () {
        let top = av.top();
        let t1 = top - $('.pd-body').offset().top;
        if (t1 > t0) {
            nav.addClass('fixed');
        } else {
            nav.removeClass('fixed');
        }
        $('.pd-body>.lbody .textbox').each(function (i, e) {
            if ($(e).offset().top - 30 < top) {
                nav.find('a').eq(i).addClass('hover').siblings().removeClass('hover');
            }
        });
    });
}

function picView() {
    let $d = $('.imgsdiv'),
        $box = $d.find('.box');
    $box.on('click', 'a', function () {
        $(this).addClass('hover').siblings().removeClass('hover');
        let val = 'url({0})'.format($(this).data('big'));
        $d.find('.bigpic').css('background-image', val);
    });
    $d.find('.btn').on('click', function () {
        let $t = $(this);
        let height = $box.find('a')[0].offsetHeight;
        let tmp = height * ($t.hasClass('prev') ? -1 : 1);
        $box[0].scrollTop += tmp;
    });
}

function timeClock() {
    let $d = $('.pd-body .box1 .trow');
    let end = $d.data('end').date(1).getTime();

    function timer() {
        let secs = (end - +new Date) / 1000;
        let d = parseInt(secs / 60 / 60 / 24);
        let h = parseInt(secs / 60 / 60 % 24);
        let m = parseInt(secs / 60 % 60);
        let s = parseInt(secs % 60);
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        $d.find('.day .t1').html(d);
        $d.find('.time .t1').html('{0} : {1} : {2}'.format(h, m, s));
    }
    setInterval(timer, 1000);
}

function comment() {
    $('.cmt-box1,.cmt-list').on('input', '.put', function () {
        let $t = $(this);
        let len = 240 - $t.val().length;
        if (len < 0) {
            $t.val($t.val().substr(0, 240));
            len = 0;
        }
        $t.next().find('em').html(len);
    });
}

function genzong() {
    if (av.genzong) return;
    av.genzong = 1;

    let count = $('.lich-box1 .swiper-slide').length;
    $('.lich-box1 .bot>i').html(count);
    var swiper = new Swiper('.lich-box1 .swiper-container', {
        speed: 1000,
        loop: true,
        onSlideChangeEnd: resetCon
    });
    $('.lich-box1 .prev').on('click', function () {
        swiper.swipePrev();
    });
    $('.lich-box1 .next').on('click', function () {
        swiper.swipeNext();
    });

    function resetCon(swiper) {
        let d = swiper.getSlide(swiper.activeIndex);
        let tit = $(d).find('.t0').html();
        $('.lich-box1 .hd .tit').html(tit);
        let idx = swiper.activeIndex || count;
        if (idx > count) idx = 1;
        $('.lich-box1 .bot>b').html(idx);
    }

    $('.qa-list').on('click', '.more>a', function () {
        let $t = $(this);
        if ($t.hasClass('hover')) {
            $t.removeClass('hover').html($t.data('old'));
            $t.parent().prev().addClass('none');
        } else {
            $t.addClass('hover').data('old', $t.html()).html('收起回答');
            $t.parent().prev().removeClass('none');
        }
    });
    $('.qa-list .more>a').eq(1).trigger('click');
}

function rightEvent() {
    let s0 = $('.pd-data .list .row').eq(1).html();
    let i = 1,
        ss = '';
    while (i++ < 20) {
        ss += '<div class="row">' + s0 + '</div>';
    }
    $('.pd-data .list').append(ss);

    $('.pd-body>.rbody .box1 .bot .btn').on('click', function () {
        $('.pd-data').before('<div class="_masker"></div>');
        $('.pd-data').removeClass('none').css('top', av.top() + 50 + 'px');
    });
    $('.pd-data .close').on('click', function () {
        $('._masker').remove();
        $('.pd-data').addClass('none');
    });

    $('.pd-body>.rbody .box2 .bot1 .btn').on('click', function () {
        $('.pd-form').before('<div class="_masker"></div>');
        $('.pd-form').removeClass('none').css('top', av.top() + 50 + 'px');
    });
    $('.pd-form .close,.pd-form .btn2').on('click', function () {
        $('._masker').remove();
        $('.pd-form').addClass('none');
    });
}
