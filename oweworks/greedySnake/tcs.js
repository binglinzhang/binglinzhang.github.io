var box = 20;    //定义一个格子的宽度
var borderWidth = 15;
var borderHeight = 15;
var foodPos = {    //食物初始化位置
    x:0,
    y:0
};
var headPos = {    //蛇头初始化位置
    x:0,
    y:0
};
var timerID;    //定义一个全局定时器名称
var direction = "right";    //初始化方向

$(function () {
    initFoodPos();    //产生食物随机位置
    initTimer();    //初始化定时器
    initEvent();    //键盘事件
})

function initFoodPos() {    //食物随机位置的生成
    foodPos.x = Math.floor(Math.random() * borderWidth);    //范围0--14
    foodPos.y = Math.floor(Math.random() * borderHeight);
    $(".food").css({
        "left":(foodPos.x * box) + "px",
        "top":(foodPos.y * box) + "px"
    });
}

function initEvent() {
    $(document).keydown(function(evt) {   //键盘事件监听
        var e = evt || window.event;
        switch (e.keyCode) {
            case 37:
                direction = "left";
                break;
            case 38:
                direction = "up";
                break;
            case 39:
                direction = "right";
                break;
            case 40:
                direction = "down";
                break;
        }
    });
    $(document).swipe({  //触摸滑动事件
        swipe:function(event,dir,distance,duration,fingerCount,fingerData) {
            direction = dir;
        }
    });
}

var tailPosArr = [];    //定义一个数组接收每个经过的点坐标，方便蛇头蛇尾碰撞时对比操作
function initTimer() {
    timerID = setInterval(function() {
        var point = {};
        point.x = headPos.x;
        point.y = headPos.y;
        tailPosArr.push(point);
        var tmp = $("<div class='tail'><div>");
        tmp.css({
            "left":point.x * box + "px",
            "top":point.y * box + "px",
            "background":"pink",
            "position":"absolute",
            "width":"20px",
            "height":"20px"
        });
        $("#border").append(tmp);   //蛇头经过的路径

        switch (direction) {
            case "up":
                headPos.y --;
                break;
            case "down":
                headPos.y ++;
                break;
            case "left":
                headPos.x --;
                break;
            case "right":
                headPos.x ++;
                break;
        }
        $(".head").css({
            "left":headPos.x * box + "px",
            "top":headPos.y * box + "px"
        });
        //判断蛇头与食物相遇问题
        if (headPos.x == foodPos.x && headPos.y == foodPos.y) {
            initFoodPos();
        } else {
            $(".tail").first().remove();  //删除第一个tail
            tailPosArr.shift();  //删除蛇尾数组第一个元素
        }
        //判断超过边界问题
        if (headPos.x >= borderWidth || headPos.x < 0 || headPos.y >= borderHeight || headPos.y < 0) {
            clearInterval(timerID);
            alert("game over");
        }

        //判断蛇头蛇尾相碰问题
        for (var i = 0;i<tailPosArr.length;i++) {
            if (headPos.x == tailPosArr[i].x && headPos.y == tailPosArr[i].y) {
                clearInterval(timerID);
                alert("game over");
            }
        }
    },300);
}
