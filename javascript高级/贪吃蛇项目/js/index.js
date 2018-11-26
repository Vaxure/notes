// ---------------------- Tools --------------------------
;(function(w, undefined) {
	var Tools = {
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
	w.Tools = Tools;
})(window, undefined)

// food 和  snake抽象一个父类
;(function(w, undefined) {
	function Parent(options) {
		var options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
	}
	
	/*************** public ************ */
	Parent.prototype.test = function () {
		console.log('测试方法，请忽略');
	}
	
	window.Parent = Parent;
})(window, undefined)


// ---------------------- Food --------------------------
;(function(w, undefined) {
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
		/*this.width = options.width || 20;
		this.height = options.height || 20;*/
		// 借用构造函数
		Parent.call(this, options);
		
		this.color = options.color || 'green';
	}

	/*************** public ************ */
	// 原型继承
	Food.prototype = new Parent();
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
})(window, undefined)

// ---------------------- Snake --------------------------
;(function (w, undefined) {

    var position = 'absolute';
    // 记录之前创建的蛇
    var elements = [];

    function Snake(options) {
        var options = options || {};
        // 蛇节的大小
        /*this.width = options.width || 20;
        this.height = options.height || 20;*/
        Parent.call(this, options);
        // 蛇移动的方向
        this.direction = options.direction || 'right';
        // 蛇的身体（蛇节）
        this.body = [{
                x: 3,
                y: 2,
                color: 'red'
            },
            {
                x: 2,
                y: 2,
                color: 'blue'
            },
            {
                x: 1,
                y: 2,
                color: 'blue'
            }
        ];
    }

    /*************** public ************ */
	// 原型继承
	Snake.prototype = new Parent();
    // 蛇的渲染
    Snake.prototype.render = function (map) {
        // 先删除之前的蛇
        remove();
        // 每一个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            //  蛇节
            var object = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);
            // 记录当前的蛇节
            elements.push(div);
            // 设置样式
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }

    // 控制蛇移动的方法
    Snake.prototype.move = function (food, map) {
        // 控制蛇身体的移动
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头的移动
        // 判断蛇移动的方向
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        // 判断蛇头是否和食物的坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if(headX == food.x && headY == food.y) {
        	// 让蛇增加一个蛇节
        	// 获取蛇的最后一节，添加到蛇的身体里面
        	var last = this.body[this.body.length - 1];
        	var obj = {};
        	Tools.extend(last, obj);
        	this.body.push(obj);
        	/*this.body.push({
        		x: last.x,
        		y: last.y,
        		color: last.color
        	});*/
        	// 重新再地图上生成一个食物
        	food.render(map);
        }
    }

    /*************** private ************ */
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            // 删除蛇节
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中元素
            elements.splice(i, 1);
        }
    }

    window.Snake = Snake;
})(window, undefined)

// ---------------------- Game --------------------------
;(function (w, undefined) {

    var that;

    function Game(map) {
        // 属性
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    /*************** public ************ */
    Game.prototype.start = function () {
        // 把蛇和食物对象渲染到地图
        this.food.render(this.map);
        this.snake.render(this.map);
        // 开始游戏
        // 让蛇移动起来
        runSnake();
        bindKey();
        // 键盘控制蛇的方向

        // 蛇遇到食物
    }

    /*************** private ************ */
    function runSnake() {
        var timerId = setInterval(function () {
            // 让蛇走一格
            // 获取游戏中的蛇对象
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);
            // 判断是否遇到边界
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert('game over');
                clearInterval(timerId);
            }

            if (headY < 0 || headY >= maxY) {
                alert('game over');
                clearInterval(timerId);
            }
        }.bind(that), 150);
    }

    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that));
    }

    window.Game = Game;
})(window, undefined)

// ----------------------调用--------------------------
;(function(w, undefined) {
	var map = document.getElementById('map');
	var game = new Game(map);
	game.start();
})(window, undefined)