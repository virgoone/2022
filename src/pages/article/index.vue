<template>
  <view class="article-page">
    <Header :title="news.title" :author="news.author" :loading="loading" />
    <Poster :poster="news.poster" />
    <Content :article="news.content" :loading="loading" />
  </view>
</template>

<script lang="ts">
import { getNewsBySid } from '../../api/news'

import Poster from './poster.vue'
import Content from './content.vue'
import Header from './header.vue'

export default {
  name: 'Article',
  mounted() {
    getNewsBySid('about-face-coverings')
      .then((data) => {
        console.log('news->', data)
        this.news = data
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  data: () => ({
    news: {},
    loading: true,
    state: {
      page: 0,
    },
  }),
  components: {
    Poster,
    Content,
    Header,
  },
}
</script>

<style lang="scss"></style>
