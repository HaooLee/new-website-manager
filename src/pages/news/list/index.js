import React, { Component } from 'react'
import { getNewsList,deleteNews } from '@/services/news';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Button, message, Tag } from 'antd';

import styles from './index.less'

export default class NewsList extends Component {
  state={
    data:[],
    selectedRowKeys:[]
  }

  componentDidMount() {
    this.getNewsList().then((d)=>{
      this.setState({
        data:d
      })
    })
  }

  getNewsList(){
    return getNewsList()
  }

  handleDeleteClick(nid){
    console.log(nid)
    deleteNews(nid).then(() =>{
      message.info('删除成功');
    })
  }


  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {

    const { loading, selectedRowKeys,data } = this.state;
    const columns = [
      {
        title: '新闻标题',
        align:'center',
        dataIndex: 'news_title',
      },
      {
        title: '新闻描述',
        align:'center',
        dataIndex: 'news_desc',
      },
      {
        title: '新闻时间',
        align:'center',
        dataIndex: 'news_time',
      },
      {
        title: '创建人',
        align:'center',
        dataIndex: 'creater',
      },
      {
        title: '最后操作时间',
        align:'center',
        dataIndex: 'laste_time',
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
        render:({nid,is_release})=>{
          return(
            <div>
              <Button type="link" onClick={e=>this.handleDeleteClick(nid)}>删除</Button>|
              <Button type="link" disabled={is_release}>编辑</Button>|
              <Button type="link" disabled={is_release}>发布</Button>

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
            <Button type="error" onClick={this.start} disabled={!hasSelected} loading={loading}>
              删除
            </Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(record) => record}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}
