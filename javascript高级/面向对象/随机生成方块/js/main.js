// 生成10个方块
var container = document.getElementById('container');

// 定义一个数组去存储创建的方块
var arr = [];
for (var i = 0; i < 10; i++) {
    var r = Tools.getRandom(0, 255);
    var g = Tools.getRandom(0, 255);
    var b = Tools.getRandom(0, 255);
    var box = new Box(container, {
        backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')'
    });

    // 把创建好的方块添加到数组中
    arr.push(box);
}

// 设置随机位置 开启定时器
setInterval(randomBox, 500);
// 页面加载完成先生成随机位置
randomBox();

// 定时器函数
function randomBox() {
    for (var i = 0; i < arr.length; i++) {
        var box = arr[i];
        box.random();
    }
}