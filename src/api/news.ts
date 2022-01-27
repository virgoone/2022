import Taro from '@tarojs/taro'

const db = Taro.cloud.database()
const news = db.collection('news')

export enum NewsStatus {
  UN_PUBLISHED = 0,
  DELETED,
  PUBLISHED,
}

export interface News {
  _id: string
  title: string
  sid?: string
  poster?: string
  subtitle?: string
  content?: string
  status?: NewsStatus
  order: number
}
/**
 * 获取News列表
 * @returns {Promise<News[]>}
 */
export const getNews = async (
  fields?: Record<keyof News, boolean>
): Promise<News[]> => {
  let newsQuery = news.where({
    status: NewsStatus.PUBLISHED,
  })

  if (fields) {
    newsQuery = newsQuery.field(fields)
  }

  const res = await newsQuery.orderBy('order', 'asc').get()

  return (res?.data || []) as unknown as News[]
}

/**
 * 获取单个News
 * @returns {Promise<News>}
 */
export const getNewsBySid = async (sid: string): Promise<News> => {
  const newsQuery = await news
    .where({
      status: NewsStatus.PUBLISHED,
      sid,
    })
    .limit(1)
    .get()

  return newsQuery?.data?.[0] as unknown as News
}
