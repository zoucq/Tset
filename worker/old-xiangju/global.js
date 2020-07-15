

function sendHmPoint(data){
    if(!data) return ;
    _hmt.push(['_trackEvent',data.cate,data.action,data.label,data.value]);
}


$(function(){

    $('.global').on('click','.hm_point',function(){
        var optArr = $(this).data('hm').split(',');
        var data = {
            cate:optArr[0],
            action:optArr[1],
            label:optArr[2] || '',
            value:optArr[3] || '',
        }
        sendHmPoint(data);
    });


})

