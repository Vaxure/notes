/**
 * 工具类
 * 
 */

;
(function() {
	var Tools = {
		// 获取随机数
		getRandom: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		// 对象的拷贝
		extend: function(parent, child) {
			for(var key in parent) {
				// 不给wsc复制同名属性
				if(child[key]) {
					continue;
				}
				child[key] = parent[key];
			}
		}
	}

	// 暴露tools给window
	window.Tools = Tools;
})()