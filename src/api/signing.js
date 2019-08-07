import request from '@/utils/request'

export function getTeamStatistics(data) {
  return request({
    url: '/statistics/signing/teamStatistics',
    method: 'POST',
    data
  })
}

export function getTeamStatisticsList(data) {
  return request({
    url: '/statistics/signing/teamStatisticsList',
    method: 'POST',
    data
  })
}
