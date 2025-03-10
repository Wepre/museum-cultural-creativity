const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    type: [{
        text: '推荐',
        value: 0
      },
      {
        text: '书画',
        value: 1
      },
      {
        text: '铜器',
        value: 2
      },
      {
        text: '漆器',
        value: 3
      },
      {
        text: '玉石器',
        value: 4
      },
      {
        text: '金银器',
        value: 5
      },
      {
        text: '珐琅器',
        value: 6
      },
      {
        text: '雕塑',
        value: 7
      },
      {
        text: '织绣',
        value: 8
      },
      {
        text: '其他',
        value: 9
      }
    ],

    name: '推荐',
    value1: '0',

  },
  option1change(e) {
    console.log(e)
    var index = e.detail
    this.setData({
        name: this.data.type[index].text
    })
},
  onLoad(e) {
    wx.showLoading({
      title: '正在加载',
    })
    // wx.cloud.callFunction({
    //     name: "getallplacelist",
    //     data: {

    //     }
    // }).then(res => {
    //     console.log(res)
    //     this.setData({
    //         list: res.result.data.reverse()
    //     })
    //     wx.hideLoading()
    // })

    //这里加模糊搜索

    var search = e.search
    console.log(search);
    db.collection("itemList").where({
        brief: db.RegExp({
          regexp: '.*' + search + '.*',
          options: 'i'
        })
      })
      .get().then(res => {
        console.log(res)
        this.setData({
          list: res.data.reverse()
        })
        wx.hideLoading()
      })
    wx.hideLoading()

  },
  onShow() {
    this.setData({
      value1: 0
    })
  },
})