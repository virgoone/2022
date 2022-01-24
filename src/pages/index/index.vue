<template>
  <view class="home">
    <view class="banner-placeholder" />
    <TopBanner />
    <view class="home-content">
      <HomeCard />
      <Banner />
      <News />
    </view>
  </view>
</template>

<script>
import TopBanner from './top-banner.vue'
import Banner from './banner.vue'
import HomeCard from './home-card.vue'
import News from './news.vue'

export default {
  name: 'Index',
  data: () => ({
    state: {
      page: 0,
    },
  }),
  components: {
    TopBanner,
    Banner,
    HomeCard,
    News,
  },
}
</script>

<style lang="scss">
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f3f5;

  .banner-placeholder {
    pointer-events: none;
    height: 132px;
  }

  &-content {
    padding-top: 8px;
    padding-bottom: 20px;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    position: relative;
    z-index: 1;
  }
  .drive {
    text-align: center;
    margin: 16px 0;
    width: 100%;
  }
}
</style>
