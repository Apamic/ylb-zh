import request from '@/utils/request'

export function getrealTime(data) {
  return request({
    url: '/statistics/realTime/statistics',
    method: 'POST',
    data
  })
}
