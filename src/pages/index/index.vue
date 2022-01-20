<template>
  <view class="home">
    <view class="banner-placeholder" />
    <Banner />
    <view class="home-content">
      <HomeCard />

      <view>
        <NumberDisplay />
        <NumberSubmit />
        <nut-button type="primary">nutui</nut-button>
      </view>
    </view>
  </view>
</template>

<script>
import NumberDisplay from '../../components/NumberDisplay.vue'
import NumberSubmit from '../../components/NumberSubmit.vue'
import Banner from './banner.vue'
import HomeCard from './home-card.vue'

export default {
  name: 'Index',
  data: () => ({
    state: {
      page: 0,
    },
  }),
  components: {
    NumberDisplay,
    NumberSubmit,
    Banner,
    HomeCard,
  },
}
</script>

<style lang="scss">
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .banner-placeholder {
    pointer-events: none;
    height: 132px;
  }

  &-content {
    padding-top: 8px;
    padding-bottom: 50px;
    padding-bottom: calc(50px + env(safe-area-inset-bottom));
    position: relative;
    z-index: 1;
  }
}
</style>
