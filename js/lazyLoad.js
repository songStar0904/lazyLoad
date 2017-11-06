function LazyLoad(opt = {
	top: 50,
	delay: 100
}){
	this.data = Array.from(document.querySelectorAll('img[data-role=LazyLoad]'));
	this.winHeight = window.innerHeight;
	this.timer = null;
	this.opt = opt;
	this.init();
	
}
LazyLoad.prototype = {
	//  初始化函数
	init: function(){
		this.checkImgs();
		window.addEventListener('scroll', () => {
			this.throttle(this.checkImgs, this)
		});
	},
	// 判断图片
	checkImgs: function() {
		// console.log(this)
		this.data.forEach((item) => {
			if(this.isShow(item)){
				this.loadImg(item)
			}
		})
	},
	// 加载图片
	loadImg: function(item) {
		if (!item.getAttribute('src')) {
			let src = item.dataset.src; // 赋值data-src
			this.preLoadImg(src, function(){
				item.src = src;
				console.log('complete: ' + item.src);
			})
		}
	},
	// 预加载图片
	preLoadImg: function(src, callback) {
		var img = new Image();
		img.src = src;
		if (!!window.ActiveXObject) {
			// ie
			img.onrendystatechange = function(){
				if (this.readyState == 'complete') {
					callback();
				}
			}
		} else {
			// 非ie
			img.onload = function() {
				callback();
			}
		}
<<<<<<< HEAD
                img.src = src;
=======
>>>>>>> 完善预加载图片
	},
	// 是否在可见范围
	isShow: function(item) {
		let bound = item.getBoundingClientRect();
		if (bound.top < (this.winHeight - this.opt.top)){
			return true;
		} else {
			return false;
		}
	},
	// 函数节流
	throttle: function(fn, context){
		let opt = this.opt;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			fn.call(context);
		}, opt.delay);
	}
}
