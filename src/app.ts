import { createApp } from 'vue'
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Grid,
  GridItem,
  Skeleton,
  Avatar,
  Empty,
} from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'

// 定制化主题必须使用 scss
import '@nutui/nutui-taro/dist/styles/themes/default.scss'
import store from './store'

import './app.scss'

const App = createApp({
  onShow(options) {
    Taro.cloud.init({ env: 'production-5gzqzgqif7265fd5', traceUser: true })
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {},
      })
      .then((res) => {
        console.log('res', res)
      })
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
  .use(Button)
  .use(Input)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Grid)
  .use(GridItem)
  .use(Skeleton)
  .use(Avatar)
  .use(Empty)

export default App
