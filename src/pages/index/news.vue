<template>
  <view class="news">
    <view class="title">通知</view>
    <view class="content">
      <view class="item">
        <view class="link">漯河市关于进一步加强境外入漯返漯人员管理的通告</view>
      </view>
      <view class="item">
        <view class="link">外地返乡人员提前报备通知</view>
      </view>
      <view class="item">
        <view class="link">口罩佩戴最新官方指引</view>
      </view>
    </view>
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
  padding: 15px 16px;

  .title {
    font-size: 20px;
    font-weight: 600;
    color: #242729;
  }
  .content {
    height: 120px;
    background-color: white;
    box-shadow: 0 4px 12px 0 rgb(28 32 63 / 8%);
    border-radius: 12px;
    margin-top: 16px;
    padding: 14px;

    .item {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      padding-left: 12px;
      padding-bottom: 12px;
      position: relative;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: #0023ff;
        border-radius: 50%;
        opacity: 1;
        position: absolute;
        top: 8px;
        left: 4px;
      }

      &:not(:last-child) {
        margin-bottom: 16px;

        &::after {
          content: '';
          width: 100%;
          height: 1px;
          background: #bcc6cf;
          opacity: 0.4;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      .link {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
