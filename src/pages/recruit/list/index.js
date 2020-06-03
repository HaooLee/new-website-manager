import React, { Component } from 'react'
import { getRecruitList,publishRecruit ,deleteRecruit} from '@/services/recruit.js'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Tag, message, Select } from 'antd';

import styles from './index.less'
import router from 'umi/router';

export default class NewsList extends Component {
  state={
    data:[],
    selectedRowKeys:[],
    totalNums:0,
    limit:5,
    page:1

  }

  componentDidMount() {
    this.getRecruitList()
  }


  getRecruitList(page = 1){
    const {limit} = this.state
    return getRecruitList({limit,page}).then(({code, data:{list,totalNums,currentPage}, msg})=>{
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

  handleEditClick(rid){
    router.push({
      pathname:'/recruit/edit',
      query:{
        rid
      }
    })
  }

  handleAddClick(){
    router.push({
      pathname:'/recruit/add'
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
        title: '职位名称',
        dataIndex: 'title',
      },
      {
        title: '工作城市',
        align:'center',
        dataIndex: 'working_place',
      },
      {
        title: '职位类别',
        align:'center',
        render({job_cate}){
          return <span>{map[job_cate]}</span>
        }
      },
      {
        title: '操作人',
        align:'center',
        dataIndex: 'creater',
      },
      {
        title: '发布时间',
        align:'center',
        dataIndex: 'create_time',
      },
      {
        title: '发布状态',
        align:'center',
        render({is_release}){
          return is_release?<Tag color="success">已发布</Tag>:<Tag color="error">未发布</Tag>
        }
      },
      {
        title: '操作',
        align:'center',
        render:({rid,is_release})=>{
          return(
            <div>
              <Button type="link" onClick={ e =>this.handleDeleteClick(rid)}>删除</Button>|
              <Button type="link" onClick={ e =>this.handleEditClick(rid)} disabled={is_release}>编辑</Button>|
              <Button type="link" danger={is_release} onClick={ () =>this.handlePublishClick(rid,!is_release)}>{is_release?'撤回':'发布'}</Button>
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
          <Table pagination={{ position: ['bottomCenter'],hideOnSinglePage:true,onChange:this.pageChange,total: totalNums,pageSize:limit,current:page}} rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={(record) => record}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}
