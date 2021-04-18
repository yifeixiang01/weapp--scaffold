
import http from '../../libs/http';
import {apiInfo} from '../../utils/constants';
import base from '../../libs/base'

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
	properties: {
		apiName: {
			type: String,
			value: ''
		},
		params: {
			type: Object,
			value: null
		},
		autoload: {
			type: Boolean,
			value: false
		},
		noMoreContent: {
			type: String,
			value: '没有更多数据'
		},
	},
	data: {
		url: '',
		requestParams: {
			size: 10
		},
		loadError: false,
		showLoadingIcon: true,
		noData: false,
		listLen: 0,
		isRequesting: false    //是否在请求数据，一个请求没有完成不会触发下次请求
	},
	attached: function(){
		if(!apiInfo[this.data.apiName]) {
			console.warn(`请先在/utils/constants.js文件中添加此接口：“apiInfo.${this.data.apiName}”，才可以进行列表请求......*^~^*`)
			return 
		}

		this.data.url = apiInfo[this.data.apiName];
		this.data.requestParams = JSON.parse(JSON.stringify(this.data.params))

		//autoload为true时，组件加载完成会自动请求一次数据
    this.data.autoload && this.getListData();
	},
	ready: function(){
		
	},
	methods: {
		//获取列表数据
		getListData: function(){
			console.log('开始获取列表数据')
			//判断是否正在加载数据，一次请求完毕才可以请求下一次
			if(this.data.isRequesting){
				console.log('正在请求数据，数据加载完才可以继续加载...')
				return 
			}

			//开始请求数据
			this.setData({showLoadingIcon: true, isRequesting: true})

			http({
				url: this.data.url,
				method: 'POST',
				data: this.data.requestParams,
				isShowLoading: this.data.listLen === 0,
			}).then(res => {
				console.log('scroll-list请求数据', res)
				let data = res.data.data;
				
				this.triggerEvent('getlist', {data})
				let listLen = this.data.listLen + data.length;
				this.setData({loadError: false, noData: data.length == 0, isRequesting: false, showLoadingIcon:false, listLen})
				this.data.requestParams.data.from += this.data.params.data.size;
				console.log(this.data)
			}).catch(err => {
				console.log('list scroll 请求失败', err)

				wx.showToast({
					title: '加载失败请稍候重试',
				})
				this.setData({loadError: true, showLoadingIcon: false, isRequesting: false})
				
			})
		},
		//触底，加载更多
		onScrollToLower: function(){
			console.log('列表触底，加载更多')
			if(!this.data.noData){
        this.getListData();		
      }
		},
		//初始化数据
		initData: function(){
			this.setData({
				loadError: false,
				showLoadingIcon: false,
				noData: false,
				listLen: 0,
				isRequesting: false
			})
			this.data.requestParams = JSON.parse(JSON.stringify(this.data.params));
		}, 
		//重新加载数据
		reloadData: function(){
			console.log('重新加载数据')
			this.initData();
			
			this.getListData();
		},
	}
})
