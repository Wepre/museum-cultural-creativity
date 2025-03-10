const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
content:{}
  },
  onLoad(e) {
    var id=e.id
    db.collection('article').doc(id).get().then(res=>{
      console.log(res)
      this.setData({
        content:res.data
      })
    })
  }
})