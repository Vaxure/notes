function Box(parent, options) {
    // 防止对方不传参数
    var options = options || {};
    // 设置对象的属性
    this.backgroundColor = options.backgroundColor || 'red';
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;

    // 创建对应的div
    this.div = document.createElement('div');
    parent.append(this.div);
    // 初始化
    this.init();
}

 // 初始化div的样式 
Box.prototype.init = function () {
    var div = this.div;
    div.style.backgroundColor = this.backgroundColor;
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.left;
    div.style.top = this.top;
    // 脱离文档流
    div.style.position = 'absolute';
}