<template>
  <view class="form-page">
    <nut-noticebar class="notice-bar">
      漯河市新冠肺炎疫情防控指挥部提醒您：
      请据实填报信息，如有不实或错报，后果自负
    </nut-noticebar>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item
        label="姓名"
        prop="name"
        required
        :rules="[
          { required: true, message: '请填写姓名' },
          {
            regex: /(?:[\u4e00-\u9fa5·]{2,16})/,
            message: '请填写正确的姓名',
          },
        ]"
      >
        <input
          class="nut-input-text"
          @blur="customBlurValidate('name')"
          v-model="formData.name"
          placeholder="请输入姓名（必填）"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="手机号"
        prop="tel"
        required
        :rules="[
          { required: true, message: '请填写手机号' },
          { regex: /^\d{11}$/, message: '手机号格式不正确' },
        ]"
      >
        <input
          class="nut-input-text"
          v-model="formData.tel"
          @blur="customBlurValidate('tel')"
          placeholder="请输入手机号（必填）"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="身份证号"
        prop="idcard"
        required
        :rules="[
          { required: true, message: '请填写身份证号' },
          {
            regex:
              /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)$/,
            message: '身份证号格式不正确',
          },
        ]"
      >
        <input
          class="nut-input-text"
          v-model="formData.idcard"
          @blur="customBlurValidate('idcard')"
          placeholder="请输入身份证号（必填）"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        prop="address"
        label="来源地区"
        required
        class="address-item"
        :rules="[{ required: true, message: '请选择现来源地区' }]"
      >
        <Address
          :value="formData.address?.addressStr"
          @change="onAddressChange"
        />
      </nut-form-item>
      <view class="form-block">
        <nut-form-item
          label="详细住址"
          prop="detailAddress"
          required
          :rules="[{ required: true, message: '请填写详细住址' }]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('detailAddress')"
            v-model="formData.detailAddress"
            placeholder="请填写详细住址（必填）"
          />
        </nut-form-item>
      </view>

      <nut-form-item
        label="返程方式"
        prop="returnWay.type"
        required
        :rules="[{ required: true, message: '请选择返程方式' }]"
      >
        <nut-radiogroup
          direction="horizontal"
          v-model="formData.returnWay.type"
        >
          <block :key="index" v-for="(item, index) in returnWay.typeData">
            <nut-radio :label="item">{{ item }}</nut-radio>
          </block>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item
        label="车次/航班/车牌"
        prop="returnWay.way"
        required
        label-width="240rpx"
        v-show="formData.returnWay.type !== '其他'"
        :rules="[{ required: true, message: '请填写车次/航班/车牌信息' }]"
      >
        <input
          class="nut-input-text"
          v-model="formData.returnWay.way"
          @blur="customBlurValidate('formData.returnWay.way')"
          placeholder="请输入（必填）"
          type="text"
        />
      </nut-form-item>

      <view class="form-block" v-show="formData.returnWay.type === '其他'">
        <nut-form-item
          label="返程交通方式"
          prop="returnWay.extra"
          required
          :rules="[
            {
              required: formData.returnWay.type === '其他',
              message: '请填写回乡交通方式',
            },
          ]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('formData.returnWay.extra')"
            v-model="formData.returnWay.extra"
            placeholder="请填写返乡交通方式（必填）"
          />
        </nut-form-item>
      </view>
      <nut-form-item
        label="返乡日期"
        prop="returnWay.date"
        required
        :rules="[{ required: true, message: '请选择返乡日期' }]"
      >
        <picker
          mode="date"
          header-text="请选择返乡日期"
          :value="formData.returnWay.date"
          @change="onReturnWayDateChange"
        >
          <view
            class="input-normal"
            :class="{ active: !!formData.returnWay.date }"
          >
            {{ formData.returnWay.date || '请选择返乡日期（必填）' }}
          </view>
        </picker>
      </nut-form-item>

      <nut-form-item
        prop="nextAddress"
        label="居住地址"
        required
        class="address-item"
        :rules="[{ required: true, message: '居住地址' }]"
      >
        <Address
          :value="formData.nextAddress?.addressStr"
          @change="onNextAddressChange"
        />
      </nut-form-item>
      <view class="form-block">
        <nut-form-item
          label="详细居住地址"
          prop="nextDetailAddress"
          required
          :rules="[{ required: true, message: '请填写详细居住地址' }]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('nextDetailAddress')"
            v-model="formData.nextDetailAddress"
            placeholder="请填写详细住址（必填）"
          />
        </nut-form-item>
      </view>
    </nut-form>
    <nut-button
      class="submit-button"
      type="primary"
      size="large"
      @click="submit"
      block
      >提交申报</nut-button
    >
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { ref, reactive } from 'vue'
import Address from './address.vue'

