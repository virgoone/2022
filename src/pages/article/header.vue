<template>
  <view class="header">
    <nut-skeleton
      width="250px"
      height="24px"
      :title="false"
      :loading="this.loading"
      animated
      row="2"
    >
      <view class="header-title">{{ this.title }}</view>
      <view class="meta-box">
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
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 24px;

  &-title {
    font-size: 22px;
    margin: 0;
    font-weight: 400;
  }

  .meta-box {
    position: relative;
    font-size: 14px;
    color: #8a8a8a;

    .author {
      font-weight: 400;
    }
  }
}
</style>
