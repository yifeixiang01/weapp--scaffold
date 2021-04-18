
Component({
	properties: {
    autoFocus: {
      type: Boolean,
      value: true
    },
		confirmText: {
			type: String,
			value: '搜索'
		},
		placeholder: {
			type: String,
			value: '请输入搜索内容'
		},
	},
	data: {
		keyword: '',
    focus: false,
    paddingTop: 0,
	},
	attached() {

	},
	ready(){
    this.getInputPosition();
	},
	detached(){

    
	},
	methods: {
    //输入框输入文字
		onInput: function (e) {
			let keyword = e.detail.value;
			this.setData({keyword})
		},
		//点击确认关键词
		confirmKeyword: function(){
			this.data.timer = setTimeout(() => {
				this.triggerEvent('confirm', {keyword: this.data.keyword})
			}, 500);
		},
		//点击“x”清空输入框
		deleteInput: function () {
			this.triggerEvent('clearkeyword')
			this.setData({ keyword: '' })
    },
    getInputPosition: function(){
      let query = this.createSelectorQuery()
      query.select('.search-box').boundingClientRect().exec(rect => {
        console.log(rect)
      })
    }
	}
})