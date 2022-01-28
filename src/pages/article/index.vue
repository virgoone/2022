<template>
  <view class="article-page">
    <nut-empty
      v-if="(error || !news?._id) && !loading"
      image="error"
      :description="toastText"
    ></nut-empty>
    <block v-if="!error">
      <Header :title="news?.title" :author="news?.author" :loading="loading" />
      <Poster :poster="news?.poster" />
      <Content :article="news?.content" :loading="loading" />
    </block>
  </view>
</template>

<script lang="ts">
import Taro, { useRouter } from '@tarojs/taro'
import { getNewsBySid } from '../../api/news'

import Poster from './poster.vue'
import Content from './content.vue'
import Header from './header.vue'

export default {
  name: 'Article',
  mounted() {
    const router = useRouter()
    const { sid } = router.params
    if (!sid) {
      this.toastText = '加载错误，请检查参数'
      this.error = true
      Taro.setNavigationBarTitle({ title: this.toastText })
      return
    }
    Taro.setNavigationBarTitle({ title: '加载中...' })
    Taro.showNavigationBarLoading()
    getNewsBySid(sid)
      .then((data) => {
        this.news = data
        this.toastText = data?.title || '文章不存在或者已经被删除'
      })
      .catch((error) => {
        console.log('error', error)
        this.error = true
        this.toastText = '文章错误或不存在'
      })
      .finally(() => {
        this.loading = false
        Taro.hideNavigationBarLoading()
        Taro.setNavigationBarTitle({
          title: this.toastText,
        })
      })
  },
  data: () => ({
    news: {},
    loading: true,
    error: false,
    toastText: '',
  }),
  components: {
    Poster,
    Content,
    Header,
  },
}
</script>

<style lang="scss">
.article-page {
  padding-bottom: 15px;
  padding-bottom: calc(15px + env(safe-area-inset-bottom));
}
</style>
