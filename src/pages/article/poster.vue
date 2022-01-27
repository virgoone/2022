<template>
  <view v-if="this.poster" class="poster">
    <image class="image" src="{{this.poster}}" mode="widthFix" />
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
    width: 100%;
  }
}
</style>
