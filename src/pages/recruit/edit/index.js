import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getRecruitDetail, updateRecruit } from '@/services/recruit'
// import provinces from "china-division/dist/provinces.json";
// import cities from "china-division/dist/cities.json";
// import areas from "china-division/dist/areas.json";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  message,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;

import styles from './index.less'

// areas.forEach(area => {
//   const matchCity = cities.filter(city => city.code === area.cityCode)[0];
//   if (matchCity) {
//     matchCity.children = matchCity.children || [];
//     matchCity.children.push({
//       label: area.name,
//       value: area.name
//       // value: area.code
//     });
//   }
// });
//
// cities.forEach(city => {
//   const matchProvince = provinces.filter(
//     province => province.code === city.provinceCode
//   )[0];
//   if (matchProvince) {
//     matchProvince.children = matchProvince.children || [];
//     matchProvince.children.push({
//       label: city.name,
//       value: city.name,
//       // value: city.code,
//       children: city.children
//     });
//   }
// });
//
// const address = provinces.map(province => ({
//   label: province.name,
//   value: province.name,
//   // value: province.code,
//   children: province.children
// }));

export default class RecruitEdit extends Component {

  formRef = React.createRef();

  componentDidMount() {
     this.getTecruitDetail()
  }

  getTecruitDetail(){
    return getRecruitDetail(this.props.location.query.rid)
      .then(({code, msg, data}) =>{
        if(code === '200'){
          this.formRef.current.setFieldsValue({
            title:data.title,
            working_place:data.working_place,
            job_cate:data.job_cate,
            duty:data.duty,
            requier:data.requier
          })
        }else {
          message.info(msg)
        }
      })
  }

  updateRecruit(values){
    return updateRecruit({
      rid:this.props.location.query.rid,
      ...values
    })
  }

  onFinish = values => {
    // .console.log('Success:', values);
    this.updateRecruit(values)
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
          name="recruit"
          onFinish={this.onFinish}
          ref={this.formRef}
          scrollToFirstError
        >
          <Form.Item
            name="job_cate"
            label="职位类别"
            rules={[
              { required: true, message: '请选择职位类别' }
            ]}
          >
            <Select
              placeholder=""
              // onChange={onGenderChange}
              allowClear
            >
              <Option value={1}>产品</Option>
              <Option value={2}>运营</Option>
              <Option value={3}>技术</Option>
              <Option value={4}>销售</Option>
              <Option value={5}>职能</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="职位名称"
            rules={[
              { required: true, message: '请输入职位名称' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="working_place"
            label="工作地点"
            rules={[
              // { type: 'array', required: true, message: '请选择职位城市' },
              { required: true, message: '工作地点' }
            ]}
          >
            <Input />
            {/*<Cascader options={address} expandTrigger="hover" showSearch={{ filter: this.filter }}/>*/}
          </Form.Item>


          <Form.Item
            name="duty"
            label="岗位职责"
            rules={[
              { required: true, message: '请输入职位人数' }
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }}/>
          </Form.Item>
          <Form.Item
            name="requier"
            label="应职要求"
            rules={[
              { required: true, message: '请输入职位描述' }
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }}/>
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
