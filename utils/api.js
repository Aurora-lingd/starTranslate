import md5 from './md5.min.js'

const appid = '20200805000534004'
const key = 'mJ2wvWGbOHxg4JsNcFVz'

function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }){
  return new Promise((resolve,reject)=>{
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
      data:{
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res){
        if(res.data && res.data.trans_result){
          resolve(res.data)
        }
      },
      fail(){
        reject({status:'res.error_code',msg:'翻译失败'})
        wx.showToast({
          title: '网络异常',
          icon:'none',
          duration:3000
        })
      }
    })
  })
}
module.exports.translate = translate