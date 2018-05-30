import React,{Component} from 'react';
export default class Test extends Component {
  render() {
    return (
      <div>
        <form ref={ref => this.formId = ref} action="https://www.baidu.com" method="post" target="w1" style={{display:'none'}}>
          <input id="WithdrawMoneymoremore" name="WithdrawMoneymoremore" value={123} />
         
        </form>
        <button onClick={()=>this.formId.submit()}>点击</button>
        <button onClick={()=>{
          console.log(this.iframeId);
          let iframe = this.iframeId;
          let componentId = iframe.contentWindow.document.getElementById('kw');
          console.log(componentId);
          componentId.value = '123';
        }}>点击设置内容</button>
        <iframe ref={ref => this.iframeId = ref} name='w1'>
        </iframe>

      </div>
    )
  }
}