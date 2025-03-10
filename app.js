// app.js
App({
	onLaunch(){
		wx.cloud.init({
			env:'c-1gad1pf02d13e911'
		})
		const db=wx.cloud.database()
		db.collection('libraryList').get().then(res=>{
			console.log(res)
			var placelist={}
			var pricelist={}
			var itemlist={}
			var	reslist=res.data
			reslist.forEach(element => {
				placelist[element._id]=element.name
				// itemlist[element._id]=element
				// pricelist[element._id]=element.aprice
				wx.setStorageSync('placelist', placelist)
				// wx.setStorageSync('itemlist', itemlist)
				// wx.setStorageSync('pricelist', pricelist)
			});
		})
  },
  "pages": [
    // ... existing pages ...
    "pages/search/search"
  ],
})
