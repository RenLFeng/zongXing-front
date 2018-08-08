import './index.scss';
export function startAnimate() {
  initPage();
  bindEvent();
}
function initPage(){}
function bindEvent(){
  let page=0;
  let isScroll=true;
  $(".fl.infor >p.t2").on("click",function(){
    $(this).addClass("act").siblings().removeClass("act company");
  });
  $(".questions .question").on("click",function(){
    $(this).toggleClass("act").nextAll().slideToggle();
  })
  $(window).on("scroll",function(){
    var scrollH= $(this).scrollTop();
    if(getH(scrollH)){
      if(isScroll){
        isScroll=false;
        if(page>=2){
          isScroll=false;
          return false;
        }
        $(".risk >.animetion").eq(page).removeClass("none").addClass("zoomIn");
        page+=1;
        isScroll=true;
      }
    }
  })
  function getH(scrollH){ 
    let windowH=$(window).height(); 
    let footerH=$(".footer").outerHeight()/3-50;   
    let footerTopH=$(".footer").offset().top;
    if(scrollH+windowH>parseInt(footerH+footerTopH)){
        return true;
    }else{
      return false;
    }
  }
}
