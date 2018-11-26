/* 通用接口 */
import ajax from '@/utils/ajax'

const state = {
  username: ''
}

const mutations = {
  'm:common/setUsername' (state, username) {
    state.username = username
  },
  'm:common/changeNavList' (state, newVal) {
    let navList = newVal
    for (let item of navList) {
      item.isOpen = false
    }
    state.a = 1
    state.navList = navList
  }
}

const actions = {
  /* 根据token获取登陆信息 */
  'a:common/getAccountInfoByToken' ({commit}, params) {
    return ajax.api({
      cmd: 'xxxxxxx/common/loginInfo',
      parameters: params
    })
  },
  /* 省市区县 */
  'a:common/getDivisionList' ({commit}, params) {
    return ajax.api({
      cmd: 'xxxxxxxx/common/getDivisionList',
      parameters: params
    })
  }
}

export default {
  state,
  mutations,
  actions
}
