<template>
  <block>
    <view
      class="input-normal"
      :class="{ active: !!state.address }"
      @click="show"
      >{{ state.address || '请选择地区（必填）' }}</view
    >
    <!-- nut-address -->
    <nut-address
      v-model:visible="state.show"
      :province="state.province"
      :city="state.city"
      :country="state.country"
      :town="state.town"
      @change="onChange"
      @close="onClose"
      custom-address-title="请选择所在地区"
    ></nut-address>
  </block>
</template>
<script lang="ts">
import Taro from '@tarojs/taro'
import { getAddress } from '../../utils/address'
export default {
  props: ['value'],
  data() {
    return {
      cityList: {},
      countryList: {},
      streetList: {},
      selected: {
        province: {},
        city: {},
        country: {},
        town: {},
      },
      state: {
        show: false,
        address: '',
        province: [
          {
            id: '110000',
            name: '北京市',
          },
          {
            id: '410000',
            name: '河南省',
          },
          {
            id: '440000',
            name: '广东省',
          },
          {
            id: '150000',
            name: '内蒙古自治区',
          },
          {
            id: '230000',
            name: '黑龙江省',
          },
          {
            id: '650000',
            name: '新疆维吾尔自治区',
          },
          {
            id: '420000',
            name: '湖北省',
          },
          {
            id: '210000',
            name: '辽宁省',
          },
          {
            id: '370000',
            name: '山东省',
          },
          {
            id: '610000',
            name: '陕西省',
          },
          {
            id: '310000',
            name: '上海市',
          },
          {
            id: '520000',
            name: '贵州省',
          },
          {
            id: '500000',
            name: '重庆市',
          },
          {
            id: '540000',
            name: '西藏自治区',
          },
          {
            id: '340000',
            name: '安徽省',
          },
          {
            id: '350000',
            name: '福建省',
          },
          {
            id: '430000',
            name: '湖南省',
          },
          {
            id: '460000',
            name: '海南省',
          },
          {
            id: '320000',
            name: '江苏省',
          },
          {
            id: '630000',
            name: '青海省',
          },
          {
            id: '450000',
            name: '广西壮族自治区',
          },
          {
            id: '640000',
            name: '宁夏回族自治区',
          },
          {
            id: '330000',
            name: '浙江省',
          },
          {
            id: '130000',
            name: '河北省',
          },
          {
            id: '810000',
            name: '香港特别行政区',
          },
          {
            id: '710000',
            name: '台湾省',
          },
          {
            id: '820000',
            name: '澳门特别行政区',
          },
          {
            id: '620000',
            name: '甘肃省',
          },
          {
            id: '510000',
            name: '四川省',
          },
          {
            id: '360000',
            name: '江西省',
          },
          {
            id: '120000',
            name: '天津市',
          },
          {
            id: '530000',
            name: '云南省',
          },
          {
            id: '140000',
            name: '山西省',
          },

          {
            id: '220000',
            name: '吉林省',
          },
        ],
        city: [],
        country: [],
        town: [],
      },
    }
  },
  methods: {
    async getAddress(parentId: string) {
      await Taro.showLoading({
        title: '加载城市中...',
      })

      const { city, country, street } = await getAddress(parentId)

      this.cityList = city.get(parentId)
      this.countryList = country
      this.streetList = street
      await Taro.hideLoading()
    },
    triggerChange(changedValue) {
      // Should provide an event to pass value to Form.
      this.$emit('change', changedValue)
    },
    show() {
      this.state.show = !this.state.show
      if (this.state.show) {
        this.state.address = ''
        this.triggerChange('')
      }
    },
    onClose({ data }: any) {
      this.selected = data
      this.triggerChange(data)
      
    },
    async onChange({ next, value }: any) {
      if (next === 'city') {
        if (this.selected.province.id !== value.id) {
          this.state.city = []
        }
        this.selected.province = value
        await this.getAddress(value.id)
        this.state.city = this.cityList
      } else if (next === 'country') {
        if (this.selected.city.id !== value.id) {
          this.state.country = []
        }
        this.selected.city = value
        this.state.country = this.countryList.get(value.id)
      } else if (next === 'town') {
        if (this.selected.country.id !== value.id) {
          this.state.town = []
        }
        this.selected.country = value
        this.state.town = this.streetList.get(value.id)
      }
      const nextState = this.state[next]
      if (nextState?.length < 1) {
        this.state.show = false
      }
    },
  },

  watch: {
    value(val = '') {
      this.state.address = val
    },
  },
}
</script>
<style lang="scss">
.input-normal {
  color: #666;

  &.active {
    color: #333;
  }
}

.nut_cell__value {
  color: #333;
}
.nut-address__header {
  margin-top: 15px;
}
.nut-address {
  .custom-address {
    padding-bottom: 10px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom));
  }
}
</style>
