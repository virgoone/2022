<template>
  <view class="home-card">
    <nut-grid :border="false">
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
      <nut-grid-item icon="dongdong" text="文字"></nut-grid-item>
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
    background-color: #fff;
    overflow: hidden;
    border: 2px solid #fff;
  }
}
</style>
