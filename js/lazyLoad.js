function LazyLoad(opt){
	this.opt = {top: 0, delay: 100};
	this.data = Array.from(document.querySelectorAll('img[data-role=LazyLoad]'));
	this.winHeight = window.innerHeight;
	this.timer = null;
	this.opt = opt;
	this.observer = typeof IntersectionObserver;
	this.init();
	
}
LazyLoad.prototype = {
	//  初始化函数
	init: function(){
		if (this.observer === 'function') {
			this.observer = new IntersectionObserver(
				(entries) => {
				  entries.forEach((entry) => {
				     if (entry.intersectionRatio > 0 && entry.intersectionRatio <= 1) {
				     	let item = entry.target
				     	this.loadImg(item)
		                this.observer.unobserve(item);
		             }   
				  });
				}
			);
			this.checkImgsByObserver();
		} else {
			this.checkImgsByClient();
			window.addEventListener('scroll', () => {
				this.throttle(this.checkImgsByClient, this)
			});
		}
		console.log(this)
	},
	// 用getBoundingClientRect判断图片
	checkImgsByClient: function() {
		this.data.forEach((item) => {
			if(this.isShow(item)){
				this.loadImg(item)
			}
		});
	},
	// 用IntersectionObserver判断图片是否可见
	checkImgsByObserver: function() {
	    this.data.forEach((item) => {
	    	this.observer.observe(item);
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
