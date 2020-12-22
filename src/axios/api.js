import { get, post } from './axios.js'
export default {
  // 登录
  login (params) {
    return post('doLogin', params)
  },
  getOrderInfo (params) {
    return get('getOrderInfo', params)
  },
  getProManageBadDetail (params) {
    return get('getProManageBadDetail', params)
  },
  // 生产记录
  getProManageProRecordMenu (params) {
    return get('getProManageProRecordMenu', params)
  },
  // 不良记录
  getProManageBadDetailRepair (params) {
    return get('getProManageBadDetailRepair', params)
  },
  selectBadPassRate(params) {
    return get('selectBadPassRate', params)
  },
  selectBadCauseNum(params) {
    return get('selectBadCauseNum', params)
  },
  // 出入库
  getStoragePutInDetail (params) {
    return get('getStoragePutInDetail', params)
  },
  getStoragePutOut (params) {
    return get('getStoragePutOut', params)
  },
  getStoragePutOutDetail (params) {
    return get('getStoragePutOutDetail', params)
  },
  getProcedureCheckOrder (params) {
    return get('getProcedureCheckOrder', params)
  },
  getProManageDetailImageRecord (params) {
    return get('getProManageDetailImageRecord', params)
  },
  getDataMsj (params) {
    return get('getDataMsj', params)
  },
  getDataXxcs (params) {
    return get('getDataXxcs', params)
  },
  getDataZzjz (params) {
    return get('getDataZzjz', params)
  },
  getProManagePacking (params) {
    return get('getProManagePacking', params)
  }
}
