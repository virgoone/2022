const cloud = require('wx-server-sdk')
const axios = require('axios')
const qs = require('querystring')

cloud.init()

const API_BASE = 'https://restapi.amap.com/v3/config/district?parameters'
async function getProvince(query = {}) {
  const params = {
    subdistrict: 2,
    offset: 50,
    ...query,
  }
  const data = await axios
    .get(`${API_BASE}&${qs.stringify(params)}`)
    .then((res) => res.data)
  return data
}

exports.main = async (event) => {
  const params = {
    subdistrict: event.subdistrict || 2,
    keywords: event.filter || '',
    key: process.env.AMAP_API_KEY,
  }
  if (!event.filter) {
    delete params.keywords
  }
  const { districts = [] } = await getProvince(params)

  return districts
}
