/**
 * 游戏对象
 */
;(function () {

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
})()