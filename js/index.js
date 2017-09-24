
$(".phoenix-swiper-next").swipeChange({
    /*$(".phoenix-swiper-next")
    * 这个元素时控制按钮例如上一个
    * 或下一个
    *
    * */
    speed:1000,//运动的速度
    excursion:30,//元素偏移量，30px
    dire:1,//方向，0整箱，1反向
    controlName:"one",//名字是想要操控的slide元素组
    callBack:function(i){
        console.log(i);//i代表目前在最上面的元素是是原来的第几个子元素
    }

});