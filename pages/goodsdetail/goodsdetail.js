// pages/goodsdetail/goodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placelist:wx.getStorageSync('placelist')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  tocart(e){
    wx.navigateTo({
      url: '../goodscart/goodscart',
    })
  },
  topay(e){
    var id=this.data.res._id
    wx.navigateTo({
      url: '../goodspay/goodspay?id='+id,
    })
  },
  onLoad(e) {
    wx.showLoading({
      title: '正在加载',
    })
    var id = e.id
    this.setData({
      id,
    })
    // this.getdisplay()
    // this.getitem()
    console.log(id)
    wx.cloud.callFunction({
      name: 'getgoodsbyid',
      data: {
        id,
      }
    }).then(res => {
      console.log(res)

      this.setData({
        res: res.result.data
      })


      wx.setNavigationBarTitle({
        title: res.result.data.name,
      })
      wx.hideLoading()
    })
    // 查看是否已经收藏。
    // wx.cloud.callFunction({
    //   name: "getusermsg",
    //   data: {
    //     id: this.data.loginId,
    //   }
    // }).then(res => {
    //   console.log(res)
    //   var likeList = res.result.data.displaylike //获得用户的博物馆收藏列表
    //   this.setData({
    //     likeList,
    //   })
    //   if (likeList.indexOf(id) != -1) { //如果在表内，则说明已经收藏了
    //     this.setData({
    //       islike: true
    //     })
    //   }
    // })
  },

})