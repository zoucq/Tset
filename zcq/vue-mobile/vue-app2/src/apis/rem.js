(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if(clientWidth < 320) {
                docEl.style.fontSize = 50 + 'px'
            } else if(clientWidth > 750) {
                docEl.style.fontSize = 100 + 'px'
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    recalc();
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);