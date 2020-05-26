import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input, Button, Switch, message, Upload, Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getNewsDetail,updateNewsDetail } from '@/services/news'
import styles from './index.less'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import router from 'umi/router';

export default class NewsEdit extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    title:'',
    source:'',
    desc:'',
    is_release: 0,
    news_cover:'',
    news_type:0,
    loading:false
  }

  componentDidMount () {
    // console.log()
    if(this.props.location.query.nid){
      this.getNewsDetail(this.props.location.query.nid)
    }
  }

  getNewsDetail(nid){
    return getNewsDetail(nid).then(({data, code, msg})=>{
      if(code === '200'){
        this.setState({
          editorState: BraftEditor.createEditorState(data.content),
          title:data.news_title,
          source:data.news_source,
          desc:data.news_des,
          is_release:data.is_release,
          news_cover:data.news_cover,
          news_type:data.news_type
        })
      }else {
        message.info(msg)
      }

    })
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  saveNews ( params ){
    return updateNewsDetail(params)
  }

  handleSaveClick = () =>{
    const {title, source, desc, is_release, outputHTML,loading,news_cover,news_type} = this.state
    if(!title){
      message.error('请填写新闻标题')
    }else if(!source){
      message.error('请填写新闻来源')
    }else if(!desc){
      message.error('请填写新闻描述')
    }else if(!news_cover){
      message.error('请填写新闻头图')
    }else if(loading){
      message.error('请等待头图上传完成')
    }else if(!outputHTML){
      message.error('请填写新闻内容')
    }else {
      this.saveNews({
        nid:this.props.location.query.nid,
        news_title:title,
        news_des:desc,
        news_source:source,
        is_release,
        content:outputHTML,
        news_cover,
        news_type
      }).then(({code,msg})=>{
        if(code === '200'){
          message.info('修改成功')
        }else {
          message.info(msg)
        }
      })
    }

    // console.log(title, source, release, outputHTML)

  }

  handleTitleChange = ({ target: { value } }) =>{
    this.setState({
      title: value
    })
  }

  handleDescChange = ({ target: { value } }) => {
    this.setState({
      desc: value
    })
  }

  handleSourceChange = ({ target: { value } }) =>{
    this.setState({
      source: value
    })
  }

  handleReleaseChange =(checked) =>{
    // console.log(checked)
      this.setState({
        is_release:checked?1:0
      })
  }

  handleChange = (editorState) => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('')
    })
  }

  handleNewsTypeChange = e =>{
    this.setState({
      news_type: e.target.value,
    });
  }

  handleUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      if(info.file.response && info.file.response.code === '200'){
        this.setState({
          news_cover:info.file.response.data,
          loading: false,
        })
      }else {
        getBase64(info.file.originFileObj, news_cover =>
          this.setState({
            news_cover,
            loading: false,
          }),
        );
      }

    }
  };

  render () {

    const { editorState,title,source,desc,is_release,news_cover,news_type } = this.state

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.inputWrap}>
          <Button type="primary" className={styles.save} onClick={this.handleSaveClick} shape="round" size={'large'}>
            保存文章
          </Button>
          <div style={{padding:'10px 0'}}>
            <span>是否发布:</span>
            <Switch style={{marginLeft:20}} onChange={this.handleReleaseChange} defaultChecked={!!is_release} />
          </div>
          <div>
            <span>新闻头图:</span>
            <Upload
              name="source"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/V1.4/file/upload"
              // beforeUpload={beforeUpload}
              onChange={this.handleUploadChange}
            >
              {news_cover  ? <img src={news_cover } alt="cover" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div>
            <span>新闻分类:</span>
            <Radio.Group onChange={this.handleNewsTypeChange} style={{padding:20}} value={news_type}>
              <Radio value={1}>资讯列表</Radio>
              <Radio value={2}>专题区</Radio>
              <Radio value={3}>荣誉</Radio>
              <Radio value={4}>疫情</Radio>
            </Radio.Group>
          </div>
          <Input size="large" value={title} onChange={this.handleTitleChange} placeholder="文章标题" style={{marginBottom:10}}/>
          <Input value={desc} onChange={this.handleDescChange} placeholder="文章描述" style={{marginBottom:10}}/>
          <Input placeholder="文章来源" value={source} onChange={this.handleSourceChange} style={{marginBottom:10}}/>
        </div>
        <div className={styles.wrap}>
          <div className={styles.editorWrapper}>
            <BraftEditor
              value={editorState}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </PageHeaderWrapper>

    )

  }

}
