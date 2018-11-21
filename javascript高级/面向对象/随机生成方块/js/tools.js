/**
 * 工具对象就一个，不需要用构造函数
 */
var Tools = {
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}