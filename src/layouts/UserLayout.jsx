import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import { connect } from 'dva';
import styles from './UserLayout.less';
import logo from '../assets/logo.png'

const UserLayout = props => {
  console.log(props)
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title}/>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.header}>
        </div>
        <div className={styles.loginContent}>
          <img src={logo} alt=""/>
          <h2>官网管理后台</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
