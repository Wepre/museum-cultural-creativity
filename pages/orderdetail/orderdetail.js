const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    goods: [],

    allorder: []

  },
  cancle(e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '是否要取消订单？',
      content: '',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          db.collection('orderList').doc(id).remove().then(res => {
            wx.showToast({
              title: '取消成功',
            })
            this.onLoad()

          })

        }
      }
    })

  },
  confirm(e) {
    var id = e.currentTarget.dataset.id
    db.collection('orderList').doc(id).update({
      data: {
        status: '已完成'
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