import tool from '@/utils/tool'
import filters from '@/utils/filters'

export default {
  data () {
    return {
      roleType: '', // 登录角色
      pageType: 'add', // 页面类型：添加、编辑、展示
      levelOneId: '', // 一层页面id (单子id)
      levelTwoId: '', // 二层页面id
      levelThreeId: '', // 三层页面id
      firstLabelWid: '65px', // 第一列的标签宽度
      clientInputWid: '350px', // 客户名称的宽度
      isShowOperate: false, // 是否显示备件列表的编辑类按钮（编辑、删除）
      downloading: false, // 是否正在下载
      addPartIng: false, // 是否正在执行添加操作并跳转中
      canSaveFlag: true // 防止多次保存
    }
  },
  computed: {
    // 参数列表集合
    enumParams () { return tool.getEnumParams() },
    // 申请单状态码
    applyStatusList () { return this.enumParams.applyStatus },
    // 申请方式
    applyTypeDetailList () { return this.enumParams.applyTypeDetail },
    // 申请单申请类别
    applyTypeList () { return this.enumParams.applyType },
    // 申请单申请类别 商务类
    applyTypeBusinessList () { return this.enumParams.applyTypeBusiness },
    // 需求单状态
    requireStatusList () { return this.enumParams.requireStatus },
    // 送修单状态码
    sendToRepairStatusList () { return this.enumParams.sendToRepairStatus },
    // 保修状态
    warrantyStatusList () { return this.enumParams.warrantyStatus },
    // 更换单状态
    replacementStatusList () { return this.enumParams.replacementStatus },
    // 更换单状态(审核专用)
    replacementStatusAuditList () { return this.enumParams.replacementStatusAudit },
    // 出库单状态
    stockOutStatusList () { return this.enumParams.stockOutStatus },
    // 出库单类型
    stockOutTypeList () { return this.enumParams.stockOutType },
    // 入库单状态
    stockInStatusList () { return this.enumParams.stockInStatus },
    // 出库 备件去向
    wherePartGoneList () { return this.enumParams.wherePartGone },
    // 返修单状态
    repairReturnStatusList () { return this.enumParams.repairReturnStatus },
    // 商务类型
    businessTypeList () { return this.enumParams.businessType },
    // 商务单状态
    businessStatusList () { return this.enumParams.businessStatus },
    // 商务单状态
    contractStatusList () { return this.enumParams.contractStatus },
    // 发货单状态
    stockDeliverList () { return this.enumParams.stockDeliverList },
    // 开发者类型
    appStates () { return this.enumParams.appStates },
    // 应用状态
    developType () { return this.enumParams.developType },
    // 支付方式
    paymentModes () { return this.enumParams.paymentModes },
    // 订单状态
    orderStates () { return this.enumParams.orderStates },
    // 订单-批量操作
    orderBatchOperation () { return this.enumParams.orderBatchOperation },
    // 订单-评价状态
    appraiseStates () { return this.enumParams.appraiseStates },
    // 财务管理-收款-处理状态
    treatmentStates () { return this.enumParams.treatmentStates },
    // 用户管理-是否绑定企业
    bindEnterprise () { return this.enumParams.bindEnterprise },
    // 认证状态
    certificationStates () { return this.enumParams.certificationStates },
    // 申请状态
    applicationStatus2 () { return this.enumParams.applicationStatus2 },
    // 申请状态2
    applicationStatus () { return this.enumParams.applicationStatus },
    // 用户管理-申请状态
    userApplicationStatus () { return this.enumParams.userApplicationStatus },
    // 申请类型
    applicantType () { return this.enumParams.applicantType },
    // 广告页
    adPage () { return this.enumParams.adPage },
    // 广告位
    adPlace () { return this.enumParams.adPlace },
    // 广告状态
    adStatus () { return this.enumParams.adStatus },
    // 订单咨询
    orderConsulting () { return this.enumParams.orderConsulting },
    // 交易流程说明
    transactionProcess () { return this.enumParams.transactionProcess },
    // 交易流程说明-二级目录
    transactionProcess2 () { return this.enumParams.transactionProcess2 },
    // 开发环境申请-物流信息
    typeLogistics () { return this.enumParams.typeLogistics },
    // 用户管理-绑定类型
    bindType () { return this.enumParams.bindType },
    // 帮助须知---所属平台
    platform () { return this.enumParams.platform }
  },
  created () {
    this.roleType = sessionStorage.getItem('roleType')
    this.levelOneId = sessionStorage.getItem('levelOneId')
    this.levelTwoId = sessionStorage.getItem('levelTwoId')
    this.levelThreeId = sessionStorage.getItem('levelThreeId')
    // 返回最顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  methods: {
    // 编辑按钮
    edit () {
      this.pageType = 'edit'
      sessionStorage.setItem('pageTypeLv1', 'edit')
      sessionStorage.setItem('pageTypeLv2', 'edit')
      // 部分页面（送修）
      this.loadMatching = true
    },
    // 添加备件按钮
    addPart (path) {
      if (!this.addPartIng) {
        this.addPartIng = true
        sessionStorage.removeItem('levelTwoId')
        sessionStorage.setItem('pageTypeLv2', 'add')
        // 第一次添加：保存0、提交1, 是否是添加按钮
        this.checkFields(0, true)
        setTimeout(() => {
          this.addPartIng = false
        }, 5000) // 理论上页面发生跳转，会重置该参数
      }
    },
    // 编辑备件按钮
    editPart (path) {
      // 编辑的场合
      sessionStorage.removeItem('levelTwoId')
      sessionStorage.setItem('pageTypeLv2', 'edit')
      this.$router.push(path)
    },
    // 编辑页面 保存按钮
    saveData () {
      // 防止多次提交
      if (this.canSaveFlag) {
        this.canSaveFlag = false
        this.checkFields(0, false)
        setTimeout(() => {
          this.canSaveFlag = true
        }, 5000)
      }
    },
    // 编辑页面 提交按钮
    submitData () {
      if (this.canSaveFlag) {
        this.canSaveFlag = false
        this.checkFields(1, false)
        setTimeout(() => {
          this.canSaveFlag = true
        }, 5000)
      }
    },
    // 直接调用接口, submitType: 保存0、提交1, addFlag: 添加按钮标识, path: 添加的场合跳转路径
    dispatchData (cmd, params, submitType, addFlag, path) {
      this.$store.dispatch(cmd, {...params, submit: submitType}).then(
        res => {
          if (addFlag) {
            sessionStorage.setItem('levelOneId', res)
            sessionStorage.removeItem('levelTwoId')
            sessionStorage.setItem('pageTypeLv1', 'edit')
            this.$router.push(path)
          } else {
            let msg = submitType === 1 ? '提交' : '保存'
            setTimeout(() => {
              this.$Modal.success({
                title: '提示',
                content: msg + '成功！',
                onOk: () => {
                  this.backForward() // 详情页跳转至列表页
                }
              })
            }, 300)
          }
        },
        rej => {
          this.clearNotice()
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 通用保存和成功后跳转方法
    saveDataCommon (cmd, params, cb) {
      this.$store.dispatch(cmd, params).then(
        res => {
          if (cb instanceof Function) {
            cb(res)
          } else {
            this.$Modal.success({
              title: '提示',
              content: '保存成功！',
              onOk: () => {
                this.backForward()
              }
            })
          }
        },
        rej => {
          this.clearNotice()
          this.alert('保存失败，' + rej.errorInfo, 'error')
        }
      )
    },
    // 导出公共方法
    exportFile (id, cmd) {
      if (!this.downloading) {
        this.downloading = true
        tool.downloadFileByIFrame(cmd + '?id=' + id + '&iToken=' + sessionStorage.getItem('token'))
        setTimeout(() => {
          this.downloading = false
        }, 3000)
      }
    },
    // 导出公共方法WMS
    exportFileWMS (id, cmd) {
      if (!this.downloading) {
        this.downloading = true
        tool.downloadFileByIFrame(cmd + '?id=' + id + '&iToken=' + sessionStorage.getItem('token'), 'wms')
        setTimeout(() => {
          this.downloading = false
        }, 3000)
      }
    },
    // 导出公共方法(带参数)
    exportFileWithParams (cmd, params) {
      if (!this.downloading) {
        let searchParams = ''
        for (let key in params) {
          if (params[key]) searchParams += '&' + key + '=' + params[key]
        }
        this.downloading = true
        tool.downloadFileByIFrame(cmd + '?iToken=' + sessionStorage.getItem('token') + searchParams)
        setTimeout(() => {
          this.downloading = false
        }, 3000)
      }
    },
    // 帮助须知-开始
    // 帮助须知-首页-获取页面的列表
    StairGetLists () {
      this.$store.dispatch('a:helpInformation/selectHelpMenu', this.params).then(
        res => {
          this.tbody = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        })
    },
    // 获取一级目录
    getStairCatalog (params) {
      this.$store.dispatch('a:helpInformation/selectHelpMenu', params).then(
        res => {
          this.stairList = res || []
          sessionStorage.setItem('stairList1', JSON.stringify(this.stairList))
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        })
    },
    // 获取二级目录
    getSecondCatalog (value) {
      this.getStairCatalogParams.parentId = value
      this.$store.dispatch('a:helpInformation/selectHelpMenu', this.getStairCatalogParams).then(
        res => {
          this.secondList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        })
    },
    stairChange (value) {
      this.getSecondCatalog(value)
    },
    // 帮助须知-结束
    // 应用管理-开始
    // 上下架事件
    upOrDown (id, shelfStatus, des) {
      sessionStorage.setItem('appUpOrDown', des)
      this.inDownUp = shelfStatus === 1 ? '下架' : '上架'
      this.paramsUp.idList = []
      this.paramsUp.idList.push(id)
      // this.dlgInfo.showDlg = true
      this.$Modal.confirm({
        title: '提示',
        content: `确认${this.downUp || this.inDownUp}应用${this.nameCn || this.name}？`,
        onOk: () => {
          this.putawayOrUnputaway()
        }
      })
    },
    // 上下架操作--掉接口
    putawayOrUnputaway () {
      if (this.downUp === '下架' || this.inDownUp === '下架') {
        this.path = 'unPublish'
      } else {
        this.path = 'publish'
      }
      this.$store.dispatch(`a:application/${this.path}`, this.paramsUp).then(
        res => {
          setTimeout(() => {
            this.$Modal.info({
              title: '提示',
              content: res,
              onOk: () => {
                this.dlgInfo.showDlg = false
                this.paramsUp.idList = []
                this.$router.push('/application/index')
                let appUpOrDown = sessionStorage.getItem('appUpOrDown')
                if (appUpOrDown !== 'inDetail') {
                  this.search()
                }
              }
            })
          }, 300)
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 应用管理-结束
    // 订单管理-开始
    // 订单状态
    orderStatus (status) {
      switch (status) { // 10:已取消:13:审核未通过;20:未支付;21:已支付-待审核;30:支付完成-待评价;41:订单完成
        case 20:
          return '待付款'
        case 21:
          return '待审核'
        case 30:
          return '待评价'
        case 41:
          return '已完成'
        case 10:
          return '已取消'
        case 13:
          return '已驳回'
        default:
          return ''
      }
    },
    // 取消操作
    cancelOrder (id, type) {
      this.dlgInfo.showDlg = true
      this.paramsC.id = id
      this.paramsC.code = 10
      sessionStorage.setItem('out', type)
    },
    // 删除或取消操作
    deleteOrCancel () {
      this.$store.dispatch('a:order/operate', this.paramsC).then(
        res => {
          setTimeout(() => {
            this.$Modal.info({
              title: '提示',
              content: '取消成功！',
              onOk: () => {
                this.dlgInfo.showDlg = false
                this.paramsC.remark = ''
                let type = sessionStorage.getItem('out')
                this.$router.push('/order/index')
                // this.search()
                if (type === 'out') {
                  this.tabClick(this.curTabIndex)
                }
              }
            })
          }, 300)
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 订单管理-结束
    // 运营管理-开始
    // 获取群组-下拉
    getGroups () {
      // 获取下拉群组
      this.$store.dispatch('a:operations/getAllGroups', {groupName: ''}).then(
        res => {
          this.groups = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    }
    // 运营管理-结束
  },
  filters: {
    // 开发环境申请管理 -- 审核状态
    getStatus: filters.getStatus,
    // 财务管理-支付方式
    withdrawWay: filters.withdrawWay,
    // 开发者认证管理-----认证状态
    cerStatus: filters.cerStatus,
    //  获取证件类型
    cardType: filters.cardType,
    // 应用信息变更状态
    applyInfo: filters.applyInfo,
    // 付款方式
    payType: filters.payType
  }
}
