const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    goods: [],

    allorder: []

  },
  confirm(e) {
    var id = e.currentTarget.dataset.id
    db.collection('orderList').doc(id).update({
      data: {
        status:'已完成'
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '确认收货成功',
      })
      this.onLoad()
    })
  },
  onShow(e) {
    this.setData({
      phone: wx.getStorageSync('phone'),
      loginId: wx.getStorageSync('loginId'),
    })
  },
  onLoad() {
    db.collection('orderList').where({
      loginId: this.data.loginId
    }).get().then(res => {
      console.log(res)
      this.setData({
        allorder: res.data.reverse()
      })
    })
  },
  toorderdetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id,
    })
  }
})