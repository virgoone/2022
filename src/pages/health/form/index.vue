<template>
  <view class="health-form">
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item
        label="体温"
        prop="temperature"
        aria-label="体温"
        required
        :rules="[{ required: true, message: '请填写体温' }]"
      >
        <input
          class="nut-input-text"
          v-model="formData.temperature"
          placeholder="请输入（必填）"
          aria-label="体温输入框（必填）"
          type="digit"
        />
      </nut-form-item>
      <view class="form-block">
        <nut-form-item
          label="本人健康状况（多选）"
          prop="health_status"
          aria-label="本人健康状况输入框（多选）"
          required
          :rules="[{ required: true, message: '请选择本人健康状况' }]"
        >
          <checkbox-group
            ref="group"
            direction="horizontal"
            class="checkbox-group"
            @change="onStatusChange"
          >
            <view
              class="checkbox-wrap"
              :key="index"
              v-for="(item, index) in healthData"
            >
              <checkbox
                class="checkbox"
                color="#498bf7"
                ：aria-label="item"
                :value="item"
                :checked="formData.health_status.indexOf(item) > -1"
              />
              <view class="checkbox-label">{{ item }}</view>
            </view>
          </checkbox-group>
        </nut-form-item>
      </view>
    </nut-form>

    <view class="submit-button-box">
      <nut-button type="primary" size="large" @click="submit" block>
        提交
      </nut-button>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { ref, reactive } from 'vue'
import { saveFormInfo } from '../../../api/health'

export default {
  data: () => ({
    healthData: [
      '咳嗽',
      '咳痰',
      '流涕',
      '咽痛',
      '胸痛胸闷',
      '其他',
      '无上述异常症状',
    ],
  }),
  setup() {
    const formData = reactive({
      temperature: '',
      health_status: [],
    })
    const ruleForm = ref<any>(null)
    const group = ref(null)

    const reset = () => {
      ruleForm.value.reset()
    }
    const submit = async () => {
      const { valid, errors } = await ruleForm.value.validate()
      if (valid) {
        Taro.showLoading({
          title: '提交中',
        })
        const { temperature, health_status } = formData
        const data = {
          temperature: parseFloat(temperature),
          health_status,
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
        console.log('error submit!!', errors)
      }
    }

    return {
      formData,
      ruleForm,
      group,
      submit,
      reset,
    }
  },
  methods: {
    onStatusChange(e) {
      const values = e.detail.value
      this.formData.health_status = values
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #f7f8fa;
}
.health-form {
  position: relative;

  .nut-form-item__label.required::before,
  .nut-form-item__body__tips {
    color: #fa2c19;
  }
  .nut-form-item.error.line::before {
    border-bottom-color: #fa2c19;
  }
  .nut-form-item__body__slots .nut-input-text,
  .nut-input-text {
    color: #000;
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
      .checkbox-group {
        display: flex;
        flex-wrap: wrap;

        .checkbox-wrap {
          width: 49%;
          display: flex;
          align-items: center;
          height: 25px;
          margin-bottom: 15px;

          .checkbox {
            .wx-checkbox-input {
              width: 15px;
              height: 15px;
              margin: 0;
              padding: 0;
              margin-right: 8px;
            }
          }
          .checkbox-label {
            font-size: 14px;
            color: #1d1e1e;
          }
        }
      }
    }
  }

  .submit-button-box {
    position: fixed;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    bottom: env(safe-area-inset-bottom);
    .nut-button--round {
      border-radius: 6px;
    }
  }
}
</style>
