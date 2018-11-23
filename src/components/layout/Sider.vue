<template>
  <section>
    <navigation :navList="navList"></navigation>
  </section>
</template>

<script>
import { Navigation } from '@/components/modules'

const navList = [{
  name: '联网概况',
  icon: 'nav-apply-audit',
  isOpen: true,
  children: [
    {
      name: '联网统计',
      path: '/demo-page-one/index'
    }
  ]
},
{
  name: '设备监控',
  icon: 'nav-apply-audit',
  isOpen: true,
  children: [
    {
      name: '异常预警',
      path: '/demo-page-two'
    },
    {
      name: '实时监控',
      path: '/demo-page-two'
    },
    {
      name: '租赁监控',
      path: '/demo-page-two'
    },
    {
      name: '位置管理',
      path: '/demo-page-two'
    }
  ]
}]

export default {
  data () {
    return {
      navList: navList
    }
  },
  components: {
    Navigation
  }
}
</script>
