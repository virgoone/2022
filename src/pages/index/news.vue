<template>
  <view class="news">
    <view class="title">公告/通知</view>
    <view class="content">公告/通知</view>
  </view>
</template>

<script>
export default {
  data: () => ({
    state: {
      page: 0,
    },
  }),
}
</script>

<style lang="scss">
.news {
  padding: 10px;

  .title {
    font-size: 20px;
    color: #2a2d32;
  }
}
</style>
