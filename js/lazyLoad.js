function LazyLoad(){
	this.data = Array.from(document.querySelectorAll('img[data-role=LazyLoad]'));
	this.loadGif = this.data[0].src;
	this.winHeight = window.innerHeight;
	this.timer = 1;
	this.opt = {
		top: 50,
		delay: 100
	}
	this.checkImgs();
	this.init();
	
}
LazyLoad.prototype = {
	init: function(){
		window.addEventListener('scroll', () => {
			this.throttle(this.checkImgs, this)
		});
	},
	checkImgs: function() {
		// console.log(this)
		this.data.forEach((item) => {
			if(this.isShow(item)){
				this.loadImg(item)
			}
		})
	},
	loadImg: function(item) {
		if (item.src == this.loadGif) {
			let src = item.dataset.src;
			item.src = src;
		}
	},
	isShow: function(item) {
		let bound = item.getBoundingClientRect();
		if (bound.top < (this.winHeight - this.opt.top)){
			return true;
		} else {
			return false;
		}
	},
	throttle: function(fn, context){
		let opt = this.opt;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			fn.call(context);
		}, opt.delay);
	}
}
var lazyLoad = new LazyLoad();