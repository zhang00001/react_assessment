
import React from 'react'
import './modifyAvater.less'
import axios from 'axios'
import {
    Button,
    message
} from 'antd'
import connect from 'connect'
@connect
class ModifyAvater extends React.Component{
    constructor(props){
        super(props);
        this.cropImage = this.cropImage.bind(this);
        this.state={
            src:this.props.state.user&&this.props.state.user.avatar,
            files:""
        }
    }
    changeSrc(e){
        e.persist();
        console.log(e.target)
        console.log(e.target.files[0]);
        this.setState({
            files:e.target.files[0]
        })
        var reader = new FileReader();
        reader.onload = function (evt) {
            var replaceSrc = evt.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = function(e) {
            // console.log(e.target.result+"路径")
        };
        var url = window.URL || window.webkitURL || window.mozURL;
        console.log(url.createObjectURL(e.target.files[0]));
        this.setState({
            src:url.createObjectURL(e.target.files[0])
        })
    }
    handleSubmit(){
        let temp =this.state.files;
        var formData = new FormData();
         formData.append('up_file',temp);
         formData.append('dir','useravater');
        console.log(this.state.files)
        console.log(formData);
        axios.post('v1/users/uploadFile',formData).then((res)=>{
            console.log(temp);
            console.log(res.data.data)
            console.log(res.data.data.pathroot)
            console.log(res.data.data.file_name);
            let originPic =res.data.data.pathroot+res.data.data.file_name;
            if(res.data.code==0){
                axios.post('v1/users/editUser',{
                    avatar:originPic
                }).then((res)=>{
                    if(res.data.code==200){
                        message.success(res.data.msg);
                        this.props.changeUser({
                            user:{
                                avatar:originPic
                            }
                        })
                        this.props.history.go(-1);
                    }
                })
            }else{
                message.error(res.data.msg);
            }
        })
    }
    cropImage() {
        if (this.cropper.getCroppedCanvas() === 'null') {
            return false
        }
        this.props.getCropData(this.cropper.getCroppedCanvas().toDataURL())
    }
      render() {
          const {user} =this.props.state;
        //   console.log(user)
        return (
            <div className="modifyAvaterPage">
                    <p className="modifyText">修改图像</p>
                    <div className="avaterSrc">
                         <img src={this.state.src} />
                         <p className="avaterTips">选择一张个人正面照片作为头像</p>
                    </div>
                    <div className="uploadBtn">
                       <span className="choiseBtn">
                            <input type="file" accept="image/jpeg,image/x-png,image/gif" onChange={(e)=>this.changeSrc(e)} />
                            选择照片
                        </span> 
                        <span className="confirmBtn">
                            <input type="button" onClick={()=>this.handleSubmit()} />
                            确定上传
                        </span>    
                    </div>
                    {/* <div className="cropperAvater">
                        <Cropper
                            src={this.props.src}
                            ref={cropper => {
                                this.cropper = cropper;
                            }}
                            style={{height: 400, width: '100%'}}
                            aspectRatio={246/346}
                            guides={false}
                        />
                        <Button type="primary" size="large" onClick={this.cropImage} style={{marginTop: '10px'}}>
                                确认裁剪
                     </Button>
                    </div> */}
            </div>
        );
      }
}
export default ModifyAvater