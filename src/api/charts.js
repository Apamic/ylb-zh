import request from '@/utils/request'

export function getAgeList(data) {
  return request({
    url: '/statistics/signing/ageList',
    method: 'POST',
    data
  })
}
export function getGenderList(data) {
  return request({
    url: '/statistics/signing/genderList',
    method: 'POST',
    data
  })
}
export function getCrowd(data) {
  return request({
    url: '/statistics/signing/crowd',
    method: 'POST',
    data
  })
}
