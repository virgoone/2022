<template>
  <view class="banner">
    <view class="banner-swiper">
      <view class="banner-loading" v-show="loading">
        <nut-icon
          name="loading1"
          color="#3A8AF2"
          size="20"
          class="nut-icon-am-rotate nut-icon-am-infinite"
        />
      </view>
      <swiper
        :current="page"
        circular="true"
        autoplay="true"
        interval="5000"
        direction="horizontal"
        style="height: 100%"
      >
        <block :key="item._id" v-for="item in banners">
          <swiper-item class="banner-item">
            <view class="image-container">
              <lark-lazy-image
                container-class="image-container"
                :src="item.image"
                mode="scaleToFill"
              />
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts">
import { getBanners } from '../../api/banner'
export default {
  mounted() {
    getBanners()
      .then((data) => {
        console.log('middle banners->', data)
        this.banners = data
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  data() {
    return {
      page: 0,
      loading: true,
      banners: [],
    }
  },
}
</script>

<style lang="scss">
.banner {
  margin: 8px 12px 0 12px;
  text-align: center;
  height: 120px;
  background: #fff;
  box-shadow: 0 4px 12px 0 rgb(28 32 63 / 8%);
  overflow: hidden;
  border-radius: 12px;
  position: relative;

  &-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    z-index: 1;
  }

  &-swiper {
    width: 100%;
    height: 100%;
  }

  .image-container {
    width: 100%;
    height: 100%;
  }

  &-item {
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
