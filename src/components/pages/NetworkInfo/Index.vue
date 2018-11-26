/* 这里是页面备注 */
<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span> 联网概况</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper" @keyup.enter="searchTab">
      <div class="filter-line">
        <label>所有权</label>
        <div class="select-wrapper reset-w">
          <Select clearable v-model="ownerNameIdList">
            <Option v-for="item in ownerNameIdList" :value="item.ownerNameId" :key="item.ownerNameId">{{item.ownerName}}</Option>
          </Select>
        </div>
        <label>使用权</label>
        <div class="select-wrapper reset-w">
          <Select clearable v-model="userNameIdList">
            <Option v-for="item in userNameIdList" :value="item.userNameId" :key="item.userNameId">{{item.userName}}</Option>
          </Select>
        </div>
        <label class="app-name-dev special-first">设备序列号</label><input type="text">
      </div>
      <div class="filter-line">
        <label>业务类型</label>
        <div class="select-wrapper">
          <Select clearable v-model="userRightTypeMap">
            <Option v-for="item in userRightTypeMap" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <label>联网进度</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in networkScheduleList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <div class="func-btns-wrapper search-reset">
          <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
        </div>
      </div>
    </section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>基本指标</span>
    </div>
    <section>
      <!--tab标签-->
      <section class="nav-tab">
        <template>
          <Tabs value="name4" @on-click="tabClick">
            <TabPane :label="`联网完成设备(${finishedNum})`" name="name1">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.mtNo}}</div></td>
                    <td><div>{{props.item.typeName}}</div></td>
                    <td><div>{{props.item.leaveDate}}</div></td>
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.userName}}</div></td>
                    <td><div>{{props.item.userRightType}}</div></td>
                    <td class="operations-td wid-100px">
                      <div class="operations flex-center">
                        <div class="btn btn-detail" @click="IndexUpOrDown()">备注</div>
                      </div>
                    </td>
                  </template>
                </custom-table>
                <div style="margin: 0 auto; width: 60%;">
                  <!--<Page :total="totalElements" show-total />-->
                </div>
                <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
              </section>
            </TabPane>
            <TabPane :label="`等待联网设备(${waitingNum})`" name="name2">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.mtNo}}</div></td>
                    <td><div>{{props.item.typeName}}</div></td>
                    <td><div>{{props.item.leaveDate}}</div></td>
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.userName}}</div></td>
                    <td><div>{{props.item.userRightType}}</div></td>
                    <td class="operations-td wid-100px">
                      <div class="operations flex-center">
                        <div class="btn btn-detail" @click="IndexUpOrDown()">备注</div>
                      </div>
                    </td>
                  </template>
                </custom-table>
                <div style="margin: 0 auto; width: 60%;">
                  <!--<Page :total="totalElements" show-total />-->
                </div>
                <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
              </section>
            </TabPane>
            <TabPane :label="`平台联网设备（累计）(${totalNum})`" name="name3">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.mtNo}}</div></td>
                    <td><div>{{props.item.typeName}}</div></td>
                    <td><div>{{props.item.leaveDate}}</div></td>
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.userName}}</div></td>
                    <td><div>{{props.item.userRightType}}</div></td>
                    <td class="operations-td wid-100px">
                      <div class="operations flex-center">
                        <div class="btn btn-delete right" @click="IndexUpOrDown()">下架</div>
                      </div>
                    </td>
                  </template>
                </custom-table>
                <div style="margin: 0 auto; width: 60%;">
                  <!--<Page :total="totalElements" show-total />-->
                </div>
                <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
              </section>
            </TabPane>
            <TabPane :label="`客户数(${customerNum})`" name="name4">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.useRightOwnerName}}</div></td>
                    <td><div>{{props.item.count}}</div></td>
                    <td><div>{{props.item.networkSchedule}}</div></td>
                    <td><div>{{props.item.waitingNum}}</div></td>
                    <td><div>{{props.item.networkSchedule}}</div></td>
                    <td><div>{{props.item.type}}</div></td>
                    <td class="operations-td wid-100px">
                      <div class="operations flex-center">
                        <div class="btn btn-detail" @click="IndexUpOrDown()">设备列表</div>
                      </div>
                    </td>
                  </template>
                </custom-table>
                <div style="margin: 0 auto; width: 60%;">
                  <!--<Page :total="totalElements" show-total />-->
                </div>
                <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
              </section>
            </TabPane>
          </Tabs>
        </template>
      </section>
      <!--<section class="nav-tab">
        <Tabs v-model="selectName" @on-click="tabClick">
          <Tab-pane :label="`默认列表()`" key="key1" name="name5"></Tab-pane>
          <Tab-pane :label="`联网完成设备()`" key="key5" name="name1"></Tab-pane>
          <Tab-pane :label="`等待联网设备()`" key="key2"></Tab-pane>
          <Tab-pane :label="`平台联网设备（累计）()`" key="key3"></Tab-pane>
          <Tab-pane :label="`客户数()`" key="key4"></Tab-pane>
        </Tabs>
      </section>-->
      <!-- 表单展示 -->
      <section class="table-wrapper">
      </section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
import mixinsInfo from '@/utils/mixinsInfo'
const thead = ['所有权', '使用权', '联网总数', '已联网', '等待联网', '联网进度', '接入业务', '操作']
const thead2 = ['设备序列号', '型号', '添加时间', '所有权', '使用权', '获取方式', '操作']
export default {
  mixins: [mixinsTable, mixinsInfo],
  data () {
    return {
      totalElements: '', // 总数据
      selectName: '',
      thead: thead,
      thead2: thead2,
      tbody: [],
      ownerNameIdList: [], // 所有权,
      userNameIdList: [], // 使用权,
      userToken: sessionStorage.getItem('userToken'),
      params: {
        businessId: '',
        mtNo: '',
        networkSchedule: '',
        ownerId: '',
        userId: ''
      },
      tabCmd: 'a:networkProfile/networkingList',
      finishedNum: '', // 联网完成设备
      waitingNum: '', // 等待联网设备
      totalNum: '', // 平台联网设备
      customerNum: '' // 客户数
    }
  },
  mounted () {
    this.getCount()
    this.getUserNameIdList()
    this.getOwnerNameIdList()
    this.getTableList(this.tabCmd, this.params)
  },
  methods: {
    getCount () {
      this.$store.dispatch('a:networkProfile/networking', {}).then(
        res => {
          this.finishedNum = res.finishedNum
          this.waitingNum = res.waitingNum
          this.totalNum = res.totalNum
          this.customerNum = res.customerNum
        }
      )
    },
    tabClick (name) {
      if (name === 'name4') {
        this.tabCmd = 'a:networkProfile/networkingList'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name1') {
        this.tabCmd = 'a:networkProfile/finishEquipments'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name2') {
        this.tabCmd = 'a:networkProfile/waitingEquipments'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name3') {
        this.tabCmd = 'a:networkProfile/onlineEquipments'
        this.getTableList(this.tabCmd, this.params)
      }
    },
    // 查询
    searchTab () {
    },
    // 获取使用权
    getUserNameIdList () {
      this.$store.dispatch('a:networkProfile/userNameIdList', {}).then(
        res => {
          this.userNameIdList = res || []
        }
      )
    },
    // 获取所有权
    getOwnerNameIdList () {
      this.$store.dispatch('a:networkProfile/ownerNameIdList', {}).then(
        res => {
          this.ownerNameIdList = res || []
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/demoPageOne/Index.less';
  .reset-w {
    width: 200px;
  }
</style>
