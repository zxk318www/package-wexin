Page({
    data:{
        boards:[
            {key:'PageSubArea/HotPlayMovies.api',title:'正在热映',num: 1},
        
            {key:'Movie/MovieComingNew.api',title:'即将上映',num: 3}
                ],
        hotmovies: [],
        commingmovies: []
    
    },
    retrieveData() {
        let app = getApp()
    
        var promises = this.data.boards.map(function (board) {
            return app.request(`https://api-m.mtime.cn/${board.key}?locationId=292`)
              .then(function (d) {
            
                if (!d) return board
                board.movies = d.movies
                return board
              }).catch(err => console.log(err))
          })
    
       
        return app.promise.all(promises).then(boards => {
         // console.log(boards)
          if (!boards || !boards.length) return
          this.setData({ boards: boards})
        })
    
      },
    getDataFromApi(param,num){
        var that = this;
        wx.request({
            url:  `https://api-m.mtime.cn/${param.key}?locationId=292`,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type': 'application/json'}, // 设置请求的 header
            success: function(res){
              // console.log(res)
                if(res){
                    if(num ==1){
                        that.setData({
                            hotmovies:res.data.movies
                        
                        })
                    }
                
                    else if(num ==3){
                        that.setData({
                            commingmovies:res.data.attention
                        })
                    }
                }
               
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        wx.getStorage({
            key: 'has_shown_splash',
            success: res=>{
                // success
                //获取首页热门电影
                this.getAllData()
               
            },
            fail: err=> {
                // fail
                wx.redirectTo({
                    url: '/pages/douban/splash',
                    success: function(res){
                        // success
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
        })
      
    },
    getAllData(){
        this.getDataFromApi(this.data.boards[0],1)
               
        this.getDataFromApi(this.data.boards[1],3)
    }
   
})