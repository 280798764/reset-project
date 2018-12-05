<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>基本指标</span>
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
            <Option v-for="item in networkScheduleList" :value="item.id" :key="item.id">{{item.name}}</Option>
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
      <span> 实时监控</span>
    </div>
    <section>
      <!--tab标签-->
      <section class="nav-tab">
        <template>
          <Tabs value="name1" @on-click="tabClick">
            <TabPane :label="`今日异常发生(${todayHappen})`" name="name1">
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
      thead: thead,
      thead2: thead2,
      tbody: [],
      todayHappen: '',
      todaySolve: '',
      waitingSolveCount: '',
      userNameIdList: [],
      userRightTypeMap: [],
      networkScheduleList: []
    }
  },
  mounted () {
    this.exceptionCount()
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less" scoped>
  .reset-w {
    width: 200px;
  }
</style>
