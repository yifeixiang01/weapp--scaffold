import {appInfo} from '../../utils/constants'
Component({
  properties: {
    delayTime: {    //启动页保留时长
      type: Number,
      value: 2000
    }
  },
  data: {
    appName: appInfo.appChsName,
    show: true
  },
  created(){
    setTimeout(() => {
      this.setData({show: false})
      this.triggerEvent('startuphide')
    }, this.data.delayTime)
  },
  methods: {

  }
})
