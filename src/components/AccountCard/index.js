import React, { Component } from 'react'
import { Avatar, Button } from 'antd'
import { connect } from 'dva';
import styles from './index.less'

@connect(({ user }) => ({
    authMap: user.AuthMap,
  }
))
export default class AccountCard extends Component {

  static defaultProps = {
    avatar: 'http://j.bjdglt.com/avatar.png',
    userName: '小强',
    auth: 3,
    lastTime: '从未登陆',
    isActived: false,
  }

  render() {
    const { avatar, userName, auth, lastTime, isActived, authMap } = this.props
    return (
      <div className={styles.card}>
        <Avatar className={styles.avatar} size={40} src={avatar}/>
        <div className={styles.content}>
          <div className={styles.nameWrap}>
            <span>{userName}</span>
            {!isActived && <div className={styles.actived}>未激活</div>}
          </div>
          <div className={styles.auth}>{authMap[auth]}</div>
          <div className={styles.lastTime}>上次登录: {lastTime}</div>
          <div className={styles.footer}>
            <Button type="default" shape="round">修改权限</Button>
            <Button type="default" shape="round">编辑</Button>
            <Button type="default" shape="round">删除</Button>
          </div>
        </div>
      </div>
    )
  }
}
