import { getUserInfo, query as queryUsers } from '@/services/user';
import { setAuthority } from '@/utils/authority';

const AuthMap =  {
  '1': '超级管理员',//测试用
  '5': '管理员',
  '3': '普通用户',
}

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      username:'',
      power: 0
    },
    isFirstLogin: false,
    AuthMap
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchUserInfo(_, { call, put }) {
      const { code, data } = yield call(getUserInfo);
      if (code === '200') {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      setAuthority(AuthMap[action.payload.power]);
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
  },
};
export default UserModel;
