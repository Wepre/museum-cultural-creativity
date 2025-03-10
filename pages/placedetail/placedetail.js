const db = wx.cloud.database()
const _ = db.command
import utils from "../../util/utils.js";
Page({
  data: {
    res: {},
    id: '',
    displaylist: [], //对应的展厅
    itemlist: [], //对应的文物
    islike: false,
    swiperList: [],
    zbList: [],
    loginId: wx.getStorageSync('loginId'),
    likeList: []
  },
  tobookplace(e) {
    wx.navigateTo({
      url: '../bookplace/bookplace?id=' + this.data.id,
    })
  },
  toitemdetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../itemdetail/itemdetail?id=' + id,
    })
  },
  getdisplay() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.cloud.callFunction({
      name: "getdisplaybyplace",
      data: {
        placeid: this.data.id
      }
    }).then(res => {
      console.log('展厅', res)
      this.setData({
        displaylist: res.result.data.reverse()
      })
      wx.hideLoading()
    })
  },
  todetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../placedetail/placedetail?id=' + id,
    })
  },
  todisplaydetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../playdetail/playdetail?id=' + id,
    })
  },
  // 获得文物信息
  getitem() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.cloud.callFunction({
      name: "getitembyplace",
      data: {
        placeid: this.data.id
      }
    }).then(res => {
      console.log('文物', res)
      this.setData({
        itemlist: res.result.data.reverse()
      })
      wx.hideLoading()
    })
  },
  getzb() {
    // 这个函数用来get周边的景点
    var id = this.data.id
    var list = [id + '']
    console.log(list)


  },
  toallplace() {
    wx.navigateTo({
      url: '../placelist/placelist',
    })
  },
  onShow(e) {
    this.setData({
      loginId: wx.getStorageSync('loginId'),
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
    this.getdisplay()
    this.getitem()
    console.log(id)
    wx.cloud.callFunction({
      name: 'getplacebyid',
      data: {
        id,
      }
    }).then(res => {
      console.log(res)

      this.setData({
        res: res.result.data
      })
      wx.setStorageSync('clickplace', res.result.data)

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
      var likeList = res.result.data.placelike //获得用户的博物馆收藏列表
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
              placelike: arr
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
            placelike: arr
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