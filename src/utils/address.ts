import Taro from '@tarojs/taro'

const cityCacheMap = new Map()
const countryCacheMap = new Map()
const subdistrictCacheMap = new Map()

function flatAddress(res: Record<string, string>[], parentId = '') {
  res.forEach((item) => {
    const data: Record<string, string> = {
      id: item.adcode,
      level: item.level,
      name: item.name,
      citycode: item.citycode,
      parentId,
    }
    if (item.level === 'city') {
      const cityCacheList = cityCacheMap.get(parentId) || []

      cityCacheList.push(data)
      cityCacheMap.set(parentId, cityCacheList)
    } else if (item.level === 'district') {
      const countryCacheList = countryCacheMap.get(parentId) || []
      countryCacheList.push(data)
      countryCacheMap.set(parentId, countryCacheList)
    } else if (item.level === 'street') {
      const subdistrictCacheList = subdistrictCacheMap.get(parentId) || []
      subdistrictCacheList.push(data)
      subdistrictCacheMap.set(parentId, subdistrictCacheList)
    }
    if (Array.isArray(item.districts) && item.districts.length) {
      flatAddress(item.districts, item.adcode)
    }
  })
}

export async function getAddress(parentId: string) {
  if (!cityCacheMap.get(parentId)) {
    const { result } = await Taro.cloud.callFunction({
      name: 'wx_address',
      data: { subdistrict: 3, filter: parentId },
    })
    // @ts-ignore
    const resData = result?.[0].districts || []

    flatAddress(resData, parentId)
  }

  return {
    city: cityCacheMap,
    country: countryCacheMap,
    street: subdistrictCacheMap,
  }
}
