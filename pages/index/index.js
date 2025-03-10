 const db = wx.cloud.database();
 const _ = db.command;
 Page({
   data: {
     placeList: []
   },
   search_input(e) {
     console.log(e);
     this.setData({
       searchcontent: e.detail.value
     })
   },
   tosearch() {
     var searchcontent = this.data.searchcontent
     console.log(searchcontent);
     if (searchcontent == null) {
       wx.showToast({
         title: '请输入搜索关键字',
         icon: 'none'
       })
     }
     wx.navigateTo({
       url: '../placelist/searchlist?search=' + searchcontent,
     })
   },
   todetail(e) {
     console.log(e)
     var id = e.currentTarget.dataset.index
     wx.navigateTo({
       url: '../placedetail/placedetail?id=' + id,
     })
   },
   todetailicon(e) {
     console.log(e)
     var name = e.currentTarget.dataset.value
     if (name == '博物馆') {
       wx.navigateTo({
         url: '../placelist/placelist',
       })
     } else if (name == '搜文物') {
       wx.navigateTo({
         url: '../allgoods/allgoods',
       })
     } else if (name == "看展览") {
       wx.navigateTo({
         url: '../placelist/placelist',
       })
     } else if (name == "淘文创") {
       wx.switchTab({
         url: '../wenchuang/wenchuang',
       })
     }
   },
   toallplace() {
     wx.navigateTo({
       url: '../placelist/placelist',
     })
   },
   onShow() {
     // 查看是否已经登录，没有登录跳转到登录界面
     var msg = wx.getStorageSync('msg')
     if (!msg) {
       wx.navigateTo({
         url: '../login/login',
       })
     }

   },
   onLoad() {
     this.getplace()
   },
   getplace() {
     wx.cloud.callFunction({
       name: "getlibrarybylimit",
       data: {

       }
     }).then(res => {
       console.log(res)
       this.setData({
         placeList: res.result.data.reverse()
       })
     })
   }
 })