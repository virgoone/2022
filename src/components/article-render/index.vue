<template>
  <view class="article-content">
    <nut-skeleton
      width="320px"
      height="20px"
      :title="false"
      :loading="loading"
      animated
      row="13"
    >
      <block :key="index" v-for="(item, index) in content">
        <rich-text :nodes="item" />
      </block>
    </nut-skeleton>
  </view>
</template>

<script lang="ts">
import { Himalaya, parse, stringify } from 'himalaya'

export default {
  props: {
    article: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  methods: {
    dealWithElement(
      element: Himalaya.HTMLElement | Himalaya.TextElement
    ): Himalaya.HTMLElement | Himalaya.TextElement {
      if (element.type === 'element') {
        if (element.tagName === 'figure') {
          element.tagName = 'div'
        }

        if (!element.attributes) {
          element.attributes = []
        }
        const classAttr = `himalaya-article-parse-${element.tagName}`
        const classIndex = element.attributes.findIndex(
          (attr) => attr.key === 'class'
        )
        if (classIndex < 0) {
          element.attributes.push({
            key: 'class',
            value: classAttr,
          })
        } else {
          element.attributes[classIndex].value =
            `${element.attributes[classIndex].value} ` + classAttr
        }

        const attrs = element.attributes.filter((attr) => attr.key !== 'style')

        return {
          ...element,
          attributes: attrs,
          children: element.children.map(this.dealWithElement),
        }
      } else {
        return element
      }
    },
    renderArticle(contentHTML: string) {
      const elements = parse(contentHTML)
      return elements.map((element) => {
        const node = this.dealWithElement(element)
        const html = stringify([node])

        return html
      })
    },
  },
  computed: {
    content() {
      const content = this.renderArticle(this.article)
      return content
    },
  },
}
</script>

<style lang="scss">
.article-content {
  padding: 0px 20px;
  font-size: 16px;
  text-align: left;
  color: #25222d;
  line-height: 1.75;
  word-break: break-all;

  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB,
    Microsoft Yahei, Arial, sans-serif;

  .skeleton .content .blockClass {
    &:nth-of-type(4n),
    &:first-of-type {
      margin-left: 15px;
    }
    &:nth-of-type(3n) {
      margin-bottom: 18px;
      width: 240px !important;
    }
    &:nth-of-type(4n) {
      margin-bottom: 10px;
      width: 300px !important;
    }

    &:nth-of-type(5n) {
      margin-top: 15px;
      width: 200px !important;
    }
  }

  .himalaya-article-parse {
    &-p {
      font-size: 16px;
      font-weight: 400;
      margin: 0 0 20px 0;
    }
    &-h2 {
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      margin-top: 56px;
      margin-bottom: 24px;
    }

    &-hr {
      margin: 20px auto;
      border: none;
      border-top: 1px solid #e5e5e5;
      height: 0;
    }

    &-a {
      border-bottom: 1px solid #893128;
      color: #dbdbdb;
      text-decoration: none;
      transition: all 0.2s;
    }

    &-code {
      background-color: #f4f4f4;
      display: inline-block;
      word-break: break-all;
    }

    &-div {
      margin: 56px 0;
    }

    &-ul {
      margin: 24px auto 32px auto;
      padding-left: 50px;
      padding-right: 0;
      list-style-type: disc;
      box-sizing: border-box;
    }

    &-li {
      margin: 10px 0;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 31px;
      color: #4c4e4d;
    }

    &-img {
      width: 100% !important;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
