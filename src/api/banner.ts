import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const banners = db.collection('wx_banners')
const _ = db.command

export enum BannerPosition {
  Middle = 1,
  Top = 2,
}

export interface Banner {
  _id: string
  title: string
  image: string
  link: string
  position: BannerPosition
  order: number
  startTime: Date
  endTime: Date
}
/**
 * 获取Banners列表
 * @returns {Promise<Banner[]>}
 */
export const getBanners = async (
  position: BannerPosition = 1
): Promise<Banner[]> => {
  const currentDate = Date.now()

  // 取结束时间大于等于当前时间
  const res = await banners
    .where({
      position,
      startTime: _.lte(currentDate),
      endTime: _.gte(currentDate),
    })
    .orderBy('order', 'desc')
    .get()

  return (res?.data || []) as unknown as Banner[]
}