export default {
  setup() {
    const formData = reactive({
      name: '',
      idcard: '',
      tel: '',
      address: {},
      detailAddress: '',
      nextAddress: {},
      nextDetailAddress: '',
      returnWay: {
        type: '',
        extra: '',
        date: '',
        way: '',
      },
    })
    const validate = (item: any) => {
      console.log(item)
    }
    const ruleForm = ref<any>(null)

    const submit = async () => {
      const { valid, errors } = await ruleForm.value.validate()
      if (valid) {
        Taro.showLoading({
          title: '提交中',
        })
        const {
          address,
          detailAddress,
          nextAddress,
          nextDetailAddress,
          returnWay,
          ...extraData
        } = formData
        const data = {
          ...extraData,
          return_way: returnWay,
          source_address: {
            ...address,
            detailAddress,
          },
          next_address: {
            ...nextAddress,
            detailAddress: nextDetailAddress,
          },
        }
        const result = await Taro.cloud.callFunction({
          name: 'wx_form_info',
          data,
        })
        Taro.hideLoading()
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        })
        console.log('保存提交>>>', result)
        Taro.reLaunch({
          url: '/pages/index/index',
        })
      } else {
        console.log('error submit!!', errors)
      }
    }
    const reset = () => {
      ruleForm.value.reset()
    }
    // 失去焦点校验
    const customBlurValidate = (prop: string) => {
      ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
        if (valid) {
          console.log('customBlurValidate success', formData)
        } else {
          console.log('customBlurValidate error submit!!', errors)
        }
      })
    }
    return {
      ruleForm,
      formData,
      validate,
      customBlurValidate,
      submit,
      reset,
    }
  },
  data() {
    return {
      returnWay: {
        show: false,
        typeData: ['自驾', '火车', '飞机', '汽车', '其他'],
      },
    }
  },
  components: {
    Address,
  },
  methods: {
    openReturnWayPicker() {
      this.returnWay.show = true
    },
    confirmReturnWay(val: any) {
      this.formData.returnWay = val
      this.returnWay.show = false
    },
    onAddressChange(value) {
      this.formData.address = value
      this.customBlurValidate('address')
    },
    onNextAddressChange(value) {
      this.formData.nextAddress = value
      this.customBlurValidate('nextAddress')
    },
    onReturnWayDateChange(event) {
      this.formData.returnWay.date = event.detail.value
    },
  },
}
</script>

<style lang="scss">
.form-page {
  padding: 50px 15px;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f7f8fa;
  padding-bottom: calc(15px + env(safe-area-inset-bottom));
  position: relative;

  .input-normal {
    color: #666;

    &.active {
      color: #333;
    }
  }

  .form-block {
    .nut-form-item {
      display: block;
    }

    .nut-form-item__label {
      width: 50%;
    }

    .nut-form-item__body {
      margin-top: 15px;
      .textarea {
        background: #f7f8fa;
      }
    }
  }

  .notice-bar {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .nut-form-item__label.required::before,
  .nut-form-item__body__tips {
    color: #fa2c19;
  }
  .nut-form-item.error.line::before {
    border-bottom-color: #fa2c19;
  }
  .nut-radio__icon {
    color: #498bf7;
  }
  .nut-form-item__body__slots .nut-input-text,
  .nut-input-text {
    color: #000;
  }
  .submit-button {
    margin-top: 20px;
  }
  .template_hidden {
    display: none;
  }
}
</style>
