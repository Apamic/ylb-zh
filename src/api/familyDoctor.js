import request from '@/utils/request'

export function getTrend(data) {
  return request({
    url: '/statistics/signing/trend',
    method: 'POST',
    data
  })
}
export function getranking(data) {
  return request({
    url: '/statistics/signing/ranking',
    method: 'POST',
    data
  })
}
export function getGov(data) {
  return request({
    url: '/statistics/signing/govStatistics',
    method: 'POST',
    data
  })
}
export function getList(data) {
  return request({
    url: '/statistics/signing/govStatisticsList',
    method: 'POST',
    data
  })
}
