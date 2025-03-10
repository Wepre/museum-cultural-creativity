const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    goods: [],
    placelike: [],
    itemlike: [],
    displaylike: [],


  },
  onShow() {
    this.setData({
      phone: wx.getStorageSync('phone'),
      loginId: wx.getStorageSync('loginId'),
    })
  },
  onLoad(e) {
    wx.showLoading({
      title: '正在加载',
    })
    wx.cloud.callFunction({
      name: "getusermsg",
      data: {
        id: wx.getStorageSync('loginId'),
      }
    }).then(res => {
      console.log(res)
      var displayList = res.result.data.displaylike //获得用户的展览馆收藏列表
      var itemList = res.result.data.itemlike //获得用户的文物收藏列表
      var libraryList = res.result.data.placelike //获得用户的博物馆收藏列表
      this.setData({
        displayList,
        itemList,
        libraryList,
      })
      // 接下来就是挨个获取3个种类的收藏信息
      //1.displayList
      db.collection('displayList')
        .where({
          _id: _.in(displayList)
        })
        .get().then(res => {
          this.setData({
            displaylike: res.data.reverse()
          })
        })
      //2.itemList
      db.collection('itemList')
        .where({
          _id: _.in(itemList)
        })
        .get().then(res => {
          this.setData({
            itemlike: res.data.reverse()
          })
        })
      //3.libraryList
      db.collection('libraryList')
        .where({
          _id: _.in(libraryList)
        })
        .get().then(res => {
          this.setData({
            placelike: res.data.reverse()
          })
          wx.hideLoading()
        })
    })
  },
  toplacedetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../placedetail/placedetail?id=' + id,
    })
  },
  todisplay(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../playdetail/playdetail?id=' + id,
    })
  },
  toitem(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../itemdetail/itemdetail?id=' + id,
    })
  }
})