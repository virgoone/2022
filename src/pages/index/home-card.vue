<template>
  <view class="home-card">
    <nut-grid :border="false">
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/1.svg" />
          </view>
          <text class="icon-text">境外返乡人员登记</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/2.svg" />
          </view>
          <text class="icon-text">境内返乡人员登记</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/3.svg" />
          </view>
          <text class="icon-text">紧急疫情排查登记</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/4.svg" />
          </view>
          <text class="icon-text">观察监测记录报送</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/6-2.svg" />
          </view>
          <text class="icon-text">服务中心</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/5.svg" />
          </view>
          <text class="icon-text">村内小事</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/7.svg" />
          </view>
          <text class="icon-text">出入登记</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/8.svg" />
          </view>
          <text class="icon-text">个人信息</text>
        </view>
      </nut-grid-item>
      <nut-grid-item>
        <view class="icon">
          <view class="icon-image">
            <image src="https://cdn.ugc.marryto.me/2022/icon/9-1.svg" />
          </view>
          <text class="icon-text">扫一扫</text>
        </view>
      </nut-grid-item>
    </nut-grid>
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
.home {
  &-card {
    background: linear-gradient(180deg, #fff 80%, #e9f5fe);
    box-shadow: 0 4px 12px 0 rgb(28 32 63 / 8%);
    border-radius: 12px;
    margin: 0 12px;
    padding: 6px 14px 14px;
    overflow: hidden;
    border: 2px solid #fff;

    .nut-grid-item__content {
      background-color: transparent;
    }

    .icon {
      text-align: center;

      &-image {
        width: 48px;
        height: 48px;
        padding: 5px;

        image {
          width: 100%;
          height: 100%;
        }
      }
      &-text {
        color: #666666;
        font-size: 12px;
        line-height: 1.5;
        word-break: break-all;
        white-space: pre-wrap;
        margin: 8px 0 0 0;
      }
    }
  }
}
</style>
