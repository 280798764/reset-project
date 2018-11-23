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
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <label>使用权</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <label class="app-name-dev special-first">设备序列号</label><input type="text">
        <label>业务类型</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
      </div>
      <div class="filter-line">
        <label>联网进度</label>
        <div class="select-wrapper">
          <Select clearable>
            <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
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
        <Tabs v-model="selectName" @on-click="tabClick">
          <Tab-pane :label="`默认列表()`" key="key1" name="name5"></Tab-pane>
          <Tab-pane :label="`联网完成设备()`" key="key5" name="name1"></Tab-pane>
          <Tab-pane :label="`等待联网设备()`" key="key2"></Tab-pane>
          <Tab-pane :label="`平台联网设备（累计）()`" key="key3"></Tab-pane>
          <Tab-pane :label="`客户数()`" key="key4"></Tab-pane>
        </Tabs>
      </section>
      <!-- 表单展示 -->
      <section class="table-wrapper">
        <section class="list-wrapper custom-scroll scroll">
          <custom-table :thead="thead" :tbody="tbody" :scroll="true">
            <template slot="item" slot-scope="props">
              <td><div class="icon"><img class="imgIcon" :src="props.item.icon + '?imageView2/1/w/105/h/60'"></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td><div></div></td>
              <td class="operations-td wid-100px">
                <div class="operations flex-center">
                  <div class="btn btn-delete right" @click="IndexUpOrDown()">下架</div>
                </div>
              </td>
            </template>
          </custom-table>
          <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
import mixinsInfo from '@/utils/mixinsInfo'
const thead = ['所有权', '使用权', '联网总数', '已联网', '等待联网', '联网进度', '接入业务', '操作']
export default {
  mixins: [mixinsTable, mixinsInfo],
  data () {
    return {
      selectName: '',
      thead: thead,
      tbody: [],
      userNameIdList: [] // 所有权
    }
  },
  mounted () {
    this.getUserNameIdList()
  },
  methods: {
    tabClick () {

    },
    // 查询
    searchTab () {
    },
    // 获取所有权
    getUserNameIdList () {
      this.$store.dispatch('a:networkProfile/userNameIdList', {}).then(
        res => {
          console.log(res, 'res')
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/demoPageOne/Index.less';
</style>
