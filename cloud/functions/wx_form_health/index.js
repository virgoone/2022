const cloud = require('wx-server-sdk')
const qs = require('querystring')

cloud.init()

const db = cloud.database()
const _ = db.command
exports.main = async (event) => {
  await db.collection('wx_form_health').add({
    data: event,
  })
  return true
}
