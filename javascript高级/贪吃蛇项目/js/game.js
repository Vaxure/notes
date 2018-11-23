/**
 * 游戏对象
 */
(function () {

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
            that.snake.move();
            that.snake.render(that.map);
            // 判断是否遇到边界
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert('game over');
                clearInterval(timerId);
            }

            if (headY < 0 || headY >= maxY) {
                alert('game over');
                clearInterval(timerId);
            }
        }, 150);
    }

    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
            }
        });
    }

    window.Game = Game;
})();

// *********************测试******************
var map = document.getElementById('map');
var game = new Game(map);
game.start();