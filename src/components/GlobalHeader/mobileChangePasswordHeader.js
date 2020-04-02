import React from 'react'
import { connect } from 'dva';
import styles from './mobileChangePasswordHeader.less'
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
            <Avatar onClick={e=> router.push('/personalCenter')}/>
          </div>
          <div className={styles.logoWrap}>
            <img src="/logo-w.png" alt=""/>
            <h2></h2>
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
    collapsed: global.collapsed,
    ...settings,
  }
})(MobileHeader)
