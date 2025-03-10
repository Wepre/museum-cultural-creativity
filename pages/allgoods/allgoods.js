const db = wx.cloud.database()
// pages/tuanjian/tuanjian.js
Page({

    /**
     * 页面的初始数据
     */
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
    onShow() {
        this.setData({
            value1: 0
        })
    },
    search_input(e) {
        console.log(e);
        this.setData({
            searchcontent:e.detail.value
        })
    },
    tosearch(){
        var searchcontent=this.data.searchcontent
        console.log(searchcontent);
        if (searchcontent==null) {
            wx.showToast({
              title: '请输入搜索关键字',
              icon:'none'
            })
        }
        wx.navigateTo({
          url: '../allgoods/searchlist?search='+searchcontent,
        })
    },
    todetail(e){
        console.log(e)
        var id=e.currentTarget.dataset.value
        wx.navigateTo({
          url: '../itemdetail/itemdetail?id='+id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading({
            title: '正在加载',
        })
        wx.cloud.callFunction({
            name: "getdata",
            data: {
                name:'itemList'
            }
        }).then(res => {
            console.log(res)
            this.setData({
                list: res.result.data.reverse()
            })
            wx.hideLoading()
        })

    },

})