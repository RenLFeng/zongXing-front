import './index.scss';
import '../common/module/select';
import {knob} from '../common/module/knob';

export function startAnimate() {
  initPage();
  bindEvent();
}

function initPage() {
    $('.sec2 .circle').data('value', '100');
    knob({
        selector: '.sec1 .circle'
    });
    knob({
        selector: '.sec2 .circle',
        width: 86
    });
}

function bindEvent() {
    let arr = $('.searchbox .select');
    arr.eq(0).on('change', function(){
        arr.eq(1).dlChange($(this).data('index'));
    });
    arr.eq(1).on('change', function(){
        arr.eq(0).dlChange($(this).data('index'));
    });
}