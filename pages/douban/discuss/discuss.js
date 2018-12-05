Page({
    data:{
        mini:[],
        plus:[]
    },
    getDis(param){
        var that = this
        wx.showLoading({
            title: '加载中...'
        })
        wx.request({
            url: `https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=${param}`,
            
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type': 'application/json'}, // 设置请求的 header
            success: function(res){
                // success
                console.log(res)
                if(res){
                   that.setData({
                      mini:res.data.data.mini.list,
                      plus:res.data.data.plus.list 
                   })
                }
                
            },
            fail: function() {
                // fail
            },
            complete: function() {
                wx.hideLoading()
            }
        })
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
      console.log(options)
      this.getDis(options.id)
    }
    
})