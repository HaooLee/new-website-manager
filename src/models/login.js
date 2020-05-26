import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { Login, getFakeCaptcha } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { Toast } from 'antd-mobile';

import {docCookies} from '@/utils/utils.js'

const Model = {
    namespace: 'login',
    state: {
      ret: undefined,
    },
    effects: {
      * login({ payload }, { call, put, select }) {
        const response = yield call(Login, payload);
        const authMap = yield select(({ user }) => user.AuthMap)
        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            // currentAuthority: authMap[response.data.groupid],
            currentAuthority: authMap[1],
          },
        }); // Login successfully
        //暂无登录接口
       // if (response.status === 200) {
       //    localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('access_token', "testtesttesttesttesttesttest")
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }

          yield put(routerRedux.replace(redirect || '/'));
        // } else {
        //   Toast
        //     .info(response.msg)
        // }
      },
      * getCaptcha({ payload }, { call }) {
        yield call(getFakeCaptcha, payload);
      },

      * logout(_, { put,call }) {
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: {
        //     ...response,
        //     // currentAuthority: authMap[response.data.groupid],
        //    // currentAuthority: authMap[1],
        //   },
        // });
        docCookies.removeItem('_ga')
        window.location.href = '/logout';
        // const { redirect } = getPageQuery(); // redirect
        //
        // if (window.location.pathname !== '/user/login' && !redirect) {
        //   yield put(
        //     routerRedux.replace({
        //       pathname: '/user/login',
        //       search: stringify({
        //         redirect: window.location.href,
        //       }),
        //     }),
        //   );
        // }
      },
    },
    reducers: {
      changeLoginStatus(state, { payload }) {
        // setAuthority(payload.currentAuthority);
        return {
          ...state
        };
      },
    },
  }
;
export default Model;
