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
  Form,
  FormItem,
  Cell,
  CellGroup,
  Address,
  Elevator,
  Popup,
  NoticeBar,
  Radio,
  RadioGroup,
  TextArea,
} from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'

// 定制化主题必须使用 scss
import '@nutui/nutui-taro/dist/styles/themes/default.scss'
import store from './store'

import './app.scss'

const App = createApp({
  onShow(options) {
    // @ts-ignore
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
  .use(store)
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
  .use(Form)
  .use(FormItem)
  .use(Cell)
  .use(CellGroup)
  .use(Address)
  .use(Elevator)
  .use(Popup)
  .use(NoticeBar)
  .use(Radio)
  .use(RadioGroup)
  .use(TextArea)

export default App
