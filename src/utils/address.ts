import Taro from '@tarojs/taro'

const cityCacheMap = new Map()
const countryCacheMap = new Map()
const subdistrictCacheMap = new Map()

function flatAddress(res: Record<string, string>[], parentId = '') {
  const cityList = {},
    countryList = {},
    subdistrictList = {}
  function flat(res: Record<string, string>[], parentId = '') {
    res.forEach((item) => {
      const data: Record<string, string> = {
        id: item.adcode,
        level: item.level,
        name: item.name,
        citycode: item.citycode,
        parentId,
      }
      if (item.level === 'city') {
        if (!Array.isArray(cityList[parentId])) {
          cityList[parentId] = []
        }
        cityList[parentId].push(data)
      } else if (item.level === 'district') {
        if (!Array.isArray(countryList[parentId])) {
          countryList[parentId] = []
        }
        countryList[parentId].push(data)
      } else if (item.level === 'street') {
        if (!Array.isArray(subdistrictList[parentId])) {
          subdistrictList[parentId] = []
        }
        subdistrictList[parentId].push(data)
      }
      if (Array.isArray(item.districts) && item.districts.length) {
        flat(item.districts, item.adcode)
      }
    })
  }

  flat(res, parentId)

  return {
    cityList,
    countryList,
    subdistrictList,
  }
}

export async function getAddress(parentId: string) {
  if (!cityCacheMap.get(parentId)) {
    const { result } = await Taro.cloud.callFunction({
      name: 'wx_address',
      data: { subdistrict: 3, filter: parentId },
    })
    // @ts-ignore
    const resData = result?.[0].districts || []
    const { cityList, countryList, subdistrictList } = flatAddress(
      resData,
      parentId
    )
    Object.keys(cityList).forEach((key) => {
      cityCacheMap.set(key, cityList[key])
    })
    Object.keys(countryList).forEach((key) => {
      countryCacheMap.set(key, countryList[key])
    })
    Object.keys(subdistrictList).forEach((key) => {
      subdistrictCacheMap.set(key, subdistrictList[key])
    })
  }

  return {
    city: cityCacheMap,
    country: countryCacheMap,
    street: subdistrictCacheMap,
  }
}
