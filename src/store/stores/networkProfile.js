/* 联网概况 */
import ajax from '@/utils/ajax'

const actions = {
  /* 01 联网概况-所有权 */
  'a:networkProfile/userNameIdList' ({commit}, parameters) {
    return ajax.api({
      cmd: 'operation/userAndOwner/userNameIdList',
      parameters
    })
  }
}

export default {
  actions
}
