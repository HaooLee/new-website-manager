import request from '@/utils/request';
const token = localStorage.getItem('access_token')

export async function getReport(date) {
  return request(`/report/list?date=${date}&access_token=${token}`);
}

