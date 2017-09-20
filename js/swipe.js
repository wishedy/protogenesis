/**
 * Created by 萤火虫 on 2017/9/21.
 */
$(document).ready(function(){
    var dataArrSlide = [];
    var excursion = 30;//偏移量
    var speed= 1000;//偏移速度
    function swipeArr(data){
        var returnData = JSON.parse(JSON.stringify(data));
        var dele_value=returnData.shift();
        //console.log(returnData)
        var newData = [];
        for(var num = 0 ;num<returnData.length;num++){
            newData.push(returnData[num]);
        }
        newData.push(dele_value);
        return newData;
    }
    $("[data-slide]").each(function(){
        var isHas = true;
        var tyId = $(this).attr("data-slide");
        $.each(dataArrSlide,function(i,v){
            if(v===tyId){
                isHas = false;
            }
        })
        if(isHas){
            dataArrSlide.push(tyId);
        }
    });
    $.each(dataArrSlide,function(i,v){
        var zIndexArr = [];
        var slideList = $('[data-slide="'+v+'"]');
        var nowLen    = slideList.length;
        slideList.each(function(i){

            var max = false;
            if(i===0){
                max = true;
            }
            $(this).css({"left":-i*excursion,top:i*excursion,zIndex:nowLen-i}).attr({"data-max":max});
            var dataJson = {
                "left":-i*excursion,
                top:i*excursion,
                zIndex:nowLen-i,
                max:max
            };
            zIndexArr.push(dataJson);
        });
        var operateObj = $('[data-slide-change="'+v+'"]');
        operateObj.attr({"data-animate":JSON.stringify(zIndexArr)});
        operateObj.off("click").on("click",function(){
            var isThis = $(this);
            var newData = swipeArr(JSON.parse(isThis.attr("data-animate")));
            isThis.attr({"data-animate":JSON.stringify(newData)});
            var slideList = $('[data-slide="'+isThis.attr("data-slide-change")+'"]');
            slideList.each(function(i){
                var isSilde = $(this);
                var nowData = newData[i];
                var nextLeft = nowData.left;
                var nextZindex = nowData.zIndex;
                var nextTop = nowData.top;
                var max = nowData.max;
                isSilde.attr({"data-max":max}).animate({zIndex:nextZindex,left:nextLeft,top:nextTop},speed,"linear",function(){
                });
            });
        });
    });
});