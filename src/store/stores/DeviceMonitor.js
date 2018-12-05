/* 联网概况 */
import ajax from '@/utils/ajax'

const actions = {
  /* 01 设备监控-所有列表总数 */
  'a:DeviceMonitor/exceptionCount' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/exception/exceptionCount',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 01 异常预警-使用权 */
  'a:ExceptionState/userNameIdList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/userAndOwner/userNameIdList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 02 异常预警-异常类型 */
  'a:ExceptionState/exceptionTypeList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/exception/exceptionTypeList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 03 异常预警-获取列表 */
  'a:ExceptionState/exceptionList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/exception/exceptionList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  }
}

export default {
  actions
}
