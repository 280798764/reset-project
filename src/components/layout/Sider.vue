<template>
  <section>
    <section class="nav-wrapper">
      <ul v-for="(nav, index) in navList" :key="index">
        <li class="parent" @click="toggleNav(index)">
          <i class="iconfont" :class="nav.icon"></i>
          <span>{{nav.label}}</span>
          <i class="iconfont" :class="nav.isOpen?'nav-arrow-up':'nav-arrow-down'"></i>
        </li>
        <li v-show="nav.label" v-for="(subnav, subIndex) in nav.pages" class="child" :key="subIndex">
          <router-link tag="div" :to="idToPath[subnav.url]">{{subnav.label}}</router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { Navigation } from '@/components/modules'
const idToPath = {
  '/NetworkInfo/RealtimeStat': '/NetworkInfo/index', // 联网统计
  '/DeviceMonitor/ExceptionState': '/DeviceMonitor/ExceptionState/index', // 异常预警
  '/DeviceMonitor/TotalDevice': '/DeviceMonitor/TotalDevice/index', // 实时监控
  '/DeviceMonitor/TenacyMonitoring': '/DeviceMonitor/TenacyMonitoring/index', // 租赁监控
  '/DeviceMonitor/Position': '/DeviceMonitor/Position/index' // 位置管理
}
export default {
  data () {
    return {
      navList: [],
      idToPath: idToPath
    }
  },
  components: {
    Navigation
  },
  created () {
    this.navList = JSON.parse(sessionStorage.getItem('navList'))
    console.log(this.navList, 'this.navList')
  },
  methods: {
    toggleNav (index) {
      this.navList.forEach((item, i) => {
        item.isOpen = index === i ? !item.isOpen : false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/modules/navigation.less';
</style>
