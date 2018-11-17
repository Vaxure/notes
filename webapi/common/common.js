/*******************属性操作****************** */
/**
 * 获取文本内容
 * innerText和textContent存在兼容问题
 * 谷歌：两个都支持
 * firefox: 新版两个都支持， 旧版只支持textContent
 * IE: IE9以上两个都支持 旧版：只支持innerText
 */
function getInnerText(element) {
    if (typeof element.getInnerText === 'string') {
        return element.getInnerText;
    } else {
        return element.textContent;
    }
}

/**
 * 设置文本的内容
 */
function setInnerText(element, content) {
    if (typeof element.innerText === 'string') {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}

/*******************节点操作****************** */
/**
 * 获取id节点的封装
 */
function my$(id) {
    return document.getElementById(id);
}

/**
 *  取第一个子元素
 *  firstChild获取的是节点
 *  firstElementChild IE9才可用
 */
function getFirstElementChild(element) {
    var node,
        nodes = element.childNodes,
        i = 0;
    while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

/**
 *  获取最后一个子元素
 *  lastChild获取的是节点
 *  lastElementChild IE9才可用
 */
function getLastElementChild(element) {
    var node,
        nodes = element.childNodes,
        i = nodes.length - 1;
    while (node = nodes[i--]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

/**
 *  获取下一个兄弟元素
 *  nextSibling获取的是节点
 *  nextElementSibling IE9才可用, IE8为undefined
 */

function getNextElementSibling(element) {
    var el = element;
    while (el = el.nextSibling) {
        if (el.nodeType === 1) {
            return el;
        }
    }
    return null;
}

/**
 *  获取上一个兄弟元素
 *  previousSibling获取的是节点
 *  previousElementSibling IE9才可用, IE8为undefined
 */

function getPreviousElementSibling(element) {
    var el = element;
    while (el = el.previousSibling) {
        if (el.nodeType === 1) {
            return el;
        }
    }
    return null;
}

/*******************事件注册****************** */
/**
 *  注册事件
 *  addEventListener IE9以前的不支持
 *  attachEvent IE6-IE10支持，其他浏览器不支持
 */
function addEventListener(element, eventName, fn) {
    // 判断当前浏览器是否支持addEventListener
    if (element.addEventListener) {
        element.addEventListener(eventName, fn);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = fn;
    }
}

/**
 *  移除事件
 *  removeEventListener IE9以前的不支持
 *  detachEvent IE9-IE10支持，其他浏览器不支持
 */
function removeEventListener(element, eventName, fn) {
    // 判断当前浏览器是否支持removeEventListener
    if (element.removeEventListener) {
        element.removeEventListener(eventName, fn);
    } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = none;
    }
}

/*******************页面XY操作****************** */
/**
 *  获取页面的xy
 *  pageX,pageY IE9以前的不支持
 *  方法: 通过clientX + 页面滚动距离来模拟
 */

//获取鼠标在页面上的位置
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    }
}

//获取滚动的距离
function getScroll() {
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return {
        scrollLeft: screenLeft,
        scrollTop: scrollTop
    }
}

/*******************日期操作****************** */
/**
 * 获取两个日期之间的时间差
 * @param {*} start 
 * @param {*} end 
 */
function getInterval(start, end) {
    // 两个日期对象相差的毫秒数
    var interval = end - start;
    // 求 相差的天数/小时数/分钟数/秒数
    var day, hour, minute, second;
    // 求相差的秒数
    interval /= 1000;

    day = Math.round(interval / 60 / 60 / 24);
    hour = Math.round(interval / 60 / 60 % 24);
    minute = Math.round(interval / 60 % 60);
    second = Math.round(interval % 60);

    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
}