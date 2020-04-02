import React, { Component } from 'react'
import { getConfig, saveConfig } from '@/services/config';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button } from 'antd';

import styles from './index.less'

export default class NewsList extends Component {
  state={
    data:[{news_title:'123123'},{news_title:'123123'}],
    selectedRowKeys:[]
  }


  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {

    const { loading, selectedRowKeys,data } = this.state;
    const columns = [
      {
        title: '职位名称',
        dataIndex: 'news_title',
      },
      {
        title: '工作城市',
        align:'center',
        dataIndex: 'news_desc',
      },
      {
        title: '职位类别',
        align:'center',
        dataIndex: 'news_time',
      },
      {
        title: '招聘部门',
        align:'center',
        dataIndex: 'creater',
      },
      {
        title: '操作人',
        align:'center',
        dataIndex: 'laste_time',
      },
      {
        title: '发布时间',
        align:'center',
        dataIndex: 'laste_time',
      },
      {
        title: '操作',
        align:'center',
        render(){
          return(
            <div>
              <Button type="link">删除</Button>
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
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>

            <Button type="primary" danger style={{marginLeft:10}} disabled={!hasSelected} loading={loading}>
              批量删除
            </Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(record) => record}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}
