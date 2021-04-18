// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    demoList: [{
      page: '/pages/wt-list-scroll-demo/wt-list-scroll-demo', name: 'wt-list-scroll demo'
    },
    {
      page: '/pages/wt-startup-demo/wt-startup-demo', 
      name: 'wt-startup demo'
    },
    {
      page: '/pages/wt-input-search/wt-input-search', 
      name: 'wt-input-search demo'
    }]
  },
  onLoad(){

  },
  toDemoPage(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  }
})
