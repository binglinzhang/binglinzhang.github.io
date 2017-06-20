$("#renameHeadline").click(function() { //重命名题库
    var inputMsgB = $("#headlineMSG").val();
    if (inputMsgB) {
        $.ajax({
            "type": "get",
            "url": "/editHeadline",
            "data": $.param({
                "editHeadline": inputMsgB,
                "innertext": $(".tiku_span1 a i b").text()
            }),
            "success": function(data) {
                if (data == "success") {
                    location.href = "/tiku/" + inputMsgB;
                }
            }
        })
    }
})

$("#deleteTiku").click(function() { //删除题库
    if (confirm("确认删除吗？")) {
        $.ajax({
            "type": "get",
            "url": "/deleteTiku",
            "data": $.param({
                "innertext": $(".tiku_span1 a i b").text()
            }),
            "success": function(data) {
                if (data == "success") {
                    location.href = "/home";
                }
            }
        })
    }
})

function getValBack(e) { //获取题目内容
    e.previousSibling.classList.remove('checked');
    $.ajax({
        "type": "get",
        "url": "/tiku/" + $(".tiku_span1 a i b").text(),
        "data": $.param({
            "innertext": e.innerHTML
        }),
        "success": function(data) {
            $(".form-control.input-sm.qushead").val(data.tikuTitle);
            $("#textareaHeadline").val(data.tikuHeadline);
            $("#textareaContent").val(data.tikuContent);
        }
    })
}

function getValBack2(inputValue) { //获取题目内容的函数调用
    $.ajax({
        "type": "get",
        "url": "/tiku/" + $(".tiku_span1 a i b").text(),
        "data": $.param({
            "innertext": inputValue
        }),
        "success": function(data) {
            $(".form-control.input-sm.qushead").val(data.tikuTitle);
            $("#textareaHeadline").val(data.tikuHeadline);
            $("#textareaContent").val(data.tikuContent);
        }
    })
}

//新增题目
function addMoreExercise() {
    $('.form-control.input-sm.qushead').attr("disabled", false);
    $("#textareaHeadline").attr("disabled", false);
    $("#textareaContent").attr("disabled", false);
    $(".form-control.input-sm.qushead").val("");
    $("#textareaHeadline").val("");
    $("#textareaContent").val("");
}

//激活编辑题目
function editExercise() {
    var count = 0;
    for (var i = 0; i < $(".icheckbox_minimal-green.checked").length; i++) {
        var eleVal = $(".icheckbox_minimal-green.checked")[i].nextSibling.innerHTML;
        count++;
    }
    if (count == 1) {
        getValBack2(eleVal);
        $("#textareaHeadline").attr("disabled", false);
        $("#textareaContent").attr("disabled", false);
        $(".tiku_div1 :button").attr("disabled", true);
        $("input[type='checkbox']").attr("disabled", true);
        $(".checkbox label span").removeAttr("onclick");
        $(".checkbox label").css("cursor", "not-allowed");
    } else {
        qikoo.dialog.alert("只能选择1 道题进行编辑");
    }
}

 //保存新增题目要求
 function saveInput() {
     var titleVal = $(".form-control.input-sm.qushead").val();
     var headlineVal = $("#textareaHeadline").val();
     var contentVal = $("#textareaContent").val();
     if (!headlineVal) {
         headlineVal = '未输入题干要求，请点击编辑按钮编辑 ...'
     }
     if (!contentVal) {
         contentVal = '未输入题目答案，请点击编辑按钮编辑 ...'
     }
     if (typeof($("#textareaHeadline").attr("disabled")) == "undefined") { //判断该元素的某一属性是否存在,没有激活状态下点击无效
         if (titleVal) {
             $.ajax({
                 "type": "get",
                 "url": "/newExercise",
                 "data": $.param({
                     "innertext": $(".tiku_span1 a i b").text(),
                     "obj": {
                         "tikuTitle": titleVal,
                         "tikuHeadline": headlineVal,
                         "tikuContent": contentVal
                     }
                 }),
                 "success": function(data) {
                     if (data == "success1") { //编辑题目完成后点击保存跳转至此页
                         qikoo.dialog.alert("修改成功！");
                         $(".tiku_div1 :button").attr("disabled", false);
                         $("input[type='checkbox']").attr("disabled", false);
                         $(".checkbox label").css("cursor", "pointer");
                     } else if (data == "success") { //新增题目完成后点击保存跳转至此页
                         qikoo.dialog.alert("保存成功！");
                         $("<div class='checkbox'><input type='checkbox'><span onclick='getValBack(this)'>" + titleVal + "</span></div>").appendTo($(".form-group"));
                         beautifyBox();
                         getValBack2(titleVal);
                     }
                     $(".form-control.input-sm.qushead").attr("disabled", true);
                     $("#textareaHeadline").attr("disabled", true);
                     $("#textareaContent").attr("disabled", true);
                     $(".checkbox label span").attr("onclick", 'getValBack(this)');
                 }
             })
         } else { //没有标题时保存提醒输入标题
             qikoo.dialog.alert("请输入标题！");
         }
     }
 }

