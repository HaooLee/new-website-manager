import React from 'react'
import { connect } from 'dva';
import styles from './mobileAddAccountHeader.less'
import router from 'umi/router';
import { Avatar } from 'antd';
// import Avatar from '@/components/GlobalHeader/AvatarDropdown'

const authMap = {
  '1': 'admin',
  '2': '管理员',
}

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
            <p className={styles.title}>{name}</p>
            <img src={require('../../assets/add.png')} onClick={e=> router.push('/AddAccount')} alt=""/>
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
