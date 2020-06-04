import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getCategoryDetail, updateCategory } from '@/services/category'
import {
  Form,
  Input,
  Select,
  Switch,
  Checkbox,
  InputNumber,
  message,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;


export default class RecruitEdit extends Component {

  formRef = React.createRef();

  componentDidMount() {
     this.getCategoryDetail()
  }

  getCategoryDetail(){
    return getCategoryDetail(this.props.location.query.id)
      .then(({code, msg, data:{name, order, status}}) =>{

        if(code === '200'){
          this.formRef.current.setFieldsValue({
            name,
            status:!!status,
            order
          })
        }else {
          message.info(msg)
        }
      })
  }

  updateCategory(values){
    return updateCategory({
      id:this.props.location.query.id,
      ...values
    }).then(({code,msg})=>{
      if(code === '200') {
        message.success('修改成功')
      }else{
        message.error('修改失败')
      }
    })
  }

  onFinish = values => {
    console.log('Success:', values);
    this.updateCategory(values)
  };

   onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

   filter= (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <PageHeaderWrapper>
        <Form
          {...formItemLayout}
          name="category"
          onFinish={this.onFinish}
          ref={this.formRef}
          scrollToFirstError
        >

          <Form.Item
            name="name"
            label="分类名称"
            rules={[
              { required: true, message: '分类名称' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="是否启用"
            getValueFromEvent={(status)=> Number(status)}
            valuePropName={'checked'}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="order"
            label="排序(越小越靠前)"
            rules={[
              // { type: 'array', required: true, message: '请选择职位城市' },
              { required: true, message: '请输入排序值' }
            ]}
          >
            <InputNumber step={1} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" size="large" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    )
  }
}
