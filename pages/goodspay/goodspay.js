const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    goods: [],
    res: [],
    picker: ['1', '2', '3', '4', '5'],
    index: '0',

    address: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  getNowDate: function () {
    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1 //月
    var day = date.getDate() //日
    var hour = date.getHours() //时
    var minute = date.getMinutes() //分
    var second = date.getSeconds() //秒
    var xiaoshi = "";
    if (hour < 10) {
      xiaoshi = "0" + hour;
    } else {
      xiaoshi = hour + "";
    }
    var fenzhong = "";
    if (minute < 10) {
      fenzhong = "0" + minute;
    } else {
      fenzhong = minute + "";
    }
    var miao = "";
    if (second < 10) {
      miao = "0" + second;
    } else {
      miao = second + "";
    }
    var time = year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
    return time
  },
  addressinput(e) {
    console.log(e)
    this.setData({
      address: e.detail.value
    })
  },
  onShow(e) {
    this.setData({
      phone: wx.getStorageSync('msg').phone,
      loginId: wx.getStorageSync('loginId'),
    })
  },
  // 支付操作
  onSubmit(e) {
    console.log(e)
    wx.showLoading({
      title: '正在操作',
    })
    if (this.data.address == '') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return
    }
    var result = this.data.res
    var goodsid = result._id
    delete result._id
    db.collection("orderList").add({
      data: {
        ...result,
        phone: this.data.phone,
        loginId: this.data.loginId,
        address: this.data.address,
        userlist: wx.getStorageSync('msg'),
        goodsid,
        time: this.getNowDate(),
        money: this.data.res.price * this.data.picker[this.data.index], //金额
        num: this.data.picker[this.data.index], //数量
        status: '已支付' //订单状态
      }
    }).then(res => {
      wx.showToast({
        title: '支付成功',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 1000);
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

  },
})