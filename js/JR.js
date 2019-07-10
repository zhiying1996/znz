!(function () {
            var K, metaViewport
            var rootElement = document.documentElement
            var suitObj = {}
            var userAgent = window.navigator.userAgent
            // 是否为ios系统
            var isIphone = (!!userAgent.match(/android/gi), !!userAgent.match(/iphone/gi))
            // 是否为OS 9_3
            var isOS = isIphone && !!userAgent.match(/OS 9_3/)
            // 像素比
            var devicePixelRatio = window.devicePixelRatio
            // isApple
            var isApple = isIphone && !isOS
            var isPhone6 = devicePixelRatio >= 3
            var isPhone5 = devicePixelRatio >= 2

            function L() {
                var a = rootElement.getBoundingClientRect().width
                a / dataDpr > 768 && (a = 768 * dataDpr)
                var d;
                var u = navigator.userAgent;
                if (u.indexOf('MX6') >= 0) {
                    d = (a / 7.5) * 0.6;
                } else {
                    d = a / 7.5
                }
                rootElement.style.fontSize = d + 'px'
                suitObj.rem = window.rem = d
                if(document.getElementById('app').offsetWidth>1100){
                    rootElement.style.fontSize='60px'
                }else{
                    console.log(document.getElementById('app').offsetWidth)
                    rootElement.style.fontSize = d * a / document.getElementById('app').offsetWidth + 'px'
                }
            }
            var x, y
            if (isPhone5) {
                x = 2
            } else {
                x = 1
            }
            if (isPhone6) {
                y = 3
            } else {
                y = x
            }
            // 若是apple,data-dpr为devicePixelRatio,否则都为1,缩放比为 "1/像素比"
            // var dataDpr = isApple ? y : 1
            var dataDpr = 1
            var scale = 1 / dataDpr

            // 设置 html 的data-dpr
            rootElement.setAttribute('data-dpr', dataDpr)
            metaViewport = document.createElement('meta')
            metaViewport.setAttribute('name', 'viewport')
            metaViewport.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
            // 插入meta标签
            if (document.firstElementChild) {
                rootElement.firstElementChild.appendChild(metaViewport)
            } else {
                var u = document.createElement('div')
                u.appendChild(metaViewport)
                document.write(u.innerHTML)
            }
            window.addEventListener('resize', function () {
                clearTimeout(K)
                K = setTimeout(L, 300)
            })
            window.addEventListener('pageshow', function (b) {
                b.persisted && (clearTimeout(K), K = setTimeout(L, 300))
            })
            var isReady = (document.readyState === 'complete')
            if (isReady) {
                document.body.style.fontSize = 12 * dataDpr + 'px'
            } else {
                document.addEventListener('DOMContentLoaded', function () {
                    document.body.style.fontSize = 12 * dataDpr + 'px'
                })
            }
            L()
            suitObj.dpr = window.dpr = dataDpr
            suitObj.refreshRem = L
            suitObj.rem2px = function (d) {
                var c = parseFloat(d) * this.rem
                typeof d && d.match(/rem$/) && (c += 'px') === 'string'
                return c
            }
            suitObj.px2rem = function (d) {
                var c = parseFloat(d) / this.rem
                typeof d && d.match(/px$/) && (c += 'rem') === 'string'
                return c
            }
        })()