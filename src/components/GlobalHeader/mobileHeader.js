import React from 'react'
import { connect } from 'dva';
import styles from './mobileHeader.less'
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

  render() {
    const { children, route: { name } } = this.props
    return (
      <div style={{ position: 'relative' }}>
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <img className={styles.logo} onClick={this.handleClick}
                 src={require('../../assets/menu.png')} alt=""/>
          </div>
          <span className={styles.title}>{name}</span>
          <div className={styles.avatarWrap}>
            <Avatar/>
            {/*<img style={{*/}
            {/*width: 40, */}
            {/*height: 40,*/}
            {/*borderRadius: '50',*/}
            {/*}} src="http://j.bjdglt.com/avatar.png" alt=""/>*/}
          </div>
        </div>
        <div className={styles.scrollWrap} ref={this.ref} id="scrollDom">
          {children}
        </div>
      </div>
    )
  }
}

export default connect(({ global, settings }) => {
  return {
    collapsed: global.collapsed,
    ...settings,
  }
})(MobileHeader)
