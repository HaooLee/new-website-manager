import React, { Component } from 'react'
import { getConfig, saveConfig } from '@/services/config';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input, Button,Switch } from 'antd';
import styles from './index.less'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

export default class NewsEdit extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    title:'',
    source:'',
    desc:'',
    release: true
  }

  componentDidMount () {
    // this.isLivinig = true
    // // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleSaveClick = () =>{
    const {title, source, release, outputHTML} = this.state

    console.log(title, source, release, outputHTML)

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
    console.log(checked)
      this.setState({
        release:checked
      })
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('')
    })
  }

  render () {

    const { editorState,title,source,desc } = this.state

    return (
      <PageHeaderWrapper>
        <div className={styles.inputWrap}>
          <Button type="primary" className={styles.save} onClick={this.handleSaveClick} shape="round" size={'large'}>
            保存文章
          </Button>
          <div style={{padding:'10px 0'}}>
            <span>是否发布:</span>
            <Switch style={{marginLeft:20}} onChange={this.handleReleaseChange} defaultChecked />
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
