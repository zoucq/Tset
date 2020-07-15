import WxTouchEvent from "../../../utils/wx-touch-event";

let infoListTouchEvent = new WxTouchEvent();//在 Page外实例化函数，可以直接复制给 Page 中的回调函数
Page({
    data:{
        current:0,
        translateX:0,
        animationData:{},
        clientX:0
    },
    onLoad: function () {
        let that=this;
        this.infoListTouchEvent = infoListTouchEvent;
        this.infoListTouchEvent.bind({//初始化后绑定事件
            swipe: function (e) {
                // return ;
                console.log(e.direction,e);
                if (e.direction=='Left'){
                    if (that.data.current >= 2) {
                        that.setData({
                            current: 2
                        });
                    } else {
                        that.setData({
                            current: that.data.current + 1
                        });
                    }
                    that.setData({
                        translateX: (that.data.current * -640) + 'rpx'
                    });
                    that.fadeIn();
                    
                    
                }else if (e.direction == 'Right') {
                    if(that.data.current <= 0){
                        that.setData({
                            current: 0
                        });
                    }else{
                        that.setData({
                            current: that.data.current - 1
                        });
                    }
                    that.setData({
                        translateX: (that.data.current * -640) + 'rpx'
                    });
                    that.fadeIn();
                    
                }
            },
            doubleTap: function (e) {
                console.log(e);
            },
            tap: function (e) {
                console.log(e);
            }.bind(this),
            longTap: function (e) {
                console.log(e);
            },
            rotate: function (e) {
                console.log(e)
            }.bind(this),
            pinch: function (e) {
                console.log(e);
            },
            touchStart:function(e){
                console.log('start',e);
                // that.setData({
                //     clientX: e.changedTouches[0].clientX + 'px'
                // });
            },
            touchMove:function(e){
                console.log('move', e.changedTouches[0].clientX);
                // that.setData({
                //     translateX: e.changedTouches[0].clientX+'px'
                // });
            }

        })
    },
    touchStart: infoListTouchEvent.start.bind(infoListTouchEvent),
    touchMove: infoListTouchEvent.move.bind(infoListTouchEvent),
    touchEnd: infoListTouchEvent.end.bind(infoListTouchEvent),
    touchCancel: infoListTouchEvent.cancel.bind(infoListTouchEvent),
    fadeIn() {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear',
        })

        this.animation = animation

        animation.opacity(0.4).step()

        this.setData({
            animationData: animation.export()
        })

        setTimeout(function () {
            animation.opacity(1).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 400)
    }

});