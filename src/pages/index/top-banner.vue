<template>
  <view class="top-banner">
    <lark-lazy-image
      container-class="image-container"
      mode="aspectFill"
      src="https://s3.bmp.ovh/imgs/2022/01/35f7f3ec144d82e7.png"
    />
    <!-- <view class="tag">广告</view> -->
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
.top-banner {
  width: 100vw;
  height: 188px;
  position: absolute;
  top: 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 43px;
    background: linear-gradient(1turn, #eef1f3, hsla(0, 0%, 100%, 0));
    z-index: 1;
    pointer-events: none;
  }

  .image-container {
    width: 100%;
    height: 100%;
  }
  .banner-item {
    position: relative;
  }
  .tag {
    position: absolute;
    right: 0px;
    top: -18px;
    line-height: 36px;
    height: 36px;
    font-size: 20px;
    z-index: 1;
    transform: scale(0.5);
    transform-origin: right bottom;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid #fff;
    border-bottom-left-radius: 14px;
    padding-left: 15px;
    padding-right: 15px;
    font-weight: 300;
  }
}
</style>
