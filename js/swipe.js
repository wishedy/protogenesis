/*
/!**
 * Created by 萤火虫 on 2017/9/21.
 *!/

    var dataArrSlide = [];
    var excursion = 30;//偏移量
    var speed= 1000;//偏移速度
    function swipeArr(data,dire){
        var returnData = JSON.parse(JSON.stringify(data));

        //console.log(returnData)
        var newData = [];
        if(dire===0){
            var dele_value=returnData.shift();
            for(var num = 0 ;num<returnData.length;num++){
                newData.push(returnData[num]);
            }
            newData.push(dele_value);
        }else{
            var dele_value0=returnData.pop();
            newData.push(dele_value0);
            for(var num0 = 0 ;num0<returnData.length;num0++){
                newData.push(returnData[num0]);
            }
        }

        return newData;
    }
    $("[data-slide]").each(function(){
        var isHas = true;
        var tyId = $(this).attr("data-slide");
        $.each(dataArrSlide,function(i,v){
            if(v===tyId){
                isHas = false;
            }
        });
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
            var dire = parseInt(isThis.attr("data-slide-dire"));
            var newData = swipeArr(JSON.parse(isThis.attr("data-animate")),dire);
            isThis.attr({"data-animate":JSON.stringify(newData)});
            var slideList = $('[data-slide="'+isThis.attr("data-slide-change")+'"]');
            operateObj.execute&&operateObj.execute();
            slideList.each(function(i){
                var isSilde = $(this);
                var nowData = newData[i];
                var nextLeft = nowData.left;
                var nextZindex = nowData.zIndex;
                var nextTop = nowData.top;
                var max = nowData.max;
                isSilde.attr({"data-max":max}).animate({zIndex:nextZindex,left:nextLeft,top:nextTop},speed,"linear",function(i){

                });
            });
        });
    });*/
/**
 * Created by 萤火虫 on 2017/9/24.
 */
(function($){
    $.fn.swipeChange = function(options) { //定义插件的名称，这里为userCp
        console.log($(this));
        var changeObj = $(this);
        var swiper = {
            options:options,
            el:changeObj,
            slideList:$('[data-slide="'+options.controlName+'"]'),
            controlName:options.controlName,
            speed:options.speed,
            dire:options.dire,
            init:function(){
                var t = this;
                t.setSwipe().swipe();
                return t;
            },
            swipe:function(){
                var t = this;
                t.el.off("click").on("click",function(){
                    var isThis = $(this);
                    var dire = parseInt(isThis.attr("data-slide-dire"));
                    var newData = t.swiperData(JSON.parse(isThis.attr("data-animate")));
                    isThis.attr({"data-animate":JSON.stringify(newData)});
                    t.slideList.each(function(i){
                        var isSilde = $(this);
                        var nowData = newData[i];
                        var nextLeft = nowData.left;
                        var nextZindex = nowData.zIndex;
                        var nextTop = nowData.top;
                        var max = nowData.max;
                        isSilde.attr({"data-max":max}).animate({zIndex:nextZindex,left:nextLeft,top:nextTop}, t.options.speed,"linear");
                    });
                    t.options.callBack&& t.options.callBack($('[data-max="true"]').index());
                });
            },
            setSwipe: function () {
                var t = this;
                var nowLen    = t.slideList.length;
                var zIndexArr = [];
                t.slideList.each(function(i){
                    var max = false;
                    if(i===0){
                        max = true;
                    }
                    $(this).css({"left":-i* (t.options.excursion),top:i*(t.options.excursion),zIndex:nowLen-i}).attr({"data-max":max});
                    var dataJson = {
                        "left":-i* t.options.excursion,
                        top:i*t.options.excursion,
                        zIndex:nowLen-i,
                        max:max
                    };
                    zIndexArr.push(dataJson);
                });
                var operateObj = t.el;
                operateObj.attr({"data-animate":JSON.stringify(zIndexArr)});
                return t;
            },
            swiperData:function(data){
                var t = this;
                var returnData = JSON.parse(JSON.stringify(data));
                //console.log(returnData)
                var newData = [];
                if(t.options.dire===0){
                    var dele_value=returnData.shift();
                    for(var num = 0 ;num<returnData.length;num++){
                        newData.push(returnData[num]);
                    }
                    newData.push(dele_value);
                }else{
                    var dele_value0=returnData.pop();
                    newData.push(dele_value0);
                    for(var num0 = 0 ;num0<returnData.length;num0++){
                        newData.push(returnData[num0]);
                    }
                }

                return newData;
            }
        };
        swiper.init();
    }
})(jQuery);