//删除题目
function deleteExercise() {
    var ckbxArr = [];
    for (var i = 0; i < $(".icheckbox_minimal-green.checked").length; i++) {
        ckbxArr.push($(".icheckbox_minimal-green.checked")[i].nextSibling.innerHTML);
    }
    if (ckbxArr.length) {
        qikoo.dialog.confirm('确定要删除吗？', function() {
            $.ajax({
                "type": "get",
                "url": "/deleteExercise",
                "data": $.param({
                    "innertext": $(".tiku_span1 a i b").text(),
                    "ckbxArr": ckbxArr
                }),
                "success": function(data) {
                    if (data == "success") {
                        location.reload();
                    }
                }
            })
        })
    } else {
        qikoo.dialog.alert("请选择要删除的题目");
    }
}

//取消编辑
function cancelSubmit() {
    $(".form-control.input-sm.qushead").val('');
    $("#textareaHeadline").val('');
    $("#textareaContent").val('');
    $(".form-control.input-sm.qushead").attr("disabled", true);
    $("#textareaHeadline").attr("disabled", true);
    $("#textareaContent").attr("disabled", true);
    $(".tiku_div1 :button").attr("disabled", false);
    $("input[type='checkbox']").attr("disabled", false);
    $(".checkbox label span").attr("onclick", 'getValBack(this)');
    $(".checkbox label").css("cursor", "pointer");
    getValBack2($(".icheckbox_minimal-green.checked")[0].nextSibling.innerHTML);
}

$("#search-hidden").click(function() {
    qikoo.dialog.alert("开发中 ...");
})

var n = true;
function selectAll() { //全选功能
    if (n) {
        for (let i = 0; i < $(".icheckbox_minimal-green").length; i++) {
            $(".icheckbox_minimal-green")[i].classList.remove('checked');
            $(".icheckbox_minimal-green")[i].classList.add('checked');
        }
        n = false;
    } else {
        for (let i = 0; i < $(".icheckbox_minimal-green").length; i++) {
            $(".icheckbox_minimal-green")[i].classList.remove('checked');
        }
        n = true;
    }
}

// 搜索框动效
document.querySelector('.search').firstChild.addEventListener('mouseover', function() {
    document.querySelector('.search').firstChild.style.cssText = 'width: 30%; box-shadow: 0px 0px 10px 0px rgba(82, 168, 236, 0.8); transition: all 1s'
    document.querySelector('.search').firstChild.focus()
})
document.querySelector('.search').firstChild.addEventListener('mouseout', function() {
    document.querySelector('.search').firstChild.style.cssText = 'width:12%;transition:width 1s'
    document.querySelector('.search').firstChild.blur()
})
