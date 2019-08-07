import request from '@/utils/request'

export function getSigningItemList(data) {
  return request({
    url: '/statistics/signing/signingItemList',
    method: 'POST',
    data
  })
}
