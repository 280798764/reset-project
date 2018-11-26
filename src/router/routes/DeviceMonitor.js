/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const ExceptionState = resolve => require(['@/components/pages/DeviceMonitor/ExceptionState/Index'], resolve)
const Position = resolve => require(['@/components/pages/DeviceMonitor/Position/Index'], resolve)
const TenacyMonitoring = resolve => require(['@/components/pages/DeviceMonitor/TenacyMonitoring/Index'], resolve)
const TotalDevice = resolve => require(['@/components/pages/DeviceMonitor/TotalDevice/Index'], resolve)

const routes = [
  {
    path: '/DeviceMonitor',
    component: layout,
    children: [
      {
        path: 'ExceptionState/index',
        component: ExceptionState
      },
      {
        path: 'Position/index',
        component: Position
      },
      {
        path: 'TenacyMonitoring/index',
        component: TenacyMonitoring
      },
      {
        path: 'TotalDevice/index',
        component: TotalDevice
      }
    ]
  }
]

export default routes
