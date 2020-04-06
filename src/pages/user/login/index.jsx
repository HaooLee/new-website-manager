import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import styles from './style.less';

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
      </div>
    )
  }
}

export default Login;
