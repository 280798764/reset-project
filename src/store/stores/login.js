/* 登录页 */
import ajax from '@/utils/ajax'

const actions = {
  /* 01 获取验证码 */
  'a:login/getImage' ({commit}, parameters) {
    return ajax.api({
      cmd: 'memberCenter/verifyImage/getImage',
      parameters
    })
  },
  /* 02 登录 */
  'a:login/login' ({commit}, parameters) {
    return ajax.api({
      cmd: 'memberCenter/user/login',
      parameters
    })
  },
  /* 03 获取权限列表 */
  'a:login/getMenus' ({commit}, parameters) {
    return ajax.api({
      cmd: 'authority/menus/getMenus',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  }
}

export default {
  actions
}
