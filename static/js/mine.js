/**
 * Created by chenchuang on 2017/4/30.
 */
window.onload=function() {

    //���click�ӳ�300s
    $(function () {
        FastClick.attach(document.body);
    });

    var lng, lat;
    setWeather();
    setInterval(setWeather,600000);

    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 7;
    var decisionVal = 90;
    var pullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;
    function pullChange() {
        animating = true;
        deg = pullDeltaX / 10;
        $card.css('transform', 'translateX(' + pullDeltaX + 'px) rotate(' + deg + 'deg)');
        var opacity = pullDeltaX / 100;
        var rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
        var likeOpacity = opacity <= 0 ? 0 : opacity;
        $cardReject.css('opacity', rejectOpacity);
        $cardLike.css('opacity', likeOpacity);
    }
    ;
    function release() {
        if (pullDeltaX >= decisionVal) {
            $card.addClass('to-right');
        } else if (pullDeltaX <= -decisionVal) {
            $card.addClass('to-left');
        }
        if (Math.abs(pullDeltaX) >= decisionVal) {
            $card.addClass('inactive');
            setTimeout(function () {
                $card.addClass('below').removeClass('inactive to-left to-right');
                cardsCounter++;
                if (cardsCounter === numOfCards) {
                    cardsCounter = 0;
                    $('.skill_card').removeClass('below');
                }
            }, 300);
        }
        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass('reset');
        }
        setTimeout(function () {
            $card.attr('style', '').removeClass('reset').find('.skill_card_choice').attr('style', '');
            pullDeltaX = 0;
            animating = false;
        }, 300);
    };
    $(document).on('mousedown touchstart', '.skill_card:not(.inactive)', function (e) {
        if (animating)
            return;
        $card = $(this);
        $cardReject = $('.skill_card_choice.m--reject', $card);
        $cardLike = $('.skill_choice.m--like', $card);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;
        $(document).on('mousemove touchmove', function (e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            pullDeltaX = x - startX;
            if (!pullDeltaX)
                return;
            pullChange();
        });
        $(document).on('mouseup touchend', function () {
            $(document).off('mousemove touchmove mouseup touchend');
            if (!pullDeltaX)
                return;
            release();
        });
    });




};
//��ȡ�������
function getWeather(lng,lat){
    $.ajax({
        url: "https://api.caiyunapp.com/v2/Z27Rvkk3lMKu7aZ3/"+lng+","+lat+"/forecast.json",
        dataType: "jsonp",
        type: "Post",
        jsonpCallback: "jsonpCallback",
        success: function (data) {
            var $ul = $("<ul></ul>");
            var w_state=data.result.hourly.description;
            var items=data.result.hourly.skycon;//����״��
            var rains=data.result.hourly.precipitation;//����ǿ��
            var get_state=data.result.minutely.description;
            $(".mine-weather").html(get_state);
        },
        error: function (responseText, textStatus, XMLHttpRequest) {
            alert(textStatus);
        }
    });
}
//��ȡ������������
function setWeather(){
    navigator.geolocation.getCurrentPosition(
        function (position) {
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            getWeather(lng,lat);
            // �ٶȵ�ͼAPI����
            var map = new BMap.Map();    // ����Mapʵ��
            //var point1 = new BMap.Point(120.0022029877, 31.8326856467);
            var point1 = new BMap.Point(lng,lat);
            var point2 = new BMap.Point(120.0023317337, 31.8325033439);
            var distance =map.getDistance(point1, point2);
            var myDist=(distance/1000).toFixed(2);
            $('#distance').text('About '+myDist+' Km');
        });
}
//��ֹ��Ļ���¹���
function preventDefault(e) {
    e = e || window.event;
    e.preventDefault && e.preventDefault();
    e.returnValue = false;
}
function stopPropagation(e){
    e = e || window.event;
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = false;
}
function innerScroll(e){
    // ��ֹð�ݵ�document
    // document���Ѿ�preventDefault
    stopPropagation(e);
    var delta = e.wheelDelta || e.detail || 0;
    var box = $(this).get(0);

    if($(box).height() + box.scrollTop >= box.scrollHeight){
        if(delta < 0) {
            preventDefault(e);
            return false;
        }
    }
    if(box.scrollTop === 0){
        if(delta > 0) {
            preventDefault(e);
            return false;
        }
    }
}


