const db = wx.cloud.database()
// pages/tuanjian/tuanjian.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pos: [{
                text: '直辖市',
                value: 0
            },
            {
                text: '河北',
                value: 1
            },
            {
                text: '山东',
                value: 2
            },
            {
                text: '辽宁',
                value: 3
            },
            {
                text: '黑龙江',
                value: 4
            },
            {
                text: '甘肃',
                value: 5
            },
            {
                text: '吉林',
                value: 6
            },
            {
                text: '青海',
                value: 7
            },
            {
                text: '河南',
                value: 8
            },
            {
                text: '江苏',
                value: 9
            },
            {
                text: '陕西',
                value: 10
            },
            {
                text: '浙江',
                value: 11
            },
            {
                text: '海北',
                value: 12
            },
            {
                text: '湖南',
                value: 13
            },
            {
                text: '广东',
                value: 14
            },
            {
                text: '云南',
                value: 15
            },
            {
                text: '福建',
                value: 16
            },
            {
                text: '山西',
                value: 17
            },
            {
                text: '四川',
                value: 18
            },
            {
                text: '江西',
                value: 19
            },
            {
                text: '新疆',
                value: 20
            },
        ],

        name: '直辖市',
        value1: '0',

    },
    option1change(e) {
        console.log(e)
        var index = e.detail
        this.setData({
            name: this.data.pos[index].text
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
          url: '../placelist/searchlist?search='+searchcontent,
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
            name: "getallplacelist",
            data: {

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