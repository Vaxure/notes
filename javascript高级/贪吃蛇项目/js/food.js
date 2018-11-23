/**
 * 只有函数才能开启局部作用域
 * 开启一个新的作用域，避免命名冲突
 */
(function() {
	/**
	 * 应该把变量定义在js文件的头部
	 */
	// 食物的div定位
	var position = 'absolute';
	// 记录上一个食物的对象，用以准备删除
	var elements = [];

	function Food(options) {
		// 配置参数
		// 防止options为空
		var options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.color = options.color || 'green';
	}

	/*************** public ************ */
	// render方法 渲染
	Food.prototype.render = function(map) {
		
		// 删除之前创建的食物
		remove();
		// 随机设置x和y的值, 随机生成食物对象
		this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

		// 动态创建div 页面上显示的食物
		var div = document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		// 设置div的样式
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
		div.style.position = position;
	}

	/*************** private ************ */
	// 删除食物
	// 这个方法是不被外界知道的，一个内部用的方法
	// 用了(function(){})()后这个remove方法外界是无法访问的
	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			// 删除div
			elements[i].parentNode.removeChild(elements[i]);
			// 删除数组中的元素
			elements.splice(i, 1);
		}
	}
	
	// 开启外部对函数作用域的访问
	window.Food = Food;
})();