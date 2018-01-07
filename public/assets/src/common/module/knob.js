module.exports = function (options) {

    options = $.extend({
        selector: '.circle',
        width: 120,
        slow: true
    }, options || {});

    if ($.fn.knob) {
        initKnob(options);
    } else {
        av.loadjs('/assets/third/jquery.knob.min.js', function () {
            initKnob(options);
        });
    }
};

function initKnob(options) {
    let s0 = '<input class="knob" data-value="{0}" value="0" data-fgColor="{1}" data-width="{2}" readonly data-displayPrevious="true" data-thickness="0.2" />';
    let getColor = function (val) {
        if (val < 60) return '#41e9c3';
        if (val < 100) return '#086b6a';//2fa7a6
        return '#ff6600';
    };
    let arr = $(options.selector).html(function () {
        let val = $(this).data('value') || '0';
        return s0.format(val, getColor(val - 0), options.width);
    }).find('.knob');
    if (options.slow) {
        arr.addClass('hide');
        arr.knob();
        arr.each(grow);
    } else {
        arr.val(function () {
            return $(this).data('value');
        }).knob();
        arr.val(function () {
            return this.value + '%';
        });
    }
    arr.css('color', '#aaa');
}

function grow() {
    let $t = $(this);
    let max = $t.data('value') - 0;
    let val = 0;
    let inter = setInterval(function () {
        if (val >= max) {
            $t.val(val + '%').removeClass('hide');
            clearInterval(inter);
        } else {
            val++;
            $t.val(val).change();
        }
    }, 10);
}