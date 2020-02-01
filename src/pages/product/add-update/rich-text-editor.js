import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg' // 只需下載react-draft-wysiwyg包和draftjs-to-html包即可，別的包都被这两个包所依赖，在下载这两个包时就会将其它包也下载下来，因此不需要在下载其它包了，只需引入即可。注意：要下载0.8版本的draftjs-to-html包，不能下载高于0.8版本的，例如不能为0.9版本的。原因如下。
import draftToHtml from 'draftjs-to-html'  // 注意：下载draftjs-to-html包时，要下载0.8版本的，不要下高于0.8这个版本的，因为高于0.8这个版本的在处理图片的对齐问题时有bug，例如将图片右对齐时，再保存后，会发现图片还是显示为中间对齐而不是右对齐，因此要下载draftjs-to-html包为0.8版本的，而不能高于0.8版本，例如不能为0.9版本的。
import htmlToDraft from 'html-to-draftjs' 
import propTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { BASE_URL } from '@/utils/constants';

export default class RichTextEditor extends Component {

  static propTypes = {
    detail: propTypes.string
  }

  constructor(props) {
    super(props)
  
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.initEditorState() // 初始化this.state中的editorState状态
  } 

  /*
    初始化this.state中的editorState状态,根据传入的detail生成editorState并重新赋值给this.state中的editorState
  */
  initEditorState = () => {
    const detail = this.props.detail
    if (detail) {
      // 根据detail生成一个editorState
      const contentBlock = htmlToDraft(detail)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)

      // 重新赋值给this.state中的editorState
      this.state.editorState = editorState
    }
  }

  /*
    获取详情数据
  */
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  // 图片文件上传
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => { // 执行器函数,执行异步任务的
        const xhr = new XMLHttpRequest();
        xhr.open('POST', BASE_URL + '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        // 发送带文件上传的表单数据，即发送文件数据时的处理方式
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText); // {status:0, data: {name: '', url或link: '....'}}
          resolve(response); // 此处resolve中所传递出去的response数据格式必须为对象，且其中必须包含data属性，data属性值必须为对象，其中必须包含url或者link属性(注：必须叫url或者link名字，不能叫其它名字)，其值必须为上传图片后的图片的在线地址，例如：{status:0, data: {name: '', url或link: '....'}}
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{ height: 200, border: '1px solid black', padding: 10 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}