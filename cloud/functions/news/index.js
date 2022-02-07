const cloud = require('wx-server-sdk')
const qs = require('querystring')

cloud.init()

const db = cloud.database()
const _ = db.command
exports.main = async (event) => {
  const { id } = event
  if (!id) {
    return false
  }
  await db.collection('news')
    .doc(id)
    .update({
      data: {
        view_count: _.inc(1),
      },
    })
  return true
}
