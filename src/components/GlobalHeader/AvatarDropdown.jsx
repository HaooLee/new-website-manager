import { Avatar, Icon, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    router.push(`/account/${key}`);
  };

  handleAvatarClick = () => {
    router.push('/personalCenter');
  }

  render() {
    const {
      currentUser = {
        avatar: 'http://j.bjdglt.com/avatar.png',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user"/>
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting"/>
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider/>}

        <Menu.Item key="logout">
          <Icon type="logout"/>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <img
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#f5f5f5',
        }}
        onClick={this.handleAvatarClick}
        src={currentUser.avatar} alt=""/>
    )

    // currentUser && currentUser.name ? (
    //   <HeaderDropdown overlay={menuHeaderDropdown}>
    //     <span className={`${styles.action} ${styles.account}`}>
    //       <Avatar size="40" className={styles.avatar} src="http://j.bjdglt.com/avatar.png"
    //               alt="avatar"/>
    //       <span className={styles.name}>{currentUser.name}</span>
    //     </span>
    //   </HeaderDropdown>
    // ) : (
    // );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
