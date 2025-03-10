Page({
  data: {

  },
  onLoad() {

  },
  mybook() {
    wx.navigateTo({
      url: '../mybook/mybook',
    })
  },
  mylike() {
    wx.navigateTo({
      url: '../mylike/mylike',
    })
  },
  toorderdetail() {
    wx.navigateTo({
      url: '../orderdetail/orderdetail',
    })
  },
  exit(e) {
    wx.showModal({
      title: '提示',
      content: '确定要退出吗',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          wx.clearStorage()
          wx.reLaunch({
            url: '../index/index',
          })
        }
      }
    })
  }
})