/* 常用过滤 */
const filters = {
  // 开发环境申请管理
  // 获取状态
  getStatus (status) { // 13:审核未通过;20:未支付;21:已支付-待审核;30:审核通过-待发货;31已发货-待确认收货;40已收货-待评价;41:订单完成
    switch (status) { // 13审核不通过，21-待审核，30审核通过-待发货，31已发货
      case 13:
        return '已驳回'
      case 21:
        return '待审核'
      case 30:
        return '待发货' // 已上架
      case 31:
        return '已发货' // 申请下架
      default:
        return ''
    }
  },
  // 财务管理-支付方式
  withdrawWay (withdrawWay) {
    switch (withdrawWay) {
      case 1:
        return '支付宝支付'
      case 2:
        return '微信支付'
      case 3:
        return '微信支付'
      case 4:
        return '支付宝支付'
      case 20:
        return '线下支付'
      case 21:
        return '对公账户'
      default:
        return ''
    }
  },
  // 开发者认证管理-----认证状态
  cerStatus (status) {
    switch (status) {
      case 1:
        return '待认证'
      case 2:
        return '认证通过'
      case 3:
        return '认证驳回'
      default:
        return ''
    }
  },
  //  获取证件类型
  cardType (cardType) {
    switch (cardType) {
      case '1':
        return '营业执照+税务登记证+组织机构代码证'
      case '2':
        return '三证合一'
      case '3':
        return '五证合一'
      default:
        return ''
    }
  },
  //  应用信息变更状态
  applyInfo (status) {
    switch (status) {
      case 10:
        return '待处理'
      case 20:
        return '申请通过'
      case 30:
        return '申请驳回'
      default:
        return ''
    }
  },
  //  付款方式
  payType (payType) {
    switch (payType) {
      case 1:
        return '支付宝支付'
      case 2:
        return '微信支付'
      case 3:
        return '微信支付'
      case 4:
        return '支付宝支付'
      case 20:
        return '线下支付'
      default:
        return ''
    }
  }
}

export default filters
