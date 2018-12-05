Page({
    data:{
        loading: true,
        movie: {},
        imgurls:[]
    },
    onLoad:function(options){
        console.log(options.id)
        var that= this
        // 生命周期函数--监听页面加载
        wx.request({
            url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=292&movieId=${options.id}`,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             header: {'content-type': 'application/json;charset=utf-8'}, // 设置请求的 header
            success: function(res){
                console.log(res)
                if(res)
                that.setData({
                    movie:res.data.data.basic,
                    loading: false
                })

            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
   
    },
    imgYu(event){
       var src = event.currentTarget.dataset.src;//获取data-src
       var imgList = event.currentTarget.dataset.list;//获取data-list
       if(imgList && imgList.length>0)
       for(var i =0;i<imgList.length;i++){
           this.data.imgurls.push(imgList[i].imgUrl)
       }
       
       //图片预览
         wx.previewImage({
           current: src, // 当前显示图片的http链接
          urls: this.data.imgurls// 需要预览的图片http链接列表
        })
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