import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input, Button,Switch,message } from 'antd';
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
    is_release: 0
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
          is_release:data.is_release
        })
      }else {
        message.info(msg)
      }

    })
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  saveNews(params){
    return updateNewsDetail(params)
  }

  handleSaveClick = () =>{
    const {title, source,desc, is_release, outputHTML} = this.state
    this.saveNews({
      nid:this.props.location.query.nid,
      news_title:title,
      news_des:desc,
      news_source:source,
      is_release,
      content:outputHTML
    }).then(({code,msg})=>{
      if(code === '200'){
        message.info('修改成功')
      }else {
        message.info(msg)
      }
    })
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

  render () {

    const { editorState,title,source,desc,is_release } = this.state

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
