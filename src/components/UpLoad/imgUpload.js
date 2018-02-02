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

  componentDidMount() {
    $(".file").on('change', function() {
      // this.setState({ loading: true });
      console.log(this.files[0]);
      const file = this.files[0];
      global.cos.sliceUploadFile({
        Bucket: Bucket,
        Region: Region,
        Key: '123/' + file.name,
        Body: file,
      },  (err, data) => {
        // this.setState({ loading: false });
        console.log(err, data);
      });
    })
  }


  uuid = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  };

  uploadRequest = (data) => {

    // console.log(data);
    // console.log(document.getElementById('file'));
    // const file = document.getElementById('file').files[0]
    // console.log(file)
    // beforeUpload(data.file);
    // console.log(data.file);

    // console.log(typeof data.file)
    // const fileName = data.file.name;
    // const suffix = data.file.name.substring(fileName.lastIndexOf('.'), fileName.length);
    // this.setState({ loading: true });
    // global.cos.sliceUploadFile({
    //   Bucket: Bucket,
    //   Region: Region,
    //   Key: this.props.prefix || '123/' + file.name,
    //   Body: file,
    // },  (err, data) => {
    //   this.setState({ loading: false });
    //   console.log(err, data);
    // });
  };

  render() {
    const uploadButton = (
      <div className={this.props.divClassName} >
        <Icon type={this.state.loading ? 'loading' : 'plus-circle-o'} />
        <div className="ant-upload-text">{this.props.tipText}</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <input type="file" className={this.props.classNames} onChange={this.uploadRequest}/>

    );
  }
}

