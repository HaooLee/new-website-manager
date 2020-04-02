import React from 'react'
import { connect } from 'dva';
import styles from './mobilePersonalHeader.less'
import router from 'umi/router';
// import { Avatar } from 'antd';
import Avatar from '@/components/GlobalHeader/AvatarDropdown'

class MobileHeader extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }


  handleClick = () => {
    const { dispatch, collapsed } = this.props
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
  }

  handleBackClick = e => {
    router.goBack()
  }

  render() {
    const {
      children,
      currentUser,
      authMap,
      route: {
        name,
      },
    }
      = this.props
    return (
      <div style={{ position: 'relative' }}>
        <div className={styles.mobileHeader}>
          <div className={styles.bar}>
            <img className={styles.back} src={require('../../assets/back.png')} alt=""
                 onClick={this.handleBackClick}/>
            <p className={styles.title}>{name}</p>
            <i></i>
          </div>
          <div style={{
            marginLeft: 30,
            display: 'flex',
            height: 90,
            alignItems: 'center',
          }}>
            <Avatar />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 10,
            }}>
              <span style={{ fontSize: 15 }}>{currentUser.username}</span>
              <span style={{ fontSize: 12 }}>{authMap[currentUser.groupid]}</span>
            </div>
          </div>
        </div>
        <div className={styles.scrollWrap} ref={this.ref} id="scrollDom">
          {children}
        </div>
      </div>
    )
  }
}

export default connect(({ global, settings, user }) => {
  return {
    currentUser: user.currentUser,
    authMap: user.AuthMap,
    collapsed: global.collapsed,
    ...settings,
  }
})(MobileHeader)
