const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    loginId: wx.getStorageSync('loginId'),
    goods: [],
  },
  onLoad(e) {
    wx.showLoading({
      title: '正在加载',
    })

    // 查看在购物车里面的数据。
    wx.cloud.callFunction({
      name: "getusermsg",
      data: {
        id: this.data.loginId,
      }
    }).then(res => {
      console.log(res)
      var cartlist = res.result.data.cartlist //获得用户的博物馆收藏列表
      this.setData({
        cartlist,
      })
      // 把所有在cartlist里面的商品数据取到
      db.collection('goodsList')
        .where({
          _id: _.in(cartlist)
        })
        .get().then(res=>{
          console.log('购物车数据',res)
          this.setData({
            goods:res.data.reverse()
          })
          wx.hideLoading()
        })

    })
  },
})