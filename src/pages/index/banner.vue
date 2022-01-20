<template>
  <view class="top-banner">
    <swiper
      :init-page="state.page"
      :loop="true"
      auto-play="3000"
      direction="horizontal"
      :pagination-visible="true"
      style="height: 100%;"
    >
      <swiper-item>
        <image
          class="image"
          src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
          alt=""
          mode="widthFix"
        />
      </swiper-item>
      <swiper-item>
        <image
          class="image"
          src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"
          alt=""
          mode="widthFix"
        />
      </swiper-item>
      <swiper-item>
        <image
          class="image"
          src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
          alt=""
          mode="widthFix"
        />
      </swiper-item>
      <swiper-item>
        <image
          class="image"
          src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
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
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
