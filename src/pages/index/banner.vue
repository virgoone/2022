<template>
  <view class="banner">
    <swiper
      :init-page="state.page"
      :loop="true"
      auto-play="3000"
      direction="horizontal"
      :pagination-visible="true"
      style="height: 100%"
    >
      <swiper-item class="banner-item">
        <image
          class="image"
          src="https://cdn.ugc.marryto.me/2022/banner/WechatIMG238.jpeg?x-oss-process=image/resize,w_750/format,webp"
          alt=""
          mode="widthFix"
        />
      </swiper-item>
      <swiper-item class="banner-item">
        <image
          class="image"
          src="https://cdn.ugc.marryto.me/2022/banner/WechatIMG237.jpeg?x-oss-process=image/resize,w_750/format,webp"
          alt=""
          mode="widthFix"
        />
      </swiper-item>
    </swiper>
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
.banner {
  margin: 8px 12px 0 12px;
  text-align: center;
  height: 120px;
  box-shadow: 0 4px 12px 0 rgb(28 32 63 / 8%);
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
  }

  .banner-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>
