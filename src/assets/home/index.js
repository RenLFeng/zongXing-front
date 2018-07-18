import './index.scss';
import {animate} from './animate';
import {init} from './_invest';
export function startAnimate() {

  initPage();
  bindEvent();
  animate();
}

function initPage() {
  let page=0;
  let index=0;
  new TextSlider(page,index);
}
class TextSlider{
  constructor(page,index){
    this.speed=1200;
    this.page=page;
    this.idex=index;
    this.time=null;
    this.istrue=true;
    this.init();
  }
    init(){
      this.addClas(this.page);
      this.time=setInterval(()=>{
        this.move(this.idex);
        this.idex++;
        if(this.idex==3 && this.page==0){
          this.page=1;
          this.idex=0;
          clearInterval(this.time);
          setTimeout(()=>this.init(),3000);
        }else if(this.idex==3 && this.page==1){
          this.page=2;
          this.idex=0;
          clearInterval(this.time);
          setTimeout(()=>this.init(),3000);
        }else if(this.idex==3 && this.page==2){
          this.page=0;
          this.idex=0;
          clearInterval(this.time);
          setTimeout(()=>this.init(),3000);
        }
      },this.speed)
    }
    addClas(page){
      $(".home-banner .w >p.item").eq(page).addClass("act").siblings().removeClass("act");
    }
    move(index){
        $(".home-banner .w p.act span").eq(index).addClass("act").parent("p.act").siblings().find("span").removeClass("act");
      }
}
function bindEvent() {
  $('.home-banner').on('click', function(){
    $('.home-banner video')[0].play();
  });
}