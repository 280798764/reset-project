/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const NetworkInfo = resolve => require(['@/components/pages/NetworkInfo/Index'], resolve)

const routes = [
  {
    path: '/NetworkInfo',
    component: layout,
    children: [
      {
        path: 'Index',
        component: NetworkInfo
      }
    ]
  }
]

export default routes
