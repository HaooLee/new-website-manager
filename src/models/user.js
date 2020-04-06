import { getUserInfo, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      name:'lihao'
    },
    isFirstLogin: false,
    AuthMap: {
      '1': '超级管理员',
      '2': '管理员',
      '3': '普通用户',
    },
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
      const { ret, data } = yield call(getUserInfo);
      if (ret === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
  },
};
export default UserModel;
