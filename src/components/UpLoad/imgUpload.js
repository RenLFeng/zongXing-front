import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能上传图片格式');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('照片限制在2MB以内');
  }
  return isJPG && isLt2M;
}

const Bucket = 'zjb01-1255741041';
const Region = 'ap-shanghai';

export default class ImgUpload extends React.Component {

  state = {
    loading: false,
  };


  uuid = () => {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
  };

  uploadRequest = (data) => {
    const file = data.file;
    const fileName = data.file.name;
    const suffix = data.file.name.substring(fileName.lastIndexOf('.'), fileName.length);
    const fileNames = this.uuid();
    const realName = this.props.type + fileNames.replace(/-/g, '') + suffix;
    this.setState({ loading: true });
    this.props.changeLoading(this.props.name, true);
    global.cos.putObject({
      Bucket: Bucket,
      Region: Region,
      Key: this.props.prefix+realName || 'error/'+realName,
      Body: file,
      onProgress: function (info) {
        const percent = parseInt(info.percent * 10000) / 100;
        const speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
        console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
      onFileFinish: function (err, data, options) {
        console.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
      },
    },  (err, data) => {
      this.setState({ loading: false });
      this.props.changeLoading(this.props.name, false);
      if (err) {
        console.log(err);
        message.error("图片上传失败");
      } else {
        this.setState({imageUrl: realName});
        this.props.changeState(this.props.name, realName);
      }
    });
  };

  render() {
    const uploadButton = (
      <div className={this.props.divClassName} >
        <Icon type={this.state.loading ? 'loading' : 'plus-circle-o'} />
        <div className="ant-upload-text">{this.props.tipText}</div>
      </div>
    );
    const fileButton = (
      <div className={this.props.divClassName} >
        <Icon type={'down-circle-o'} />
        <div className="ant-upload-text">上传成功</div>
      </div>
    );
    const imageUrl = this.props.imageUrl;
    const {type} = this.props;
    if (this.state.loading) {
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          className={this.props.className}
          action="//jsonplaceholder.typicode.com/posts/"
          customRequest={this.uploadRequest}
        >
          <div className={this.props.divClassName} >
            <Icon type={'loading'} />
            <div className="ant-upload-text">{this.props.tipText}</div>
          </div>
        </Upload>
      );
    }
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        className={this.props.className}
        action="//jsonplaceholder.typicode.com/posts/"
        customRequest={this.uploadRequest}
      >
        {type === 'images/' ? imageUrl ? <img className={this.props.divClassName} src={this.props.baseUrl + this.props.prefix + imageUrl} alt="" /> : uploadButton :
          imageUrl ? fileButton : uploadButton}
      </Upload>
    );
  }
}

