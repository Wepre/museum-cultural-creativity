const db = wx.cloud.database()
Page({
  data: {
    list: []
  },
  cancle(e) {
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否要取消',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          wx.showLoading({
            title: '正在操作',
          })
          var id = e.currentTarget.dataset.id
          db.collection('bookList').doc(id).remove().then(res => {
            wx.showToast({
              title: '取消成功',
            })
            this.onShow()
            wx.hideLoading()
          })
        }
      }
    })
  },
  onShow() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.cloud.callFunction({
      name: "getlistbyuserid",
      data: {
        userid: wx.getStorageSync('loginId')
      }
    }).then(res => { 
      console.log(res)
      this.setData({
        list: res.result.data.reverse()
      })
      wx.hideLoading()
    })
  },
  onItemClick: function (e) {
    console.log(e)

    var id = e.currentTarget.dataset.index.placeid
    //跳转页面
    wx.navigateTo({
      url: '/pages/placedetail/placedetail?id=' + id,
    })

  },
})