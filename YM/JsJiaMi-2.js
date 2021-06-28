
var JiaMiFun_href = "",JiaMiObj=null;
function JiaMiFun(JiaMiStr) {
    //JiaMiObj = $("a[href*='" + JiaMiStr + "']");
   
    $.post("/control/YeMian/YeMian_edit.aspx", { "typeW": "YN_JiaMi", "JiaMiStr": JiaMiStr },
   function (data) {
       var Json = $.parseJSON(data);
       if (Json["mid"].toString() == "") {
           JiaMiShow();
           JiaMiFun_href = Json["JiaMiStr"];
       } else {
           location = Json["JiaMiStr"];
          // JiaMiObj.attr({ "href": Json["JiaMiStr"] });
          // JiaMiObj.click();
          //window.open(Json["JiaMiStr"]);
       }
   });

}
function JiaMiShow() {
    var html_str = "";
    html_str = html_str + "<div style=\"position:fixed;top:0;left:0;right:0;bottom:0;background: rgba(0, 0, 0, 0.8);z-index:1001;display:none\" id=\"JiaMiDiv\">"
    html_str = html_str + "<table style=\" width:100%; height:100%\">"
    html_str = html_str + "   <tr><td></td><td></td><td></td></tr>"
    html_str = html_str + "    <tr><td></td><td style=\" width:1px; height:1px;\">"
    html_str = html_str + "    <div style=\" height: 214px; width: 320px; background:#FFF; background: url(/index/images/style/login_bg.jpg);border-radius: 8px; overflow:hidden\">"
    html_str = html_str + "      <div style=\"width: 276px;height: 24px;line-height: 24px; margin: 33px auto 0; overflow: hidden;\"><strong style=\"color: #333;font-size: 16px; float: left; overflow: hidden;\">会员登录</strong></div>"
    html_str = html_str + "       <div style=\"width: 276px; height: 29px; line-height: 29px; margin: 17px auto 0; overflow: hidden;\">"
    html_str = html_str + "        <span style=\"width: 48px; display: inline-block; float: left; height: 29px; overflow: hidden;\">帐号：</span>"
    html_str = html_str + "        <input name=\"tb_cookie_id\" type=\"text\" id=\"tb_cookie_id\" style=\"padding: 1px 0 0 31px;border: 0;display: inline-block; float: left;overflow: hidden; height: 29px;line-height: 29px; width: 194px; background: url(/index/images/style/login_fc.jpg);box-sizing: content-box;\">"

    html_str = html_str + "       </div>"

    html_str = html_str + "       <div style=\"width: 276px; height: 29px; line-height: 29px; margin: 17px auto 0; overflow: hidden;\">"
    html_str = html_str + "        <span style=\"width: 48px; display: inline-block; float: left; height: 29px; overflow: hidden;\">密码：</span>"
    html_str = html_str + "        <input name=\"tb_cookie_psd\" type=\"password\" id=\"tb_cookie_psd\" style=\"padding: 1px 0 0 31px;border: 0;display: inline-block; float: left;overflow: hidden; height: 29px;line-height: 29px; width: 194px; background: url(/index/images/style/login_sc.jpg);box-sizing: content-box;\">"
    html_str = html_str + "      </div>"
    html_str = html_str + "       <div style=\"width: 276px;margin: 10px auto 0; overflow: hidden; text-align:center\">"
    html_str = html_str + "          <img id=\"Img1\" onclick=\"JiaMi_login()\" style=\"display: inline-block; vertical-align: top;\" src=\"/index/images/style/login.jpg\" alt=\"登录\">"
    html_str = html_str + "          <a style=\"width: 73px; height: 28px; line-height: 28px; margin-top: 4px; background: #fc770c; display: inline-block; margin-left:10px;  border: 1px solid #c45d0b; color: #fff;\"  onclick=\"JiaMi_none()\" >返回</a>"
    html_str = html_str + "       </div>"

    html_str = html_str + "    </div> "
    html_str = html_str + "    </td><td></td></tr>"
    html_str = html_str + "     <tr><td></td><td></td><td></td></tr>"
    html_str = html_str + "</table>"
    html_str = html_str + "</div>"
    if ($("body").find("#JiaMiDiv").length == 0) $("body").append(html_str);
    $("#JiaMiDiv").css({ "display": "block" });


    
}
$(document).ready(function () {
    //YN_JiaMi();
});
function JiaMi_none() {
    $('#JiaMiDiv').css({ 'display': 'none' });

}
function JiaMi_login() {
    $.post("/control/YeMian/YeMian_edit.aspx", { "typeW": "JiaMi_login", "cookie_id": $("#tb_cookie_id").val(), "cookie_psd": $("#tb_cookie_psd").val() },
   function (data) {
       alert(data);
       if ($.trim(data).indexOf("登陆成功") > -1) {
           JiaMi_none();
           location = JiaMiFun_href;
           //JiaMiObj.attr({ "href": JiaMiFun_href });
           //JiaMiObj.click();
           //window.open(JiaMiFun_href);
       }
   }); 
} 