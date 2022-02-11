import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const model = db.collection('wx_form_info')

export interface Address {
  addressStr: string
  detailAddress: string
  addressIdStr: string
  [key: string]: any
}

export interface ReturnWay {
  date: string
  type: string
  way: string
  extra?: string
}

export interface FormInfo {
  _id: string
  name: string
  tel: string
  idcard: string
  source_address: Address
  next_adr: Address
  return_way: ReturnWay
  _createTime: number
  _updateTime: number
}

/**
 * 保存表单信息
 * @param formInfo FormInfo
 * @returns FormInfo
 */
export const saveFormInfo = async (formInfo: FormInfo): Promise<FormInfo> => {
  const res = await model.add({
    data: formInfo,
  })
  return res as unknown as FormInfo
}
