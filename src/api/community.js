import request from '@/utils/request'

export function getCommunityStatistics(data) {
  return request({
    url: '/statistics/signing/communityStatistics',
    method: 'POST',
    data
  })
}

export function getCommunityStatisticsListics(data) {
  return request({
    url: '/statistics/signing/communityStatisticsList',
    method: 'POST',
    data
  })
}
