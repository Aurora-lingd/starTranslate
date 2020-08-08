//index.js
//获取应用实例
import {translate} from '../../utils/api'
const app = getApp()

Page({
  data: {
    curLang:{},
    hideClearIcon:true,
    query:'',
    result:[]
  },
  onShow(){
    const content = wx.getStorageSync('content')
    if(content){
      this.setData({query:content})
      wx.setStorageSync('content', '')
      this.onConfirm()
    }
    if(this.data.curLang.lang !== app.globalData.curLang.lang){
      this.setData({curLang:app.globalData.curLang})
      this.onConfirm()
    }
  },
  onInput(e){
    this.setData({'query':e.detail.value})
    if(this.data.query.length > 0){
      this.setData({'hideClearIcon':false})
    }else{
      this.setData({'hideClearIcon':true})
    }
  },
  onTabClose(){
    this.setData({ query: '', hideClearIcon: true})
  },
  onConfirm(){
    if(!this.data.query){return}
    translate(this.data.query,{from:'auto',to:this.data.curLang.lang}).then(res=>{
      this.setData({'result':res.trans_result})
      let history = wx.getStorageSync('history') || []
      history.unshift({query:this.data.query,result:res.trans_result[0].dst})
      history.length = history.length > 10? 10:history.length
      wx.setStorageSync('history', history)
    })
  },
  onCopy(){
    wx.setClipboardData({
      data: this.data.result[0].dst,
      success: function () {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  }
  
})
