import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const banners = db.collection('wx_banners')
const _ = db.command

export enum BannerCategory {
  Middle = 1,
  Top = 2,
}

export interface Banner {
  _id: string
  title: string
  image: string
  link: string
  position: BannerCategory
  order: number
  startTime: Date
  endTime: Date
}
/**
 * 获取Banners列表
 * @returns {Promise<Banner[]>}
 */
export const getBanners = async (
  categoryId: BannerCategory = 1
): Promise<Banner[]> => {
  const currentDate = Date.now()

  // 取结束时间大于等于当前时间
  const res = await banners
    .where(
      _.and([
        {
          category_id: categoryId,
        },
        _.or([
          {
            startTime: _.lte(currentDate),
            endTime: _.gte(currentDate),
          },
          {
            status: true,
          },
        ]),
      ])
    )
    .orderBy('order', 'desc')
    .get()

  return (res?.data || []) as unknown as Banner[]
}
