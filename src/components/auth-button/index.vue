<template>
  <button
    hoverClass="none"
    class="auth-button button-class"
    open-type="getUserInfo"
    onGetUserInfo="handleGetUserInfo"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: ['button-class'],
  methods: {
    handleGetUserInfo(data) {
      const { userInfo } = data.detail
      if (userInfo) {
        console.log('auth getUserInfo>', userInfo)
        this.$emit('click', userInfo)
      }
    },
  },
}
</script>

<style lang="scss">
.auth-button {
  position: relative;
  padding: 0;
  background: transparent;

  &,
  &::after {
    border: none;
  }

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
