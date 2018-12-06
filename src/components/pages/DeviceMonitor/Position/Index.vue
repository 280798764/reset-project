<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>工厂列表</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper" @keyup.enter="searchTab">
      <div class="filter-line">
        <label class="app-name-dev special-first">工厂名</label><input type="text" v-model="params.facName">
        <div class="func-btns-wrapper search-reset">
          <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
        </div>
      </div>
    </section>
    <!--tab标签-->
    <section class="list-wrapper custom-scroll scroll">
      <custom-table :thead="thead2" :tbody="tbody" :scroll="true">
        <template slot="item" slot-scope="props">
          <td><div>{{props.item.facName}}</div></td>
          <td><div>{{props.item.provinceName}}{{props.item.cityName}}{{props.item.facAddress}}</div></td>
          <td><div>{{props.item.cityName}}</div></td>
          <td class="operations-td wid-100px">
            <div class="operations flex-center">
              <div class="btn btn-detail" @click="IndexUpOrDown()">查看</div>
            </div>
          </td>
        </template>
      </custom-table>
      <div style="margin: 20px auto" class="pageStyle">
        <div class="left">
          <span>跳转至</span>
          <input type="text" v-model.trim="pageNo" v-on:blur="jumpTo" v-on:keyup.enter="jumpTo">
          <span>页</span>
        </div>
        <Page :total="pageInfo.totalPageCount" :page-size="10" :current="pageInfo.pageNo" @on-change="changepage" class="Page"/>
        <div class="total-pages">
          <span>共</span>
          <span class="count">{{pageInfo.totalPageCount}}</span>
          <span>页</span>
        </div>
      </div>
    </section>
    <section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
import mixinsInfo from '@/utils/mixinsInfo'
const thead = ['工厂名称', '使用权', '联网总数', '已联网', '等待联网', '联网进度', '接入业务', '操作']
const thead2 = ['工厂名称', '连线设备数', '地址', '操作']
export default {
  mixins: [mixinsTable, mixinsInfo],
  data () {
    return {
      pageNo: 1, // 页码
      total: '', // 总数
      thead: thead,
      thead2: thead2,
      tbody: [],
      todayHappen: '',
      todaySolve: '',
      tabCmd: 'a:position/getFactoryBasics',
      params: {
        facName: '' // 工厂名
      },
      dlgInfo: { // 弹框信息
        showDlg: false,
        type: ''
      }
    }
  },
  created () {
    this.pageInfo.totalCount = Number(this.total)
  },
  mounted () {
    // this.exceptionCount()
    this.getTableList(this.tabCmd, this.params)
  },
  methods: {
    jumpTo () {
      this.pageChange()
    },
    pageChange () {
      this.pageNo = Number(this.pageNo)
      let pages = Math.ceil(Number(this.pageInfo.totalPageCount) / 10)
      if (this.pageNo > pages || this.pageNo <= 0) {
        this.alert('请输入正确的页码！', 'error')
      } else {
        this.pageInfoReq.page = this.pageNo
        this.pageInfo.page = +this.pageNo
        this.getTableList(this.Cmd, this.params)
      }
    },
    changepage (index) {
      this.pageInfoReq.page = index
      this.getTableList(this.tabCmd, this.params)
      this.pageNo = index
    },
    searchTab () {
      this.pageInfoReq.page = 1
      this.pageNo = 1
      this.getTableList(this.tabCmd, this.params)
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
  .pageStyle {
    display: flex;
    margin: 20px 0;
    padding: 0 50px;
    .Page {
      min-width: 30%;
      margin: 0 auto;
      ul {
        float: right;
      }
    }
    .left {
      float: left;
      input {
        margin: 0 12px;
        width: 50px;
        height: 24px;
        color: #B2B2B2;
        text-align: center;
        outline: none;
        border: 1px solid #C9C9C9;
        border-radius: 20px;
      }
    }
    .total-pages {
      display: inline-flex;
      margin-left: 42px;
      line-height: 24px;
      .count {
        margin: 0 11px;
      }
    }
  }
</style>
