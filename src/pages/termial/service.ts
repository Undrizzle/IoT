import request from 'umi-request';
import { TableTermialParams } from './data.d';

export async function queryRule(params: TableTermialParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: TableTermialParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
