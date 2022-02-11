<template>
  <view class="home-card">
    <nut-grid :border="false">
      <block :key="item.id" v-for="item in menuList">
        <nut-grid-item @click="onIconClick(item)">
          <view class="icon">
            <view class="icon-image">
              <image :src="item.image" :aria-label="item.title" />
            </view>
            <text class="icon-text" :aria-label="item.title">
              {{ item.title }}
            </text>
          </view>
        </nut-grid-item>
      </block>
    </nut-grid>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
export default {
  data: () => ({
    state: {
      page: 0,
    },
    menuList: [
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/1.svg',
        title: '境外返乡人员登记',
        url: '',
        visible: false,
        sort: 0,
        id: 1,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/2.svg',
        title: '境内返乡人员登记',
        url: `/pages/form/index?type=cn`,
        visible: true,
        sort: 1,
        id: 2,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/3.svg',
        title: '紧急疫情排查登记',
        url: '',
        visible: false,
        sort: 2,
        id: 3,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/4.svg',
        title: '居家健康监测记录',
        url: '/pages/health/form/index',
        visible: true,
        sort: 3,
        id: 4,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/6-2.svg',
        title: '服务中心',
        url: '',
        visible: false,
        sort: 4,
        id: 5,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/5.svg',
        title: '村内小事',
        url: '',
        visible: false,
        sort: 5,
        id: 6,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/7.svg',
        title: '出入登记',
        url: '',
        visible: false,
        sort: 6,
        id: 7,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/8.svg',
        title: '个人信息',
        url: '',
        visible: false,
        sort: 7,
        id: 8,
      },
      {
        image: 'https://cdn.ugc.marryto.me/2022/icon/9-1.svg',
        title: '扫一扫',
        url: '',
        visible: false,
        sort: 8,
        id: 9,
      },
    ].filter((item) => item.visible),
  }),
  methods: {
    onIconClick(item: any) {
      const { url } = item
      if (!url) {
        Taro.showToast({
          title: '开发中，敬请期待～',
          icon: 'none',
        })
        return
      }
      Taro.navigateTo({
        url:
          url.indexOf('?') > -1 ? `${url}&source=home` : `${url}?source=home`,
      })
    },
  },
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
