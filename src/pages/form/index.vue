<template>
  <view class="form-page">
    <nut-noticebar class="notice-bar">
      漯河市新冠肺炎疫情防控指挥部提醒您：
      请据实填报信息，如有不实或错报，后果自负
    </nut-noticebar>
    <picker class="template_hidden"> </picker>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item
        label="姓名"
        prop="name"
        required
        :rules="[{ required: true, message: '请填写姓名' }]"
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
          { validator: asyncValidator, message: '手机号不正确' },
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
        prop="cardId"
        required
        :rules="[{ required: true, message: '请填写身份证号' }]"
      >
        <input
          class="nut-input-text"
          v-model="formData.cardId"
          @blur="customBlurValidate('cardId')"
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
        <Address @change="onAddressChange" />
      </nut-form-item>
      <view class="form-block">
        <nut-form-item
          label="详细住址"
          prop="detailAddress"
          required
          :rules="[{ required: true, message: '请填写来源详细住址' }]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('detailAddress')"
            v-model="formData.name"
            placeholder="请填写来源详细住址（必填）"
          />
        </nut-form-item>
      </view>

      <nut-form-item
        label="返程方式"
        prop="returnWay"
        required
        :rules="[{ required: true, message: '请选择返程方式' }]"
      >
        <nut-radiogroup direction="horizontal" v-model="formData.returnWay">
          <block :key="index" v-for="(item, index) in returnWay.typeData">
            <nut-radio :label="item">{{ item }}</nut-radio>
          </block>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item
        label="车次/航班/车牌"
        prop="way"
        required
        v-show="formData.returnWay !== '其他'"
        :rules="[{ required: true, message: '请填写车次/航班/车牌信息' }]"
      >
        <input
          class="nut-input-text"
          v-model="formData.way"
          @blur="customBlurValidate('way')"
          placeholder="请填写车次/航班/车牌信息（必填）"
          type="text"
        />
      </nut-form-item>

      <view class="form-block" v-show="formData.returnWay === '其他'">
        <nut-form-item
          label="返程交通方式"
          prop="wayOther"
          required
          :rules="[{ required: true, message: '请填写回乡交通方式' }]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('wayOther')"
            v-model="formData.wayOther"
            placeholder="请填写回乡交通方式（必填）"
          />
        </nut-form-item>
      </view>

      <nut-form-item
        prop="nextAddress"
        label="到达地区"
        required
        class="address-item"
        :rules="[{ required: true, message: '到达地区' }]"
      >
        <Address @change="onNextAddressChange" />
      </nut-form-item>
      <view class="form-block">
        <nut-form-item
          label="详细居住地址"
          prop="nextDetailAddress"
          required
          :rules="[{ required: true, message: '请填写到达的详细住址' }]"
        >
          <nut-textarea
            rows="3"
            class="textarea"
            @blur="customBlurValidate('nextDetailAddress')"
            v-model="formData.nextDetailAddress"
            placeholder="请填写到达的详细住址（必填）"
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
import { ref, reactive } from 'vue'
import Address from './address.vue'

export default {
  setup() {
    const formData = reactive({
      name: '',
      cardId: '',
      tel: '',
      address: '',
      detailAddress: '',
      nextAddress: '',
      nextDetailAddress: '',
      way: '',
      wayOther: '',
    })
    const validate = (item: any) => {
      console.log(item)
    }
    const ruleForm = ref<any>(null)

    const submit = () => {
      ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success', formData)
        } else {
          console.log('error submit!!', errors)
        }
      })
    }
    const reset = () => {
      ruleForm.value.reset()
    }
    // 失去焦点校验
    const customBlurValidate = (prop: string) => {
      ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success', formData)
        } else {
          console.log('error submit!!', errors)
        }
      })
    }
    // 函数校验
    const customValidator = (val: string) => /^\d+$/.test(val)
    // Promise 异步校验
    const asyncValidator = (val: string) => {
      return new Promise((resolve) => {
        console.log('模拟异步验证中...')
        setTimeout(() => {
          console.log('模拟异步验证完成')
          resolve(/^\d{11}$/.test(val))
        }, 1000)
      })
    }

    return {
      ruleForm,
      formData,
      validate,
      customValidator,
      asyncValidator,
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
    },
    onNextAddressChange(value) {
      this.formData.nextAddress = value
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
