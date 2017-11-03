# lazyLoad
图片懒加载  线上地址： https://songstarr.github.io/lazyLoad

## 用法
首先引入JavaScript脚本
```html
<script src="js/lazyLoad.js"></script>
```
再添加要懒加载的图片
```html
<img src="" 
     alt="" 
     data-role="LazyLoad"  
     data-src="./img/2b.png" >
```
```javascript
data-role: 标记图片引入lazyLoad 懒加载
data-src： 要加载的图片
```
### 参数
```javascript
var lazyLoad = new LazyLoad({
			top: 80, // 距离低端多少px开始加载图片
			delay: 100 // 节流延迟（鼠标滚动停止delay开始判断加载图片）
		});
```          
## 注意事项
