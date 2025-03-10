const db = wx.cloud.database();
const _ = db.command; // pages/bookplace/bookplace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    show: false,
    id: '',
    res: {},
    picker: ['1', '2', '3', '4', '5'],
    picker1: ['9:00-12:00', '14:00-17:00'],
    index: '0',
    index1: '0',
    phone: wx.getStorageSync('msg').phone,

    loginId: wx.getStorageSync('loginId'),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  book() {
    if (this.data.date == '请选择日期') {
      wx.showToast({
        title: '请先选择日期',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '正在操作',
    })
    var result = this.data.res
    var placeid = this.data.res._id
    delete result._id
    db.collection('bookList').add({
      data: {
        userid: wx.getStorageSync('loginId'),
        placeid,
        date: this.data.date,
        num: parseInt(this.data.index) + 1,
        time: this.data.picker1[this.data.index1],
        ...result
      }
    }).then(res => {
      wx.showToast({
        title: '预约成功',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 1000);
    })
  },
  PickerChange1(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  onLoad(options) {
    this.setData({
      id: options.id,
      res: wx.getStorageSync('clickplace')
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
 this.setData({
      phone: wx.getStorageSync('msg').phone,
      loginId: wx.getStorageSync('loginId'),
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})