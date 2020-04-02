import request from '@/utils/request';
const token = localStorage.getItem('access_token')

export async function getConfig() {
  return request(`/conf/info?access_token=${token}`);
}
export async function saveConfig(params) {
  params.access_token = token
  return request('/conf/update', {
    method: 'POST',
    data: params,
  });
}
