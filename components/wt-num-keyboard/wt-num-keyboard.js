Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mileageData: String,
    placeholderTitle:{
      type:String,
      value:''
    },
    errorTips: {
      type: String,
      value: ''
    },
    errorTitle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyVal: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "", ],
    sum: "",
    color: false, //密码小于4-6位字体颜色提醒
    errorTips:false, //错误提醒

  },
  ready() {
    this.setData({
      sum: this.data.mileageData
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //数字键盘
    addval(e) {
      const item = e.currentTarget.dataset['item']
      const index = e.currentTarget.dataset['index']
      //初始化
      if (this.data.sum == "") {
        this.setData({
          sum: ""
        })
      }
      //删除数字
      if (index == 11) {
        if (this.data.sum == "") {
          return;
        };
        this.setData({
          sum: this.data.sum.substring(0, this.data.sum.length - 1)
        });
      } else if (!(this.data.sum.length == 11 || index ==11)) {
        //拼接赋值数字
        this.setData({
          sum: this.data.sum + item
        })
      }
    },
    //清除数字
    eliminate() {
      this.setData({
        sum: "",
        color: false,
        errorTips: false
      })
    },
    //取消
    cancle() {
      this.triggerEvent("mileageWay", {
        status: false,
        distinction: true
      })
    },
    //确定
    submitnum() {
      this.triggerEvent("confirmInputValue", {
        status: false,//取消弹窗
        data: this.data.sum,//页面显示所需数据
      })
      // if (this.data.sum == "") return
      // if (this.data.sum.length < 4) {
      //   this.setData({
      //     color:true,
      //     errorTips:true
      //   })
      //   return
      // } else {
      //   this.setData({
      //     color: false,
      //     errorTips: true
      //   })
      // }

      // this.triggerEvent("mileageWay", {
      //   status: false, //取消弹窗
      //   data: this.data.sum, //页面显示所需数据
      // })
    }
  }
})