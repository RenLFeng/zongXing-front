import './index.scss';
export function startAnimate() {
  initPage();
  bindEvent();
}
function initPage(){}
function bindEvent(){

  $(".fl.infor >p.t2").on("click",function(){
    $(this).addClass("act").siblings().removeClass("act");
  });
  $(".questions .question").on("click",function(){
    $(this).toggleClass("act").nextAll().slideToggle();
  })

}
