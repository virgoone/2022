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
    <view class="fixed-footer">
      <view class="terms-policy">
        <checkbox-group @change="onAgreeChange">
          <checkbox :checked="formData.agree"> </checkbox>
        </checkbox-group>

        我已阅读并同意
        <view class="link" @click="onTermsClick('terms')"> 《服务政策》 </view>
        和
        <view class="link" @click="onTermsClick('policy')"> 《用户协议》 </view>
      </view>
      <nut-button
        class="submit-button"
        type="primary"
        size="large"
        @click="submit"
        block
        >提交申报</nut-button
      >
    </view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { ref, reactive } from 'vue'
import Address from './address.vue'
import { saveFormInfo } from '../../api/form-info'

export default {
  setup() {
    const formData = reactive({
      name: '',
      tel: '',
      address: {},
      detailAddress: '',
      nextAddress: {},
      nextDetailAddress: '',
      agree: false,
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
    const reset = () => {
      ruleForm.value.reset()
    }
    const submit = async () => {
      const { valid, errors } = await ruleForm.value.validate()

      if (valid) {
        if (!formData.agree) {
          Taro.showToast({
            title: '请阅读并同意《服务政策》和《用户协议》',
            icon: 'none',
          })
          return
        }
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
          _createTime: Date.now(),
          _updateTime: Date.now(),
        }
        const result = await saveFormInfo(data as any)
        Taro.hideLoading()
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        })
        console.log('保存提交>>>', result)
        reset()
        setTimeout(() => {
          Taro.reLaunch({
            url: '/pages/index/index',
          })
        }, 2000)
      } else {
        Taro.showToast({
          title: '请检查必填项',
          icon: 'none',
        })
        console.log('error submit!!', errors)
      }
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
    const onAgreeChange = (e) => {
      console.log('e.detail.value', e.detail.value)
      formData.agree = e.detail.value?.length > 0 ? true : false
    }

    return {
      ruleForm,
      formData,
      validate,
      customBlurValidate,
      submit,
      reset,
      onAgreeChange,
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
    onTermsClick(type: string) {
      Taro.navigateTo({
        url: `/pages/article/index?sid=${type}`,
      })
    },
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
  padding-bottom: 100px;
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
  position: relative;

  .fixed-footer {
    position: fixed;
    z-index: 99;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 15px;
    padding-bottom: calc(env(safe-area-inset-bottom));

    .terms-policy {
      font-size: 12px;
      color: #94949e;
      letter-spacing: 0;
      display: flex;
      margin-bottom: 12px;
      height: 20px;
      align-items: center;

      .wx-checkbox-input {
        width: 12px;
        height: 12px;
        margin: 0;
        padding: 0;
        margin-right: 5px;
      }

      .link {
        color: #498bf7;
        text-decoration: underline;
        &:hover {
          color: #333;
        }
      }
    }
  }
  .nut-button--round {
    border-radius: 6px;
  }
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
  .template_hidden {
    display: none;
  }
}
</style>
