import React, { Component } from 'react'
import { getConfig, saveConfig } from '@/services/config';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;

import styles from './index.less'

areas.forEach(area => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code
    });
  }
});

cities.forEach(city => {
  const matchProvince = provinces.filter(
    province => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children
    });
  }
});

const address = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children
}));

export default class NewsList extends Component {

   onFinish = values => {
    console.log('Success:', values);
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
          name="job"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="address"
            label="职位城市"
            rules={[
              { type: 'array', required: true, message: '请选择职位城市' },
            ]}
          >
            <Cascader options={address} expandTrigger="hover" showSearch={{ filter: this.filter }}/>
          </Form.Item>

          <Form.Item
            name="position"
            label="职位名称"
            rules={[
              { required: true, message: '请输入职位名称' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="职位类别"
            rules={[
              { required: true, message: '请输入职位类别' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="职位人数"
            rules={[
              { required: true, message: '请输入职位人数' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="招聘部门"
            rules={[
              { required: true, message: '请输入招聘部门' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="职位描述"
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
