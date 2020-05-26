import request from '@/utils/request';
import {stringify} from 'qs'


export async function getNewsList(params) {
  return request(`/news/getinfo?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function deleteNews(nid) {
  return request('/news/delete', {
    method: 'POST',
    data: {nid},
  });
}

export async function publishNews(params) {
  return request('/news/publish', {
    method: 'POST',
    data: params,
  });
}


export async function getNewsDetail(nid) {
  return request('/news/detail', {
    method: 'POST',
    data: {nid},
  });
}

export async function updateNewsDetail(params) {
  return request('/news/update', {
    method: 'POST',
    data: params,
  });
}

export async function createNews(params) {
  return request('/news/create', {
    method: 'POST',
    data: params,
  });
}



export async function gitNewsInfo(nid) {
  return request('/news/info/1', {
    method: 'POST'
  });
}

