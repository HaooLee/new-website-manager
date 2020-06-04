import request from '@/utils/request';
import {stringify} from 'qs'


export async function getCategoryList() {
  return request(`/newsCategory/getList`, {
    method: 'GET',
  });
}
export async function getCategoryDetail(id) {
  return request(`/newsCategory/getInfo?id=${id}`, {
    method: 'GET'
  });
}

export async function createCategory(params) {
  return request('/newsCategory/create', {
    method: 'POST',
    data:{...params}
  });
}


export async function updateCategory(params) {
  return request('/newsCategory/updateInfo', {
    method: 'POST',
    data:{...params}
  });
}


