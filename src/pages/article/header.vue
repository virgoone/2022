<template>
  <view class="header">
    <nut-skeleton
      width="250px"
      height="15px"
      :title="false"
      :loading="this.loading"
      animated
      row="2"
    >
      <view class="header-title">{{ this.title }}</view>
      <view class="author-box">
        <view class="author">{{ this.author }}</view>
      </view>
    </nut-skeleton>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.header {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 24px;

  &-title {
    font-weight: 500;
    line-height: 160%;
    font-size: 22px;
    margin-bottom: 12px;
  }

  .author-box {
    position: relative;
    padding-right: 100px;
    margin-bottom: 24px;

    .author {
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
    }
  }
}
</style>
