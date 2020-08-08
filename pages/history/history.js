Page({
  data:{
    history:[],
  },
  onShow(){
    this.setData({history: wx.getStorageSync('history')})
  },
  onTapItem(e){
    let content = e.currentTarget.dataset.query
    wx.setStorageSync('content', content)
    wx.switchTab({
      url: "/pages/index/index",
    })
  }
})