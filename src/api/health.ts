import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const model = db.collection('wx_form_health')

export interface HealthForm {
  _id: string
  temperature: number
  health_status: string[]
  _createTime: number
  _updateTime: number
}

/**
 * 保存表单信息
 * @param formInfo HealthForm
 * @returns HealthForm
 */
export const saveFormInfo = async (
  formInfo: HealthForm
): Promise<HealthForm> => {
  const res = await model.add({
    data: formInfo,
  })
  return res as unknown as HealthForm
}
