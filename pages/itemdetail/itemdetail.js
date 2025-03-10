const db=wx.cloud.database(); const _=db.command;// pages/itemdetail/itemdetail.js
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    res: {},
    placelist:wx.getStorageSync('placelist'),

    id: '',
    displaylist: [], //对应的展厅
    itemlist: [], //对应的文物
    islike: false,
    swiperList: [],
    zbList: [],
    loginId: wx.getStorageSync('loginId'),
    likeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      name: 'getitembyid',
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
    wx.cloud.callFunction({
      name: "getusermsg",
      data: {
        id: this.data.loginId,
      }
    }).then(res => {
      console.log(res)
      var likeList = res.result.data.itemlike //获得用户的博物馆收藏列表
      this.setData({
        likeList,
      })
      if (likeList.indexOf(id) != -1) { //如果在表内，则说明已经收藏了
        this.setData({
          islike: true
        })
      }
    })
  },
  toview(e){
    console.log(e)
    var index=e.currentTarget.dataset.value
    var arr=this.data.res.images
    wx.previewImage({
      urls: arr,
      current: index,
     
    })
  },
  // 收藏
  likeit() {
    wx.showModal({
      title: '提示',
      content: '收藏？',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          // 收藏操作就是把值塞到用户的placelike字段。
          var arr = this.data.likeList
          arr.push(this.data.id)
          // 上面已经塞好了
          db.collection('userList').doc(this.data.loginId).update({
            data: {
              itemlike: arr
            }
          }).then(res => {
            wx.showToast({
              title: '收藏成功',
            })
            this.setData({
              islike: true
            })
          })
        }
      }
    })
  },
  // 取消收藏
  canclelike() {
    wx.showModal({
      title: '提示',
      content: '确定取消收藏吗？',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
          // 移除收藏列表，并将数据返回到用户的信息里面。
          this.removeByValue(this.data.likeList, this.data.id)
        }
      }
    })
  },
  removeByValue(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1);
        // 删完了之后把值更新到用户数据库里面
        db.collection('userList').doc(this.data.loginId).update({
          data: {
            itemlike: arr
          }
        }).then(res => {
          wx.showToast({
            title: '取消收藏成功',
          })
          this.setData({
            islike: false
          })
        })
        break;
      }
    }
  }
})