import React, { Component } from 'react'
import { getNewsList,deleteNews,publishNews } from '@/services/news';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Button, message, Tag } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import router from 'umi/router';

import styles from './index.less'

export default class NewsList extends Component {
  state={
    data:[],
    selectedRowKeys:[],
    totalNums:0,
    limit:10,
    page:1
  }

  componentDidMount() {
    this.getNewsList()
  }

  getNewsList(page=1){
    const {limit} = this.state
    return getNewsList({page,limit}).then(({data:{list,totalNums,currentPage},code,msg})=>{
      if(code === '200'){
        this.setState({
          data:list,
          totalNums,
          page:currentPage
        })
      }else {
        message.info(msg)
      }
    })
  }

  handleDeleteClick(nid){

    deleteNews(nid).then(() =>{
     return this.getNewsList().then(()=>{
       message.info('删除成功');
     })
    })
  }

  handlePublishClick(nid,is_release){
    return publishNews({
      nid,
      is_release:is_release?1:0
    }).then(({code, msg})=>{
      if(code === '200'){
        return  this.getNewsList(1)
      }else {
        message.info(msg)
      }
    }).then(()=>{
      message.info(`${is_release?'发布':'撤回'}成功`);
    })
  }

  handleEditClick(nid){
    router.push({
      pathname:'/news/edit',
      query:{
        nid
      }
    })
  }

  handleAddClick (){
    router.push({
      pathname:'/news/add'
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  pageChange = i =>{
    this.getNewsList(i)
  }

  render() {
    const { loading, selectedRowKeys,data,totalNums ,limit,page} = this.state;
    const columns = [
      {
        title: '新闻标题',
        align:'center',
        dataIndex: 'news_title',
      },
      {
        title: '新闻描述',
        align:'center',
        ellipsis: true,
        dataIndex: 'news_des',
      },
      {
        title: '新闻时间',
        align:'center',
        dataIndex: 'news_time',
      },
      {
        title: '最后操作时间',
        align:'center',
        dataIndex: 'publish_time',
      },
      {
        title: '状态',
        align:'center',
        render({is_release}){
          return is_release?<Tag color="success">已发布</Tag>:<Tag color="error">未发布</Tag>
        }
      },
      {
        title: '操作',
        align:'center',
        width:300,
        render:({nid,is_release})=>{
          return(
            <div>
              <Button type="link" onClick={ () =>this.handleDeleteClick(nid)}>删除</Button>|
              <Button type="link" onClick={ () =>this.handleEditClick(nid)} disabled={is_release}>编辑</Button>|
              <Button type="link" danger={is_release} onClick={ () =>this.handlePublishClick(nid,!is_release)}>{is_release?'撤回':'发布'}</Button>
            </div>
          )
        }
      }
    ];


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return (
      <PageHeaderWrapper>
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={this.handleAddClick} icon={<PlusOutlined />}>
              新建
            </Button>

            <Button type="primary" danger style={{marginLeft:10}} disabled={!hasSelected} loading={loading}>
              批量删除
            </Button>
          </div>
          <Table pagination={{ position: ['bottomCenter'],hideOnSinglePage:true,onChange:this.pageChange,total: totalNums,pageSize:limit,current:page}} rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(record) => record}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}
