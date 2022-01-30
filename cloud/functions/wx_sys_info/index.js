const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async () => {
  const wxContext = cloud.getWXContext()
  // AMAP_API_KEY
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}