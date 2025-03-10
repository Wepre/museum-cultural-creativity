// pages/search/search.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
search:'',
list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search:options.search,
     
    })
    console.log(this.data.search)
    
    
    db.collection('list').where(db.command.or([{
      //使用正则查询，实现对‘num’字段的搜索的模糊查询
      content: db.RegExp({
        regexp: this.data.search,
        options: 'i', //大小写不区分
      }),
    },
    { //使用正则查询，实现对‘numPort’字段的搜索的模糊查询
      summary: db.RegExp({
        regexp: this.data.search,
        options: 'i',//大小写不区分
      }),
    }
    //下面可以增加更多的选项,可以做多字段的选择
  ])).get({
    success: res => {
      this.setData({
        list:res.data
      })
    },
    fail: err => {
      console.log(err)
    }
  })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onItemClick: function (e) {
    console.log(e)
    
    var id=e.currentTarget.dataset.index._id
    //跳转页面
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })

  },
})