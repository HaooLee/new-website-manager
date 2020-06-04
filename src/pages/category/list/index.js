import React, { Component } from 'react'
import { getCategoryList} from '@/services/category'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Tag, message, Select } from 'antd';

import styles from './index.less'
import router from 'umi/router';

export default class NewsList extends Component {
  state={
    data:[],
    selectedRowKeys:[]

  }

  componentDidMount() {
    this.getCategoryList()
  }


  getCategoryList(){
    return getCategoryList().then(({code, data, msg})=>{
      if(code === '200'){
        this.setState({
          data
        })
      }else {
        message.info(msg)
      }
    })
  }

  pageChange = i =>{
    this.getRecruitList(i)
  }

  handlePublishClick(rid, is_release){
    return publishRecruit({
      rid,
      is_release:is_release?1:0
    }).then(({code, msg}) => {
      if(code === '200'){
        return  this.getRecruitList()
      }else {
        message.info(msg)
      }
    }).then(()=>{
      message.info(`${is_release?'发布':'撤回'}成功`);
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleEditClick(id){
    router.push({
      pathname:'/category/edit',
      query:{
        id
      }
    })
  }

  handleAddClick(){
    router.push({
      pathname:'/category/add'
    })
  }

  handleDeleteClick(rid){
    deleteRecruit(rid).then(({code,msg}) => {
      if(code === '200'){
        message.info('删除成功');
        this.getRecruitList()
      }else {
        message.info(msg)
      }
    })
  }

  render() {
    const map = {
      "1":"产品",
      "2":"运营",
      "3":"技术",
      "4":"销售",
      "5":"职能",
    }

    const { selectedRowKeys,data,totalNums,limit, page } = this.state;
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },

      {
        title: '排序(越小越靠前)',
        align:'center',
        dataIndex: 'order',
      },
      {
        title: '发布时间',
        align:'center',
        dataIndex: 'create_time',
      },
      {
        title: '启用状态',
        align:'center',
        render({status}){
          return status?<Tag color="success">已启用</Tag>:<Tag color="error">未启用</Tag>
        }
      },
      {
        title: '操作',
        align:'center',
        render:({id})=>{
          return(
            <div>
              <Button type="link" onClick={ e =>this.handleEditClick(id)}>编辑</Button>
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
            <Button type="primary" onClick={()=>this.handleAddClick()} icon={<PlusOutlined />}>
              新建
            </Button>
            <Button type="primary" danger style={{marginLeft:10}} disabled={!hasSelected} >
              批量删除
            </Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(record) => record}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}
