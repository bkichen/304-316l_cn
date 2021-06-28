//$(function () {
//    urlinfo = window.location.href;  //获取当前页面的url
//    len = urlinfo.length; //获取url的长度
//    offset = urlinfo.indexOf("guestbook-"); //设置参数字符串开始的位置
//    newsidinfo = urlinfo.substr(offset, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
//    newsids = newsidinfo.split("-"); //对获得的参数字符串按照“=”进行分割
//    newsids1 = newsids[1];
//    newsid2 = newsids1[0]; //得到参数值
//    alert("您要传递的参数值是" + newsid2);
//});
//function getQueryString(name) {
//    urlinfo = window.location.href;  //获取当前页面的url
//    len = urlinfo.length; //获取url的长度
//    offset = urlinfo.indexOf(name); //设置参数字符串开始的位置
//    newsidinfo = urlinfo.substr(offset, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
//    newsids = newsidinfo.split("-"); //对获得的参数字符串按照“=”进行分割
//    newsids1 = newsids[1];
//    newsid2 = newsids1[0]; //得到参数值
//    return newsid2;
//}


//function getQueryString(name) {
//    var reg = new RegExp("(^|&)" + name + "-([^&]*)(&|$)", "i");
//    var r = window.location.search.substr(1).match(reg);
//    if (r != null) return unescape(r[2]);
//    return null;
//}
$(function () {
    $.ajaxSetup({
        async: false
    });
})
function show(im) {
    im.src = "/index/incx/code.aspx?" + new Date;
}
$(function () {
    $(".required").each(function () {
        var $required = $("<strong class='high'> * </strong>");
        $(this).parent().append($required);
    });
    //文本框失去焦点后
    $('.required').blur(function () {
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证标题
        if ($(this).is('#tb_title')) {
            if (this.value == "" || this.value.length < 4) {
                var errorMsg = '请输入主题,主题不能少于4字';
                if (cln == "en") {
                    errorMsg = 'Please input the subject, no less than 4 words';
                }
                $parent.append('<span class="formtips onError">' + errorMsg + '</span>');
            } else {
                var okMsg = '输入正确';
                if (cln == "en") {
                    okMsg = 'OK';
                }
                $parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
            }
        }
        //验证姓名
        if ($(this).is('#tb_name')) {
            if (this.value == "") {
                var errorMsg = '请输入姓名';
                if (cln == "en") {
                    errorMsg = 'Please input your name';
                }
                $parent.append('<span class="formtips onError">' + errorMsg + '</span>');
            } else {
                var okMsg = '输入正确';
                if (cln == "en") {
                    okMsg = 'OK';
                }
                $parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
            }
        }
        //验证邮件
        if ($(this).is('#tb_email')) {
            if (this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))) {
                var errorMsg = '请输入正确的邮件地址';
                if (cln == "en") {
                    errorMsg = 'Please input correct email address';
                }
                $parent.append('<span class="formtips onError">' + errorMsg + '</span>');
            } else {
                var okMsg = '输入正确';
                if (cln == "en") {
                    okMsg = 'OK';
                }
                $parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
            }
        }
        //验证电话
        if ($(this).is('#tb_phone')) {
            if (this.value == "" || (this.value != "" && !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test(this.value))) {
                var errorMsg = '请输入正确的联系电话';
                if (cln == "en") {
                    errorMsg = 'Please input correct contact number';
                }
                $parent.append('<span class="formtips onError">' + errorMsg + '</span>');
            } else {
                var okMsg = '输入正确';
                if (cln == "en") {
                    okMsg = 'OK';
                }
                $parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
            }
        }
    }).keyup(function () {
        $(this).triggerHandler("blur");
    }).focus(function () {
        $(this).triggerHandler("blur");
    });
    //end blur
    //提交，最终验证。
    $('#msg_btn').click(function () {
        var subObj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel");
        $(".required").trigger('blur');
        var numError = $('.onError').length;
        if (numError) {
            return false;
        }
        
        var ymz = subObj.find("#ymz").val();
        var title = subObj.find("#tb_title").val();
        var name = subObj.find("#tb_name").val();
        var sex = subObj.find("input[name='rbl_sex']:checked").val();
        var phone = subObj.find("#tb_phone").val();
        var email = subObj.find("#tb_email").val();
        var objt = subObj.find("input[name='rbl_objt']:checked").val();
        var content = subObj.find("#tb_content").val();
        var url = window.location.host;
        var cclass = id;
        $.get("/inhx/guestbook.ashx", {
            ymz: ymz,
            title: encodeURIComponent(title),
            name: encodeURIComponent(name),
            sex: encodeURIComponent(sex),
            phone: encodeURIComponent(phone),
            email: encodeURIComponent(email),
            objt: encodeURIComponent(objt),
            content: encodeURIComponent(content),
            url: url,
            cclass: cclass
        },
		function (data) {
		    if (data == "1") {
		        if (cln == "cn") {
		            alert("留言已提交");
		        }
		        else {
		            alert("The message has been submitted");
		        }
		        location = location;
		    }
		    else {
		        if (cln == "cn") {
		            alert("验证码错误！");
		        } else {
		            alert("Verification code error!");
		        }
		    }
		});
    });
    //重置
    $('#reset').click(function () {
        $(".formtips").remove();
    });
})