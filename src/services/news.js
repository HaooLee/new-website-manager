import request from '@/utils/request';

export async function getNewsList(params) {
  return request('/news/getinfo', {
    method: 'POST',
    data: params,
  });
}

export async function deleteNews(nid) {
  return request('/news/delete', {
    method: 'POST',
    data: {nid},
  });
}

