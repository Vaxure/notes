
/**
 * 公共的操作
 */


/**
 *  节点的操作
 */

// 获取第一个子元素
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

// 获取最后一个子元素
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