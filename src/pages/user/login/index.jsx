import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button,Tabs } from 'antd';
import styles from './style.less';
const { TabPane } = Tabs;



@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
  };

  onFinish = values => {
    this.handleSubmit(values)
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  handleSubmit = (values) => {
    const { type } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        ...values,
      },
    });
  };

  render() {
    const inputStyle = {
      width: 315,
      height: 40,
      borderRadius: 28,
      textIndent: '1em',
    }
    return (
      <div className={styles.main}>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="SSO登录" key="1">
            <Button href={"/login"} type={'primary'} style={{marginBottom:30,marginTop:10}}>通过SSO登录</Button>
          </TabPane>
          <TabPane tab="账号登录" key="2">
            <Form
              name="login"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              scrollToFirstError
              className="login-form">
              <Form.Item
                name="username"
                rules={[{
                  required: true,
                  message: '请输入账户名称!',
                }]}
              >
                <Input
                  placeholder="账户"
                  style={inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{
                  required: true,
                  message: '请输入账户密码',
                }]}
              >
                <Input
                  type="password"
                  placeholder="密码"
                  style={inputStyle}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>,

      </div>
    )
  }
}

export default Login;
