import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox } from 'antd';
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

  handleWillSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleSubmit(values)
      } else {
        // { userName: 'lihao', }
        // {
        //   password: 'lihao',
        // }
      }
    });
  }

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
    const { getFieldDecorator } = this.props.form
    const inputStyle = {
      width: 315,
      height: 40,
      borderRadius: 28,
      textIndent: '1em',
    }
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleWillSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: '请输入账户名称!',
              }],
            })(
              <Input
                placeholder="账户"
                style={inputStyle}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入账户密码',
              }],
            })(
              <Input
                type="password"
                placeholder="密码"
                style={inputStyle}
              />,
            )}
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

export default Form.create({})(Login);
