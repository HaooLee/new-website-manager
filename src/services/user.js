import request from '@/utils/request';

const token = localStorage.getItem('access_token')

export async function query() {
  return request('/api/users');
}

export async function getUserInfo() {
  return request(`/user/info?access_token=${token}`);
}

export async function getUserList() {
  return request(`/user/list?access_token=${token}`);
}

export async function changeUserpassword(params) {
  return request('/user/update_password', {
    method: 'POST',
    data: {
      ...params,
      access_token: token,
    },
  });
}

export async function deleteUser(params) {
  return request('/user/delete', {
    method: 'POST',
    data: {
      ...params,
      access_token: token,
    },
  });
}

export async function addUser(params) {
  return request('/user/add', {
    method: 'POST',
    data: {
      ...params,
      access_token: token,
    },
  });
}


export async function queryNotices() {
  return request('/api/notices');
}
