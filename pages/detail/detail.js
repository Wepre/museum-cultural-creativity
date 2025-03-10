const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //数据
        image: [],
        content: '',
        loc: '',
        position: [],
        time: '',
        id: '',
        openid: '',
        get: '',
        username:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '正在加载',
        })
        var id = options.id
        this.setData({
            id: options.id
        })
        const db = wx.cloud.database()
        db.collection('list').doc(id).get().then(res => {
            console.log(res)
            this.setData({
                image: res.data.image,
                content: res.data.content,
                loc: res.data.loc,
                position: res.data.position,
                time: res.data.time,
                get: res.data.get,
                username:res.data.username
            })
            wx.hideLoading({
                success: (res) => {},
            })
        })
    },
    viewimg(e) {
        console.log(e)
        wx.previewImage({
            urls: this.data.image,
            current: e.currentTarget.dataset.url
        });
    },
    getit() {
        //首先，先得到这个这个点击事件的openid
        wx.showLoading({
            title: '正在操作',
        })
        wx.cloud.callFunction({
            name: 'getopenid',
            success: (res) => {
                console.log(res)
                this.setData({
                    openid: res.result.openid
                })
                //接下来访问数据库，把这个doc的get属性更新
                db.collection('list').doc(this.data.id).update({
                    data: {
                        get: res.result.openid
                    }
                }).then(res => {
                    wx.hideLoading({
                        success: (res) => {
                            this.setData({
                                get: '1'
                            })
                            wx.showToast({
                                title: '领养成功',
                                icon: 'none'
                            })
                        },
                    })

                })
            }
        })


    }
})