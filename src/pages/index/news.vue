<template>
  <view class="news">
    <view class="news-title">通知</view>
    <view class="news-content">
      <nut-skeleton
        width="250px"
        height="22px"
        :title="false"
        :loading="loading"
        animated
        row="3"
      >
        <block :key="item._id" v-for="item in news">
          <view class="item">
            <view class="link">{{ item.title }}</view>
          </view>
        </block>
      </nut-skeleton>
    </view>
  </view>
</template>

<script lang="ts">
import { News, getNews } from '../../api/news'

export default {
  mounted() {
    const fields = {
      _id: true,
      title: true,
      order: true,
      sid: true,
    } as unknown as Record<keyof News, boolean>

    getNews(fields)
      .then((data) => {
        this.news = data
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  data: () => ({
    news: [],
    loading: true,
  }),
}
</script>

<style lang="scss">
.news {
  padding: 15px 16px;

  &-title {
    font-size: 20px;
    font-weight: 600;
    color: #242729;
  }
  &-content {
    height: 120px;
    background-color: white;
    box-shadow: 0 4px 12px 0 rgb(28 32 63 / 8%);
    border-radius: 12px;
    margin-top: 16px;
    padding: 14px;
    overflow: hidden;

    .skeleton {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .item {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      padding-left: 12px;
      padding-bottom: 12px;
      position: relative;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: #0023ff;
        border-radius: 50%;
        opacity: 1;
        position: absolute;
        top: 8px;
        left: 4px;
      }

      &:not(:last-child) {
        margin-bottom: 16px;

        &::after {
          content: '';
          width: 100%;
          height: 1px;
          background: #bcc6cf;
          opacity: 0.4;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      .link {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
