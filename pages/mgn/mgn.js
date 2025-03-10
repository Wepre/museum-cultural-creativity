// pages/mgn/mgn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    isLoadMore: true,
    isLoadFinish: false,
    search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  getArticleList: function () {
    wx.showLoading({
      title: '正在加载数据',
    })
  wx.cloud.callFunction({
    name:'getlistbyopenid',
    data:{

    }
  }).then(res=>{
    console.log(res)
    
    this.setData({
      list:res.result.data
    })
    wx.hideLoading({
      success: (res) => {},
    })
  })
},
onShow(){
  this.getArticleList()
},
  onItemClick: function (e) {
    console.log(e)
    
    var id=e.currentTarget.dataset.index._id
    //跳转页面
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })

  },
})