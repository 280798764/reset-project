/* 联网概况 */
import ajax from '@/utils/ajax'

const actions = {
  /* 01 联网概况-所有权 */
  'a:networkProfile/ownerNameIdList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/userAndOwner/ownerNameIdList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 02 联网概况-使用权 */
  'a:networkProfile/userNameIdList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/userAndOwner/userNameIdList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 03 联网概况--默认首页列表 */
  'a:networkProfile/networkingList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking/list',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 04 联网概况--联网完成设备 */
  'a:networkProfile/finishEquipments' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking/finishEquipments',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 06 联网概况--平台联网设备(累计) */
  'a:networkProfile/onlineEquipments' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking/onlineEquipments',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 05 联网概况--平台联网设备（累计） */
  'a:networkProfile/waitingEquipments' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking/waitingEquipments',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 06 联网概况--客户数 */
  'a:networkProfile/networkingLists' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking/list',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  },
  /* 06 联网概况--每个列表的总数 */
  'a:networkProfile/networking' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/equMonitor/networking',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  }
}

export default {
  actions
}
