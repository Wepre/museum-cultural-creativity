// pages/add/add.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "无",
    imgList: [],
    imgUrl: [],
    res: [],
    loc:'',
    position: [],
    username:''
  },
  input(e){
    console.log(e)
    this.setData({
      loc:e.detail.value
    })
  },
  chooseLocation(e){
    let that = this
    wx.getSetting({
      success(res) {
        console.log('res是否开启授权', res)
        if (!res.authSetting['scope.userLocation']) { 
          wx.authorize({
            scope: 'scope.userLocation',  
            success() {
              // console.log('前用户发起授权请求')
              wx.chooseLocation({
                success:(res)=>{
                  console.log(res)
                  this.setData({
                    position:res,
                    loc:res.address
                  })
                  
                }
              })
            },
            fail() {
              // 用户点击不允许引导重新获取授权
              that.fetchAgainLocation()
            }
          })
        } else {
            // 已经授权了就会直接进入地图
            wx.chooseLocation({
              success:(res)=>{
                console.log(res)
                this.setData({
                  position:res,
                  loc:res.address
                })
                
              }
            })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  userinput(e){
    console.log(e)
    this.setData({
      username:e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        wx.showLoading({
          title: '正在上传',
        })
        console.log(res)
        this.setData({
          res: res
        })
        //foreach



        // 分隔线
        let length=this.data.imgList.length
        if (length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        //写云函数也不行,难搞哦
        //行吧，来个你死我活的，不弄好就不进入下面的函数
        this.data.imgList.forEach(item=>{
          setTimeout(() => {
            
          }, 100);
          let timestamp = (new Date()).valueOf();
          var list=this.data.imgUrl
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: timestamp + '.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: item,
            // 成功回调
            success: res => {
              console.log('上传成功', res)
              if (res.fileID) {
                list.push(String(res.fileID))
                this.setData({
                  imgUrl: list
                })
              }
  
            },
          })
        })
        while(this.data.imgUrl.length!=length){
          setTimeout(() => {
            
          }, 500);
          
        }
        wx.hideLoading({
          success: (res) => {},
        })
      }
    });
  },
  ViewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgUrl,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          var indexx = e.currentTarget.dataset.index
          this.data.imgUrl.splice(e.currentTarget.dataset.index, 1);
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);

         //获得被删除的元素值
          //我真的服了


          
          
          this.setData({
            imgList:this.data.imgList,
            imgUrl: this.data.imgUrl
          })
        }
      }
    })
  },
  upimage() {
    wx.showLoading({
      title: '正在添加',
    })
    let list = []
   
    this.data.imgList.forEach(item => {
      setTimeout(() => {

      }, 100);
      let that = this;
      let timestamp = (new Date()).valueOf();

      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        
        // 指定上传到的云路径
        cloudPath: timestamp + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: item,
        // 成功回调
        success: res => {
          console.log('上传成功', index)

          wx.showToast({
            title: '上传图片成功',
            icon: 'none'
          })
          if (res.fileID) {
            list.push(String(res.fileID))
            that.setData({
              zhaopian: '图片如下',
              imgUrl: list,
            })
           
          }
          //写数据库添加

        },
      })

    })
    //到这里完成 

    wx.hideLoading({
      success: (res) => {},
    })

  },
  textareaBInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  gettime() {
    //写获取时间
    var timestamp = Date.parse(new Date());

    var date = new Date(timestamp);

    //获取年份  

    var Y = date.getFullYear();

    //获取月份  

    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

    //获取当日日期 

    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return Y + '-' + M + '-' + D
  },
  submit(e) {
    if (this.data.loc==''||this.data.imgUrl.length==0) {
      wx.showToast({
        title: '请将信息填写完全',
        icon:'none'
      })
      return
    }
    db.collection('list').add({
      data:{
        image:this.data.imgUrl,
        content:this.data.content,
        position:this.data.position,
        loc:this.data.loc,
        get:'',
        time:this.gettime(),
        timestamp:Date.parse(new Date()),
        username:this.data.username
      }
    }).then(re=>{
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '上传成功！',
        icon:'none',
        duration:1000
      })
      setTimeout(() => {
        
      }, 1000);
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  onLoad(options) {

  },
})