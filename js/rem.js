(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',  //判断横竖屏状态
        recalc = function () {
            var clientWidth = docEl.clientWidth;  //屏幕的宽度
            if (!clientWidth) return;             //如果未获取到屏幕宽度，终止函数
            if(clientWidth>=750){                 //如果屏幕的宽度大等于750px，则设置根文件文字大小为100px;
                docEl.style.fontSize = '60px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);