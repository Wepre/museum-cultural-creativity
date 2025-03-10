const db=wx.cloud.database();
const _=db.command;
Page({
  data:{
    goods:[],
    TabCur:0,
    selectname:'综合',
    swiperList: [{
      url: 'https://img.zcool.cn/community/01567861051a4011013f47209a1839.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100'
    }, {
      url: 'https://wlt.xinjiang.gov.cn/wlt/xjlw/202102/ccc91a0f6d794b4dbf2b7bb8e290b1e8/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210224164604.jpg',
    }, {
      url: 'https://ts1.cn.mm.bing.net/th/id/R-C.d947a96a313dd26d9a49dc06bb768ba0?rik=30jWh7JQF7XQFA&riu=http%3a%2f%2fcdn063.yun-img.com%2fstatic%2fupload%2fxubin728728%2falbum%2f20200724153948_36218.jpg&ehk=Mpv40N3o8t%2bUQEh%2fnB8AsI55zJeyOlkMLPd7XM2cnuU%3d&risl=&pid=ImgRaw&r=0',
    }],
    tabList: [{
      id: 0,
      name: '综合'
    }, {
      id: 1,
      name: '纪念品'
    }, {
      id: 2,
      name: '饰品'
    }, {
      id: 3,
      name: '日常用品'
    }, {
      id: 4,
      name: '其他'
    }],
   
  },
  
  tocart(e){
    wx.navigateTo({
      url: '../goodscart/goodscart',
    })
  },
  togoodsdetail(e){
    console.log(e)
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id,
    })
   
  },
  tabSelect(e) {
    var tab=e.currentTarget.dataset.id
    var name=this.data.tabList[tab].name
    this.setData({
      TabCur:tab ,
      scrollLeft: (tab - 1) * 60,
      selectname:name
    })
    console.log(name)
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
    db.collection("goodsList").where({
        name: db.RegExp({
          regexp: '.*' + search + '.*',
          options: 'i'
        })
      })
      .get().then(res => {
        console.log(res)
        this.setData({
          goods: res.data.reverse()
        })
        wx.hideLoading()
      })
wx.hideLoading()

  },
  getallgoods(){
    wx.cloud.callFunction({
      name:"getdata",
      data:{
        name:'goodsList'
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        goods:res.result.data.reverse()
      })
    })
  }
})