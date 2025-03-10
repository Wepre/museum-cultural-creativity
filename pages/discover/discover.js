const db=wx.cloud.database(); const _=db.command;// pages/template/news/news01/news01.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    cardCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    tabList: [{
      id: 0,
      name: '关注'
    }, {
      id: 1,
      name: '推荐'
    }, {
      id: 2,
      name: '热榜'
    }, {
      id: 3,
      name: '快讯'
    }, {
      id: 4,
      name: '视频'
    }, {
      id: 5,
      name: '科技'
    }],
    //这个是每一张的图片跟里面的文字
    swiperList: [{
      title: '中华文创产品',
      des: '',
      url: 'https://www.aiwulongrencai.com/data/attachment/forum/201912/04/150006ahh7j85e550i1oz0.png'
    }, {
      title: '中国考古博物馆开馆',
      des: '',
      url: 'https://image.meiye.art/FhHGe9NyO0uddb6D4203jevC_gzc?imageMogr2/thumbnail/450x/interlace/1',
    }, {
      title: '文物保护法修订的四大变化',
      des: '',
      url: 'https://image.meiye.art/FlqKg5bugFQD5Qzm_QhGM7ET4Mtx?imageMogr2/thumbnail/450x/interlace/1',
    }],
    newsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '正在加载',
    })
    db.collection("article").get().then(res=>{
      console.log(res)
      this.setData({
        newsList:res.data.reverse()
      })
      wx.hideLoading()
    })
  },
  tonewdetail(e){
    console.log(e)
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../newdetail/newdetail?id=' + id,
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

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})