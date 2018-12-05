Page({
    data:{
       type: 'hotmovies',
       movies: [],
       num:0
    },
    getListData(param,num){
    
        var that =this
        wx.showLoading({
            title: '加载中...'
        })
        wx.request({
            url: `https://api-m.mtime.cn/${param}?locationId=292`,
            
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type': 'application/json'}, // 设置请求的 header
            success: function(res){
                // success
                console.log(res)
                if(res){
                    if(num === '0'){
                        var data = res.data.movies
                        that.setData({
                            movies: data,
                            num:0
                        })
                    }else if(num === '1'){
                        var data = res.data.moviecomings
                        that.setData({
                            movies: data,
                            num:1
                        })
                    }
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
        this.getListData(options.id,options.num)
    },
    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
        
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
       
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
      
    },
    onUnload:function(){
        // 生命周期函数--监听页面卸载
       
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
       
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
       
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
    }
})