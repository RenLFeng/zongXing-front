import './index.scss';
import {animate} from './animate';
import {init} from './_invest';

export function startAnimate() {
  initPage();
  bindEvent();
  animate();
}

function initPage() {

  new TextSlider($('.home-banner .t1'));

}

function bindEvent() {
  $('.home-banner').on('click', function(){
    $('.home-banner video')[0].play();
  });
}

class TextSlider {
  constructor(arr){
    this.arr = arr;
    this.init();
  }
  init(){
    let _this = this;

    let i0 = this.arr.eq(0).find('i');
    let i1 = _this.arr.eq(1).find('i');
    let i2 = _this.arr.eq(2).find('i');

    _this.first(i0);
    setTimeout(function(){
      i1.addClass('show');
      setTimeout(function(){
        i1.removeClass('show');
      },4000);
    }, 12000);
    setTimeout(function(){
      i2.addClass('show');
      setTimeout(function(){
        i2.removeClass('show');
      },4000);
      setTimeout(function(){
        _this.init();
      },7000);
    }, 19000);
  }
  first(ii){
    ii.eq(0).addClass('show');
    setTimeout(function(){
      ii.eq(1).addClass('show');
    },2000);
    setTimeout(function(){
      ii.eq(2).addClass('show');
    },4000);
    setTimeout(function(){
      ii.parent().addClass('hid');
      ii.removeClass('show');
    }, 8000);
    setTimeout(function(){
      ii.parent().removeClass('hid');
    },10000);
  }
}
