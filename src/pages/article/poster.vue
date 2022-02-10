<template>
  <view v-if="this.poster" class="poster">
    <lark-lazy-image
      container-class="image-container"
      mode="widthFix"
      width="750"
      height="285"
      :src="this.poster"
    />
  </view>
</template>

<script>
export default {
  props: {
    poster: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.poster {
  margin: 10px 20px;
  image {
    height: auto;
  }
  .image-container {
    width: 100%;
  }
}
</style>
