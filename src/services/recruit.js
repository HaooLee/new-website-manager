import request from '@/utils/request';
import {stringify} from 'qs'


export async function getRecruitList(params) {
  return request(`/recruit/getinfo?${stringify(params)}`, {
    method: 'GET',
  });
}
export async function getRecruitDetail(rid) {
  return request('/recruit/detail', {
    method: 'POST',
    data:{rid}
  });
}

export async function publishRecruit(params) {
  return request('/recruit/publish', {
    method: 'POST',
    data:{...params}
  });
}

export async function createRecruit(params) {
  return request('/recruit/create', {
    method: 'POST',
    data:{...params}
  });
}

export async function deleteRecruit(rid) {
  return request('/recruit/delete', {
    method: 'POST',
    data:{rid}
  });
}

export async function updateRecruit(params) {
  return request('/recruit/update', {
    method: 'POST',
    data:{...params}
  });
}


