<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>异常预警</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper" @keyup.enter="searchTab">
      <div class="filter-line">
        <label class="app-name-dev special-first">设备序列号</label><input type="text">
       <!-- <label>所有权</label>
        <div class="select-wrapper reset-w">
          <Select clearable v-model="ownerNameIdList">
            <Option v-for="item in ownerNameIdList" :value="item.ownerNameId" :key="item.ownerNameId">{{item.ownerName}}</Option>
          </Select>
        </div>-->
        <label>使用权</label>
        <div class="select-wrapper reset-w">
          <Select clearable v-model="userNameIdList">
            <Option v-for="item in userNameIdList" :value="item.userNameId" :key="item.userNameId">{{item.userName}}</Option>
          </Select>
        </div>
        <label>上报开始时间</label>
        <div class="select-wrapper">
          <Select clearable v-model="userRightTypeMap">
            <Option v-for="item in userRightTypeMap" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <label>上报结束时间</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in networkScheduleList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
      </div>
      <div class="filter-line">
        <label>异常类型</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in exceptionTypeList" :value="item.code" :key="item.code">{{item.value}}</Option>
          </Select>
        </div>
        <div class="func-btns-wrapper search-reset">
          <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
        </div>
        <div class="func-btns-wrapper search-reset">
          <div class="func-btn btn-search" @click="searchTab">导出</div>
        </div>
      </div>
    </section>
    <div class="page-title-wrapper">
      <span class="icon-title"></span>
      <span> 异常统计</span>
    </div>
    <section>
      <!--tab标签-->
      <section class="nav-tab">
        <template>
          <Tabs value="name1" @on-click="tabClick">
            <TabPane :label="`默认列表(${totalElements})`" name="name1">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.mtNo}}</div></td>
                    <td><div>{{props.item.mtType}}</div></td>
                    <td><div>{{props.item.happenTime}}</div></td>
                    <td><div>{{props.item.exceptionMsg}}</div></td>
                    <td><div>{{props.item.runTimeCompare}}秒</div></td>
                    <td><div>{{props.item.userName}}</div></td>
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.status}}</div></td>
                    <td><div>{{props.item.offlineTime}}</div></td>
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
            <TabPane :label="`今日异常发生(${todayHappen})`" name="name2">
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
            <TabPane :label="`今日异常解决(${todaySolve})`" name="name3">
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
            <TabPane :label="`待处理异常预警（截止当时）(${waitingSolveCount})`" name="name4">
              <section class="list-wrapper custom-scroll scroll">
                <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
                  <template slot="item" slot-scope="props">
                    <td><div>{{props.item.mtNo}}</div></td>
                    <td><div>{{props.item.mtType}}</div></td>
                    <td><div>{{props.item.happenTime}}</div></td>
                    <td><div>{{props.item.exceptionMsg}}</div></td>
                    <td><div>{{props.item.runTimeCompare}}秒</div></td>
                    <td><div>{{props.item.userName}}</div></td>
                    <td><div>{{props.item.ownerName}}</div></td>
                    <td><div>{{props.item.status}}</div></td>
                    <td><div>{{props.item.offlineTime}}</div></td>
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
          </Tabs>
        </template>
      </section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
import mixinsInfo from '@/utils/mixinsInfo'
const thead = ['所有权', '使用权', '联网总数', '已联网', '等待联网', '联网进度', '接入业务', '操作']
const thead2 = ['设备序列号', '型号', '上报时间', '异常描述', '重跑差异时长', '使用权', '所有权', '运行状态', '脱机时长', '操作']
export default {
  mixins: [mixinsTable, mixinsInfo],
  data () {
    return {
      totalElements: '',
      thead: thead,
      thead2: thead2,
      tbody: [],
      todayHappen: '',
      todaySolve: '',
      waitingSolveCount: '',
      userNameIdList: [], // 使用权
      exceptionTypeList: [], // 使用权
      tabCmd: 'a:ExceptionState/exceptionList'
    }
  },
  mounted () {
    this.exceptionCount()
    this.getUserType()
    this.getExceptionTypeList()
    this.getList()
    this.getTableList(this.tabCmd, this.params)
  },
  methods: {
    tabClick (name) {
      if (name === 'name1') {
        this.tabCmd = 'a:ExceptionState/exceptionList'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name2') {
        this.tabCmd = 'a:ExceptionState/getNowExceptionList'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name3') {
        this.tabCmd = 'a:ExceptionState/todaySolveList'
        this.getTableList(this.tabCmd, this.params)
      } else if (name === 'name4') {
        this.tabCmd = 'a:ExceptionState/waitingSolveList'
        this.getTableList(this.tabCmd, this.params)
      }
    },
    searchTab () {
    },
    exceptionCount () {
      this.$store.dispatch('a:DeviceMonitor/exceptionCount', {}).then(
        res => {
          this.todayHappen = res.todayHappen
          this.todaySolve = res.todaySolve
          this.waitingSolveCount = res.waitingSolveCount
        }
      )
    },
    getUserType () {
      this.$store.dispatch('a:ExceptionState/userNameIdList', {}).then(
        res => {
          this.userNameIdList = res || []
        },
        rej => {
        }
      )
    },
    getExceptionTypeList () {
      this.$store.dispatch('a:ExceptionState/exceptionTypeList', {}).then(
        res => {
          this.exceptionTypeList = res || []
        },
        rej => {
        }
      )
    },
    getList () {
      this.$store.dispatch('a:ExceptionState/exceptionList', {}).then(
        res => {
          this.tbody = res.content || []
        },
        rej => {
        }
      )
    },
    getNowExceptionList () {
      this.$store.dispatch('a:ExceptionState/getNowExceptionList', {}).then(
        res => {
          this.tbody2 = res.content || []
        },
        rej => {
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .reset-w {
    width: 200px;
  }
</style>
