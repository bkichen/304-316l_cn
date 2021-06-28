var YNISO = false;
var YMselectObj = null;
$(document).ready(function () {
    YNISO = YN_iosFun();
    $(".dymk .dymk .jsPaiBanTongLan").each(function () {
        $(this).removeClass("jsPaiBanTongLan");
    }); 
    wen_Html();
    YM_Html_load();
    //视频show("/ueditor/net/upload/video/aaa.mp4");
    //$("img").load("feeds.html");

})
function wen_Html() 
{
//    var HtmlObj = $("html").clone(true);
//    HtmlObj.find("body>div").each(function () {
//        $(this).remove();
//    });
//    var Html_str = HtmlObj.html();




    var sdata = {};
    sdata["typeW"] = "wen_Html";
    sdata["url"] =''+location;
    var url = "" + location; 
    $.post("/control/YeMian/YeMian_line.aspx", sdata, function (data) {
        //Html_YMY_TClassFun();
        window.parent.SCHtml_A($("body")); //
    });
}
function Html_YMY_TClassFun() {
    var htmlLine = [];
    $("div[ymy_id][ymy_tclass]").each(function () {
        var ymy_id = $(this).attr("ymy_id");
        var ymy_tclass = $(this).attr("ymy_tclass");
        if ($.trim(ymy_tclass) != "") {
            var htmlJson = {};
            htmlJson["FileName"] = "ymy_id" + ymy_id + "_" + ymy_tclass;
            $(this).wrap("<div class=\"wrapObj\"></div>");
            var html = $(this).closest(".wrapObj").html();
            $(this).unwrap();
            htmlJson["html"] = html;
            htmlLine[htmlLine.length] = htmlJson;
        }
    });
    var sdata = { "typeW": "wen_Html_YMY_TClass", "htmlLine": JSON.stringify(htmlLine) };
    $.post("/control/YeMian/YeMian_line.aspx", sdata, function () {
       
    });
}
function SCHtml_A(){}

function quanpingFun() {
    $(".jsquanping").each(function () {
        var Tobj = $(this).closest("#indexpanel,#wappanel");
        if (Tobj.length > 0) {
            var MaxW = $(this).closest("#indexpanel,#wappanel").width();


            var pagetype = $(this).attr("pagetype");
            if (pagetype == "图片") {
                var imgObj = $(this).find("img[c='ceng1.style']");
                var lieW = imgObj.width();
                var lieH = imgObj.height();
                var bi = MaxW / lieW;
                bi = bi.toFixed(2); 

                var lieH = lieH * bi
                $(this).css({ "margin-left": "-50%", "left": "50%" });
                $(this).find("img[c='ceng1.style']").css({ "width": MaxW + "px", "height": lieH+"px" });
            } else {

                var lieW = $(this).data("lieW");
                if (lieW == null || lieW == undefined) {
                    lieW = $(this).find(".dpib").eq(0).width();
                    $(this).data("lieW", lieW);
                }
                var bi = MaxW / lieW;
                bi = bi.toFixed(0);
                bi = 100 / bi
                bi = bi.toFixed(2);

                $(this).css({ "margin-left": (MaxW / 2 * -1) + "px" });
                $(this).children().css({ "width": MaxW + "px" });
                $(this).find(".jslie").css({ "width": bi + "%" });
                var cengW = $(this).find(".jslie").width();
                $(this).find(".jslie").children().css({ "width": cengW + "px" });
            }
        } 
    });
    GunDongLB_show5();
}

function YN_iosFun() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        //alert("iphone");
        return true;
    } else if (/android/.test(ua)) {
        return false;
    }
}


function search_Fun(that){
     
   //var search_val = $("input[name='search']").val();
   //var searchurl = $("input[name='search']").attr("searchurl");
   var search_val = $(that).val();
   var searchurl = $(that).attr("searchurl");

   //console.log("search_Fun",searchurl,"||",!searchurl);
   if (!searchurl) {
       var url0 = '' + location;
       var lang = "cn";
       if (url0.indexOf("/en/") > -1) lang = "en"; 
       searchurl = "/html/" + lang + "/piclist-4-1.html";
   }
   //console.log("search_Fun",searchurl,"||",!searchurl);
   location=searchurl+"?search_val="+search_val;
}
var ImgLoadObj = null;

function YM_Html_loadYN()
{
    YM_Html_load2();

}

function YM_Html_load() {
    YMselectObj = $("#showHtmlObj,#indexpanel,#wappanel");
    if (YMselectObj.find("[class*='hizoom']").length > 0) {
    //console.log("YM_Html_loadA", $("head").html().indexOf("hizoom.min.css") == -1);
        if ($("head").html().indexOf("hizoom.min.css") == -1) $("head").append("<link href=\"/YM/hizoom.min.css?a=7\" rel=\"stylesheet\" type=\"text/css\" />");
//console.log("YM_Html_loadB", $("head").html().indexOf("hizoom.min.css") == -1);   
        if ($("head").html().indexOf("hizoom.min.js") == -1) $("head").append("<script src=\"/YM/hizoom.min.js\" type=\"text/javascript\"></script>");
        $(".hizoom_right").each(function () {
           //console.log("hizoom_right", $(this).width());
            $(this).hiZoom({
                width: $(this).width(),
                position: 'right'
            });
        });
        $(".hizoom_left").each(function () {
            $(this).hiZoom({
                width: $(this).width(),
                position: 'left'
            });
        }); 
    } 
    YM_Html_load2();
    htmlLoad();
    gundongLoad();
    mdlist_load();
    WenGengDuo_load();//文字更多加载 
    lie_load();//列表click加载
    url_selected();
    tlfd_load(); //浮动加载
    GunDongLB_show5();
    $("img").on("load", function () {
        //$(this).attr({"ynload":"true"});
        var c = $(this).attr("c");
        if (c == undefined) c = "";
        if (ImgLoadObj != null) clearTimeout(ImgLoadObj);
        ImgLoadObj = setTimeout(function () {
            if (c.indexOf("style")==-1) PaiBanTongLan_H(false);
            autoWidth();
            setObjTopH();
            mdlist_load();
            quanpingFun();
        }, 100);

        if ($(this).closest("#wappanel").length > 0) {
            WapImgAuto($(this));
        }
        if ($(this).closest(".jsImgMaxWidth").length > 0) {
            WapImgAuto($(this));
        }

    });
    if (autoWClass = "#wappanel ") {
        $(autoWClass + ".jsImgAuto img").each(function () {
            WapImgAuto($(this));
        });
    } 
    $(".jsImgMaxWidth img").each(function () {
        WapImgAuto($(this));
    });
//    YMselectObj.find(".pr .jstlfd[class*='pf']").each(function () { //增加到tlfd_load方法中
//        var Obj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel");
//        if ($(this).closest("#showHtmlObj").length) {
//            if ($(this).closest("[pagetype='调用模块']").length > 0) {
//                $(this).data("thatObj", $(this).closest("[pagetype='调用模块']"));
//            }
//        }
//        $(this).appendTo(Obj);
//    }); 
  var scrollObj = null;

  function PBTL_ObjFun(NewObj)
  {
     var TopObj = NewObj.offsetParent().closest(".jsPaiBanTongLan");
     var TopObj0 = TopObj.offsetParent().closest(".jsPaiBanTongLan");
     while (TopObj0.length > 0) 
     {
         TopObj = TopObj0;
         TopObj0 = TopObj.offsetParent().closest(".jsPaiBanTongLan");
     }
     return TopObj;
  }

  $(window).scroll(function () {//可视化
      if (scrollObj != null) clearTimeout(scrollObj);
      scrollObj = setTimeout(function () { 可视化高度区域(); }, 50);
      if (!autoWzoom) autoWzoom = 1;
      var winH = $(window).height() / autoWzoom + $(this).scrollTop();
      var 背影底图Obj = $("[背影底图='是']");

      if (背影底图Obj.length > 0) {
          背影底图Obj.each(function () {
              var 背影底图data = $(this).data("背影底图");
              var 位置start = 背影底图data["位置start"];
              var 位置end = 背影底图data["位置end"];
              var Y = 背影底图data["Y"];
              if (Y == undefined || Y == "") Y = "true";
              if (parseFloat(位置start) < winH && winH < parseFloat(位置end)) {
                  if (Y == "true") {
                      var that = $(this);
                      背影底图data["Y"] = "false";
                      var TopObj = PBTL_ObjFun(that);
                      TopObj.addClass("byd_css0");
                      that.addClass("byd_css"); 
                      that.data("背影底图", 背影底图data);
                  }
              } else {

                  if (Y == "false") {
                      var that = $(this);
                      var TopObj = PBTL_ObjFun(that);
                      TopObj.removeClass("byd_css0");
                      that.removeClass("byd_css");
                      背影底图data["Y"] = "true";
                      that.data("背影底图", 背影底图data);
                  }
              }
          });

      }
  });
    $(window).resize(function () {//可视化
         autoWidth();
         YM_Html_load2();
     });

    
    //console.log("YM_Html_load",$("input[onchange='search_Fun()']").length);
    $("input[onchange='search_Fun()']").unbind("keydown");
    $("input[onchange='search_Fun()']").unbind("keypress");
    $("input[onchange='search_Fun()']").unbind("keyup");
    $("input[onchange='search_Fun()']").keydown(function(e){
        //console.log("YM_Html_load",e.keyCode);
        if(e.keyCode==13){
          search_Fun();
        }
  });
  $(".JSZJC[data-动画]").each(function () {
      $(this).width($(this).width()).height($(this).height()).addClass("donghua_dn");

  });

  $("#loadwancheng").css({"display":"none"});

}
function 返回头部() {
   
    $(window).scrollTop(0);

}
function WapImgAuto(that) {
    var W = that.width();
    var Wobj = that.closest(".jsImgAuto,.jsImgMaxWidth");
    if (Wobj.length > 0) {
        var W1 = Wobj.width();
        if (W > W1) {
            that.css({ "width": W1 + "px", "height": "auto" });
            PaiBanTongLan_H(false);

        }
    }

}
function GunDongLB_show5() {
    YMselectObj.find(".jsGunDongLB_show5,.jsGunDongLB_show6").each(function () {
        var DownObj = $(this).find(".jsGunDongLB_showY");
        var style = DownObj.data("style");
        if (style == undefined) style = DownObj.attr("style");
        DownObj.data("style", style);
        DownObj.attr({ "style1": style });
        var classStr = $(this).attr("class");

        if (classStr.indexOf("jsGunDongLB_show6") > -1) {
            var NoObj = $(this).find(".jsGunDongLB_showN");
            DownObj.css({ "width": NoObj.width() + "px", "height": NoObj.height() + "px" }).addClass("dpnone");
        } else {
            if (classStr.indexOf(" down") > -1 || classStr.indexOf(" up") > -1) DownObj.height(0);
            else DownObj.width(0);
        }
    });
    $("#indexpanel .jsGunDongLB_show5,#showHtmlObj .jsGunDongLB_show5,#indexpanel .jsGunDongLB_show6,#showHtmlObj .jsGunDongLB_show6").hover(
      function (e) {
          //console.log("GunDongLB_show5", e);
          var classStr = $(this).attr("class");
          var DownObj = $(this).find(".jsGunDongLB_showY");
          DownObj.removeClass("dpnone");
          if (classStr.indexOf(" JSrightleft") > -1) {
              var w = $(this).width() / 2;
              if (w > e.offsetX) {
                  $(this).removeClass("right");
                  $(this).addClass("left");
              } else {
                  $(this).removeClass("left");
                  $(this).addClass("right");
              }
          }
          if (!DownObj.data("NOstyle")) DownObj.data("NOstyle", DownObj.attr("style"));
          DownObj.data("YNhover", "yes")
          setTimeout(function () {
              if (DownObj.data("YNhover") == "yes") {
                  DownObj.attr({ "style": DownObj.data("style") });
                  DownObj.attr({ "style0": DownObj.data("style") })
              }
          }, 100);


      },
      function () {
          var DownObj = $(this).find(".jsGunDongLB_showY");
          var classStr = $(this).attr("class");
          DownObj.data("YNhover", "no")
          if (classStr.indexOf("jsGunDongLB_show6") > -1) {
              setTimeout(function () { DownObj.addClass("dpnone"); }, 500);
          }
          DownObj.attr({ "style": DownObj.data("NOstyle") });

      }
    );
}
function zknowidthFun(thatObj) {
    thatObj.each(function () {
        var w = $(this).find("div").eq(0).outerWidth(true);
        $(this).width(w);
    });

}
function YM_Html_load2() {
    zknowidthFun($(".zknowidth"));
    quanpingFun();
   PaiBanTongLan_H(false);
   autoWidth();
   setObjTopH();
   mdlist_load();
  setTimeout(function(){PaiBanTongLan_H(false);},100);  
  var num_dong=0;
  $(".jsyiru_show_num_dong").each(function(){
      var topObj=$(this).closest("#showHtmlObj");
      var txt=$(this).text();
      try{
         var txtNum=parseFloat(txt);
         $(this).data("txtnum",txtNum);
         $(this).text(0);
         $(this).attr({"id":"num_dong"+num_dong});

         if(topObj.length>0) num_dongFun(this);

         num_dong++;
      }catch(e){
        $(this).removeClass("jsyiru_show_num_dong");
      }

     // 
  });


   
}
var autoWidth_num=-1, autoWClass="",autoWzoom=1;
 function autoWidth() {
    var width = $("#shiWidth").width();
    //console.log("autoWidth", width);
    var pc_width = 1400;
    //var pc_width = 1920;
    var wap_width = 750;
    var autoWidth_num1 = autoWidth_num;

    var wappHtml = "", pcHtml = "",YNPC=false;
   
    if ($("#wappanel").length > 0) wappHtml = $("#wappanel").html();
    if ($("#indexpanel").length > 0) pcHtml = $("#indexpanel").html();
    if (width <= 750 && wappHtml.length > 300) {
        var suo = width / wap_width;
        
        $("#indexpanel").css({ "display": "none" });
        $("#indextongji").css({ "display": "none" });
        $("#wappanel").css({ "display": "block", "zoom": suo });
        autoWidth_num = 2; 
        //$("#wappanel").css("zoom", suo);
        autoWzoom = suo;
       
        autoWClass = "#wappanel ";
    } else if (width > pc_width) {
        if (pcHtml.length > 300) {
            $("#indexpanel").css("zoom", 1);
            $("#indexpanel").css({ "display": "block" });
            $("#indextongji").css({ "display": "block" });
            $("#wappanel").css({ "display": "none" });
            autoWidth_num = 1;
            autoWzoom = suo;
            autoWClass = "#indexpanel ";
        } else YNPC=true

    } else if (width <= pc_width) {
        if (pcHtml.length > 300) {
            var suo = width / pc_width;  
            $("#indexpanel").css("zoom", suo);
            $("#indexpanel").css({ "display": "block" });
            $("#indextongji").css({ "display": "block" });
            $("#wappanel").css({ "display": "none" });
            autoWidth_num = 1;
            autoWzoom = suo;
            autoWClass = "#indexpanel ";
        } else YNPC = true;
    }
    if (YNPC) {
        var suo = 1;
        $("#wappanel").css("zoom", suo);
        $("#indexpanel").css({ "display": "none" });
        $("#indextongji").css({ "display": "none" });
        $("#wappanel").css({ "display": "block", "margin": "0 auto" });
        autoWidth_num = 2;
        autoWzoom = suo;
        autoWClass = "#wappanel ";
    }


    if(autoWidth_num!=autoWidth_num){
       setObjTopH();
    } 
}


function tlfd_load()
{
    YMselectObj.find(".pr .jstlfd[class*='pf']").each(function () {
        var Obj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel");
        if ($(this).closest("#showHtmlObj").length) {
            if ($(this).closest("[pagetype='调用模块']").length > 0) {
                $(this).data("thatObj", $(this).closest("[pagetype='调用模块']"));
            }
        }
        $(this).appendTo(Obj);
    }); 


   //jstlfd
  //console.log("tlfd_load",$(".jstlfd").length);
    $(".jstlfd").each(function (i) {
        var that = $(this);
        that.data("styleStr", that.attr("style"));
        that.data("i", i);
        var 开关Obj = that.closest("[data-开关]");
        var 开关 = 开关Obj.data("开关"); 
        tlfd_click(that);
        var 关闭ID = 开关["关闭ID"];
        if (关闭ID) if (关闭ID != "") {
            $("." + 关闭ID).click(function () {
                var 开关 = 开关Obj.data("开关");
                开关["是否显示"] = "no";
                开关Obj.data("开关", 开关);
                tlfd_click(that);
            });
        }
        var 显示ID = 开关["显示ID"];
        if (显示ID) if (显示ID != "") {
            $("." + 显示ID).click(function () {
                var 开关 = 开关Obj.data("开关");
                开关["是否显示"] = "yes";
                开关Obj.data("开关", 开关);
                tlfd_click(that);
            });
        }


        var 移入出ID = 开关["移入出ID"];

        if (移入出ID) if (移入出ID != "") {

            $("." + 移入出ID).hover(
              function () {
                 //console.log("移入出IDA", 移入出ID)
                  var 开关 = 开关Obj.data("开关");
                  开关["是否显示"] = "yes";
                  开关Obj.data("开关", 开关);
                  tlfd_click(that);
              },
              function () {
                  var 开关 = 开关Obj.data("开关");
                  开关["是否显示"] = "no";
                  开关Obj.data("开关", 开关);
                  setTimeout(function () { tlfd_click(that); }, 100);
              }
            );
            that.hover(
              function () {
                  var 开关 = 开关Obj.data("开关");
                  开关["是否显示"] = "yes";
                  开关Obj.data("开关", 开关);
                  //console.log("移入出IDB", 移入出ID)
              },
              function () {
                  var 开关 = 开关Obj.data("开关");
                  开关["是否显示"] = "no";
                  开关Obj.data("开关", 开关);
                  setTimeout(function () { tlfd_click(that); }, 100);
              }
            );
        }


        var 切换ID = 开关["切换ID"];
        if (切换ID) if (切换ID != "") {
            $("." + 切换ID).toggle(
      function () {
          var 开关 = 开关Obj.data("开关");
          开关["是否显示"] = "yes";
          开关Obj.data("开关", 开关);
          tlfd_click(that);
      },
      function () {
          var 开关 = 开关Obj.data("开关");
          开关["是否显示"] = "no";
          开关Obj.data("开关", 开关);
          tlfd_click(that);
      }
    );
        }

    });

}

function pr_add_zI(that,YN,classVal){

    var TobObj = that.parents(".pr,.pf");
    //console.log("pr_add_zI", TobObj.length, TobObj, YN, classVal);
    if (TobObj.closest("#showHtmlObj").length == 0) {
        //alert(TobObj.length);

        if (TobObj.length > 0) {
            if (YN == 1) {
                TobObj.each(function (i) {
                    $(this).addClass(classVal);
                });
            } else {
                TobObj.each(function () {
                    $(this).removeClass(classVal);
                }); 
            }  
        } else {
           //console.log("pr_add_zI-end");
        }
  }
}
function tlfd_click(that) {
    var 开关Obj = that.closest("[data-开关]");
    var styleStr = that.data("styleStr");
    var 开关 = 开关Obj.data("开关");
    var 是否显示 = 开关["是否显示"];
    if (!是否显示) 是否显示 = "no";
    var classVal = "zI";
    var styleVal = 开关Obj.attr("style");
    if (开关Obj.attr("class").indexOf(" pf ") > -1) classVal = "pfzI";
    var i = 开关Obj.data("i");
    classVal += i;
     
    
    if (是否显示 == "yes") {

        if (开关["开"]) {
            var setStyle = 开关["开"]["style"];
            if (setStyle) styleStr += ";" + setStyle;
            开关Obj.attr({ "style": styleStr });

            if (styleStr.indexOf("z-index") > -1) classVal = ""; 

            that.addClass(classVal);
            pr_add_zI(that, 1, classVal);
            开关Obj.removeClass("ofh");
            if (开关Obj.attr("class").indexOf(" pf ") > -1) { 
                img_dataSrc_Fun(开关Obj);
            }
        }
    } else {
        if (开关["关"]) {
            var setStyle = 开关["关"]["style"];
            if (setStyle) styleStr += ";" + setStyle;
            if (开关["关"]) 开关Obj.attr({ "style": styleStr });
        } else {
           开关Obj.attr({ "style": styleStr });
       }
       开关Obj.addClass("ofh");
       pr_add_zI(that, 0, classVal);
    }

}


function WenGengDuo_H(that,addH) {
    var TopObj = that.offsetParent().closest(".jsPaiBanTongLan,.JSZJC");
    //console.log("WenGengDuo_H", TopObj.length);
    if (TopObj.length > 0) {
        var WGDHeight = that.height();
        //console.log("WenGengDuo_H-WGDHeight", WGDHeight);
        TopObj.attr({ "WGDHeight": WGDHeight });
        //TopObj.css({ "height": (WGDHeight + addH) + "px", "h1": "0" });
        TopObj.css({ "height": WGDHeight + "px", "h1": "0" });
        WenGengDuo_H(TopObj, addH);
    }
}
function 模块重新高度(thatObj,NewNum,setH) {
    var that = $(thatObj).find(".jsgundongdiv").eq(NewNum).find(".jsImgAuto"); //clickid
    var TopObj = $(thatObj).offsetParent().closest(".jsPaiBanTongLan,.JSZJC");
    TopObj.removeAttr("WGDHeight");
    TopObj.css({ "height": setH + "px" });
    if (that.length > 0) {
        var WGDHeight = that.outerHeight() + that.position().top;
       //console.log("模块重新高度a", WGDHeight, "h1", that.height(), "h2", that.outerHeight(true), "setH", setH);
        TopObj.attr({ "WGDHeight": WGDHeight });
        TopObj.css({ "height": WGDHeight + "px" });

        var PBTLObj = $(thatObj).offsetParent().closest(".jsPaiBanTongLan");
        if (PBTLObj.length > 0) {
            var PBTLObj1 = PBTLObj.offsetParent().closest(".jsPaiBanTongLan");
            while (PBTLObj1.length > 0) {
                PBTLObj = PBTLObj1;
                PBTLObj1 = PBTLObj.offsetParent().closest(".jsPaiBanTongLan");
            }
            PaiBanTongLan_setH(PBTLObj,false); 
        } 
    }   
}
function WenGengDuo_load() {
    $(".JsWenGengDuo").each(function () {
        var stratH = $(this).outerHeight(true);
        $(this).removeClass("h100 ofh");
        var MaxH = $(this).outerHeight(true);
        $(this).addClass("h100 ofh");

        if (MaxH > stratH) {
            if ($(this).closest(".JSZJC").find(".jsWenGengDuoShow").length == 0) {
                $(this).after($("#WenGengDuoObj").html());
                var clickObj = $(this).closest(".JSZJC").find(".jsWenGengDuoShow").eq(0);
                clickObj.data("MaxH", MaxH)
                //console.log("JsWenGengDuo", "MaxH=" + MaxH, "stratH=" + stratH);
                clickObj.find("img[src*='查看完整']").click(function () {
                    var TopObj = $(this).closest(".JSZJC");
                    var WGDHeight = TopObj.height();
                    var MaxH = $(this).closest(".jsWenGengDuoShow").data("MaxH");
                    TopObj.css({ "height": MaxH + "px" });
                    TopObj.attr({ "WGDHeight": WGDHeight });
                    WenGengDuo_H(TopObj, (MaxH - WGDHeight));

                    $(this).closest(".jsWenGengDuoShow").css({ "display": "none" });
                    // PaiBanTongLan_H(true);
                    // if (YNGengDuo == false && that.find(".jsWenGengDuoShow").length > 0) that.attr({ "WGDHeight": MaxH });
                     
                });

            }
        }
    });
}


function lie_load()
{
    $(".jslie[showcls='2'],.jslie[showcls='3'],.jsGDlie[showcls='2'],.jsGDlie[showcls='3']").css({ "cursor": "pointer" });
    $(".jslie[showcls='2'],.jsGDlie[showcls='2']").click(function () {
        lie_click($(this), "jsGunDongLB_show");
    });
    $("#indexpanel .jslie[showcls='3'],#showHtmlObj .jslie[showcls='3'],#indexpanel .jsGDlie[showcls='3'],#showHtmlObj .jsGDlie[showcls='3']").hover(
      function () {
       // $(this).removeClass("jsGunDongLB_show");
        $(this).addClass("jsGunDongLB_show");
      },
      function () {
        $(this).removeClass("jsGunDongLB_show");
      }
    );
}
function lie_click(that,classStr) {
    var TopObj = that.closest(".JSZJC");
    if (TopObj.find(".jsGunDongLB_showY").length > 0) {
        that.closest(".JSZJC").find(".jslie").removeClass(classStr);
        that.addClass(classStr); 
        zknowidthFun(TopObj.find(".zknowidth"));
    }
}
//function WenGengDuo_HuanYuan(that,YNtop=0)
function WenGengDuo_HuanYuan(that,YNtop)
{//滚动模块时 还原高度
    that.closest("[WGDHeight]").each(function(){
      //console.log("WenGengDuo_HuanYuanEnd",$(this).height(),$(this).attr("WGDHeight"));
      $(this).height($(this).attr("WGDHeight"));
   });
   var TopObj1=that.prev().closest("[WGDHeight]");
   if(TopObj1.length>0){
      WenGengDuo_HuanYuan(TopObj1,1);
   }
   if(YNtop==0){
       that.find("[WGDHeight]").each(function(){
          $(this).height($(this).attr("WGDHeight"));
       });
       that.find(".jsWenGengDuoShow").css({"display":"block"});
    }
}



function TopCeng_positionTop(that) {
    var thatObj = that.offsetParent().closest(".jstlfd");
    
    if (thatObj.length > 0) {
        return 0;
    } else {
        var ptop = getPtop(thatObj);
        return ptop + TopCeng_positionTop(thatObj);
    }

}
function TopCeng_positionTopClass(that,classStr) {
    var thatObj = that.offsetParent().closest(classStr);

    if (thatObj.length > 0) {
        var ptop = getPtop(thatObj);
        //console.log("PaiBanTongLan_H-TopCeng_positionTopClass", thatObj.position());
        return ptop + TopCeng_positionTopClass(thatObj); 
    } else {
        return 0; 
    }
}
function getPtop(that) {
    var ptop = $(that).data("top");

    if (ptop == undefined || ptop == "") { 
        ptop = $(that).position().top;
        $(that).data("top", ptop);
    }
    return ptop;
}

function PaiBanTongLan_setH(PBTLObj, YNGengDuo)
{
    PBTLObj.each(function (i) {
        var that = PBTLObj.eq(PBTLObj.length - i - 1);
        var MaxH = 0;
        var log_class = that.attr("class");
        that.find(".JSZJC").each(function () {
            if ($(this).closest(".jstlfd").length == 0 && $(this).closest(".jstlfd1").length == 0 && $(this).offsetParent().closest("[pagetype='滚动模块']").length == 0) {
                var ptop = getPtop(this);
                var MaxH1 = $(this).outerHeight(true) + ptop;
                MaxH1 += parseInt(TopCeng_positionTopClass($(this), ".jsmLRauto"));
                if (MaxH1 > MaxH) MaxH = MaxH1;
            }
        });
        if (parseInt(MaxH) > 10) {
            that.height(MaxH)
            if (YNGengDuo == false && that.find(".jsWenGengDuoShow").length > 0) that.attr({ "WGDHeight": MaxH });
        }
    });
}

function PaiBanTongLan_H(YNGengDuo) {

   var attrStr="[ZiDongNoH='false']";
  if(YNGengDuo==true)attrStr=""; 

   var PBTLObj=$(autoWClass+" .jsPaiBanTongLan"+attrStr+",#showHtmlObj .jsPaiBanTongLan"+attrStr)
   PaiBanTongLan_setH(PBTLObj, YNGengDuo);

   $(autoWClass + " div[pagetype='垂直排版']>.jsPaiBanTongLan").each(function () {
       var MaxH0 = 0;
       $(this).find(".JSZJC").each(function () {
           var Pobj = $(this);
           var ptop = getPtop(Pobj);
           var MaxH =ptop + Pobj.outerHeight(true);
           if (MaxH0 < MaxH) MaxH0 = MaxH;
       }); 
       if (MaxH0 > 0 && MaxH0 < 60) MaxH0 = 60;
       $(this).height(MaxH0);
   });

   $(autoWClass + " .jsPaiBanTongLan>div[pagetype='垂直排版']>.jsPaiBanTongLan,#showHtmlObj .jsPaiBanTongLan>div[pagetype='垂直排版']>.jsPaiBanTongLan").each(function (){
       /*var Pobj = $(this).find("div[pagetype='通栏排版']:last");
       if (Pobj.length > 0) {
           var ptop = getPtop(Pobj); 
           var MaxH = ptop + Pobj.outerHeight(true);
           $(this).height(MaxH);
       }*/
       var Pobj = $(this); 
       var ptop = getPtop(Pobj); 
       //var MaxH = ptop + Pobj.outerHeight(true);
       var MaxH = Pobj.outerHeight(true);
       $(this).height(MaxH); 
   });

   $(autoWClass + " .jsPaiBanTongLan>div[pagetype='调用模块']").each(function () {
       var Pobj = $(this).find("div[pagetype='通栏排版']:last");
       if (Pobj.length > 0) {
           var ptop = getPtop(Pobj); 
           var MaxH = ptop + Pobj.outerHeight(true);
           $(this).height(MaxH);
       } 
   });

   $(".gundong"+attrStr).each(function(){
        var MaxH=$(this).height();
        $(this).find(".JSZJC").each(function () {
            var ptop = getPtop(this);
            var MaxH1 = $(this).outerHeight(true) + ptop;
           if(MaxH1>MaxH) MaxH=MaxH1;
        });
        $(this).height(MaxH)
        if(YNGengDuo==false && $(this).find(".jsWenGengDuoShow").length>0 ) $(this).attr({"WGDHeight":MaxH});
   });
} 
function mdlist_load(){
    $("a[href*='视频show'][YNload!='true']").each(function () {
        var addObj = $(this).find("img[src*='/index/images/products']").eq(0);
        if (addObj.closest(".imgCC").length > 0) addObj = addObj.closest(".imgCC");
        if (addObj.length > 0) {
            var position = addObj.position();
            var mdlistImgObj = $(this).find(".mdlistImg");
            if (mdlistImgObj.length == 0) {
                addObj.closest("div").append($("#mdlistObj").html());
                mdlistImgObj = $(this).find(".mdlistImg");
            }
            //mdlistImgObj.css({ "left": position.left + "px", "top": position.top + "px", "width": addObj.width() + "px", "height": addObj.height() + "px" });
            mdlistImgObj.css({  "width": addObj.width() + "px", "height": addObj.height() + "px" });
            $(this).attr({ "YNload": "true" });
        }
    });
    $("a[href*='视_频show']").each(function () {

        var src = $(this).attr("href");
        src = src.replace("javascript:视_频show('", "").replace("')", "");

        var addObj = $(this).find("img[src*='/index/images/products']").eq(0);
        if (addObj.closest(".imgCC").length > 0) addObj = addObj.closest(".imgCC");
        if (addObj.length > 0) {
            var position = addObj.position();

            var mdlistImgObj = $(this).find(".mdlistImg");
            if (mdlistImgObj.length == 0) {
                if (src.indexOf('iframe') > -1) {
                    addObj.closest("div").append($("#mdlistObj_ifrmae").html());
                } else {
                    addObj.closest("div").append($("#mdlistObj_video").html());
                    $(this).find(".mdlistImg [type='video/mp4']").attr({ "src": src });
                    mdlistImgObj = $(this).find(".mdlistImg");
                    mdlistImgObj.css({ "width": addObj.width() + "px", "height": addObj.height() + "px" });
                }

            }
            $(this).attr({ "YNload": "true", "href": "javascript:void(0)" });
        }
    });


} 
function 视频show(src) {

    //src = decodeURIComponent(src);
    src = src.replace(/&#39;/g, "'").replace(/&quot;/g, "\"");
    //console.log("视频show", src);
  
    if (src.indexOf("<iframe") > -1) {
        YM透明层显示(src, ".YM透明层");
        $(".YM透明层").find("iframe").width(750).height(560);
    } else {
        YM透明层显示("<video autoplay=\"autoplay\" width=\"750\" height=\"560\" controls=\"controls\"><source src=\"" + src + "\" type=\"video/mp4\">Your browser does not support the video tag.</video>", ".YM透明层");
    }
    
}

function 可视化高度区域() 
{
     //console.log("可视化高度区域A",autoWzoom);
     if(!autoWzoom) autoWzoom=1;
    
   //console.log("可视化高度区域A", "scrollTop", $(window).scrollTop(), "winH", winH, "winH1", $(window).height());
    // $("#shiWidth").html("可视化高度区域A" + "scrollTop=" + $(window).scrollTop() + "winH=" + winH + "KS_MaxH=" + KS_MaxH + "||" + $(autoWClass + " .JSZJC:last").offset().top + "||autoWzoom" + autoWzoom);

     if ($(autoWClass).length > 0) {

         if ($(autoWClass + " .LanRen").length == 0) {
             //$(autoWClass).append("<div class=\"LanRen\" style=\"position: fixed; width: 100%; height: 100%; z-index: -1000;top: 0;left: 0;\"></div>"); //懒人
             $(autoWClass).append("<div class=\"LanRen\" style=\"position: fixed; bottom: 0;; right: 0;; z-index: -1000;top: 0;left: 0;\"></div>"); //懒人
         }
         var KS_MinH = $(autoWClass + " .LanRen").offset().top;
         var KS_H = $(autoWClass + " .LanRen").outerHeight(true);
         var KS_MaxH = KS_MinH + KS_H;
         var winH = $(window).height() / autoWzoom;


         $(autoWClass + " .JSZJC").each(function (i) {
             var offset = $(this).offset();
             var offsetTop = offset.top;
             //if (YNISO) offsetTop = offsetTop * autoWzoom;
             var offsetMax = offsetTop + $(this).outerHeight(true);


             //调试高度
             //console.log("可视化高度区域", i, "offset", offset.top, "KS_MinH", KS_MinH, "KS_MaxH", KS_MaxH, "autoWzoom", autoWzoom, "FT", offset.top / autoWzoom);
             //$(this).attr({ "wen_i": i, "offsetTop": offsetTop, "KS_MinH": KS_MinH, "KS_MaxH": KS_MaxH, "KS_H": KS_H, "YNISO": YNISO }) 
             //end 调试高度 
             img_dataSrc_Fun($(this)); 
             if ((KS_MinH <= offsetTop && offsetTop <= KS_MaxH) || (offsetTop <= KS_MinH && KS_MinH <= offsetMax)) {
                 $(this).attr({ "Keshi": "true" });
                 strat动画($(this).attr("ymy_id")) 
                 //console.log("可视化高度区域",i);
//             } else if (((KS_MinH - KS_H) <= offsetTop && offsetTop <= (KS_MaxH + KS_H)) || (KS_MinH <= offsetMax && offsetMax <= (KS_MaxH + KS_H))) {
//                 img_dataSrc_Fun($(this));
//                 $(this).attr({ "Keshi": "false" });
             } else {
                 $(this).attr({ "Keshi": "false" });
             }
         }); 
     }
 }



function img_dataSrc_Fun(that) {

    that.find("[data-src]").each(function () {
        var src = $(this).data("src");
        //$(this).attr({ "src": src });
        window.parent.replace_img($(this), { "src": src }); 
        $(this).removeAttr("data-src");
    });
    that.find("[data-bgurl]").each(function () {
        var bgurl = $(this).data("bgurl");
        var style = $(this).attr("style");
        style=style.replace("/images/grey.gif", bgurl)
        //$(this).attr({ "style": style });
        window.parent.replace_img($(this), { "style": style });
        $(this).removeAttr("data-bgurl");
    });
}
function replace_img(that,datajson){
    that.attr(datajson);

}


function strat动画_mouseover(that) {
    $(that).attr({ "YN动画": "0" })
    strat动画($(that).attr("ymy_id"))
}
function strat动画(ymy_id) {

    $(".JSZJC[Keshi='true'][data-动画][ymy_id='" + ymy_id + "']").each(function () {
        var that = $(this);
        var YN动画 = that.attr("YN动画");
        if (YN动画 == undefined) YN动画 = "0";
        var 动画 = that.data("动画");
        if (动画 && YN动画 == "0") { 
            var delayNum = parseFloat(动画.delay.replace("s", "")) * 1000;
            var delayNumEnd = delayNum + parseFloat(动画.duration.replace("s", "")) * 1000;
            var statFun = function () {
                //console.log("动画.class", 动画.class);
                var 动画class = 动画["class"];
                that.removeClass("donghua_dn");
                if (动画class) {
                    that.addClass(动画class);
                    that.css({ "-webkit-animation-duration": 动画.duration, "animation-duration": 动画.duration, "-webkit-animation-fill-mode": "both", "animation-fill-mode": "both" });
                }
            }
            var endFun = function () {
                var 动画class = 动画["class"];
                that.attr({ "YN动画": "1" });
                if (动画class) that.removeClass(动画class);
            };

            if (delayNum > 0) setTimeout(function () { statFun(); }, delayNum);
            else statFun();

            setTimeout(function () { endFun(); }, delayNumEnd); ;
        }
    });
    $(".JSZJC[Keshi='true'][ymy_id='" + ymy_id + "'] .jsyiru_show_num_dong[id^='num_dong']").each(function(){
       num_dongFun(this);
    });
}
function num_dongFun(that){
   var options = {
        useEasing: true, 		// 使用缓和
        useGrouping: true, 		// 使用分组(是否显示千位分隔符,一般为 true)
        separator: '', 		// 分隔器(千位分隔符,默认为',')
        decimal: '.', 			// 十进制(小数点符号,默认为 '.')
        prefix: '', 			// 字首(数字的前缀,根据需要可设为 $,¥,￥ 等)
        suffix: '' 				// 后缀(数字的后缀 ,根据需要可设为 元,个,美元 等) 
    };
    var idName=$(that).attr("id");
    var txtnum=$(that).data("txtnum");
    new CountUp(idName, 0, txtnum, 0, 1, options).start();
    $(that).removeClass("jsyiru_show_num_dong").addClass("jsyiru_show_num_dong_Yes");
}


function setObjTopH() //设置对象与头部距离
{
//    var setTop=$(window).scrollTop();
//   // $(window).scrollTop(0);
//    if(!autoWzoom)autoWzoom=1;
//    $(autoWClass+" .JSZJC").each(function (i) {
//        var offset = $(this).offset();
//        offset.left = offset.left;
//        //+ $(window).scrollLeft()
//        offset.top = offset.top;
//        //- $(window).scrollTop()
//        var offset1=offset;
//        if(parseFloat(autoWzoom)>0){
//           //console.log("setObjTopH-offset2",offset.top,offset.top*parseFloat(autoWzoom));
//           offset.top=offset.top*parseFloat(autoWzoom);
//           
//        }
//       //console.log("setObjTopH", i, "offset", offset, "autoWzoom", autoWzoom, "offset1", $(window).scrollTop());
//        $(this).data("offset", offset);
//    });
    //$(window).scrollTop(setTop);
    可视化高度区域();
}
function htmlLoad() {
    $("#indexpanel .jsHover,#showHtmlObj .jsHover").find(".jsHoverFlex,.jsHoverFlex>.jsHoverFlex1>div,.jsHoverFlex>.jsHoverFlex1>div>.jsHoverFlex1>div").hover(function () {
        var YNclickObj=$(this).closest(".js点击显示下层");
        if(YNclickObj.length==0){
           HoverFlexAdd($(this), 0);
           $(this).addClass("jsHFYesShow");
           pr_add_zI($(this), 1, "zIA2");
        }
    }, function () {
        var YNclickObj=$(this).closest(".js点击显示下层");
        if(YNclickObj.length==0){
          var YNsd = $(this).data("YNsd");
          if (YNsd != "1") HoverFlexRemove($(this), 0);
          pr_add_zI($(this), 0, "zIA2");
          $(this).removeClass("jsHFYesShow");
        }
    });
    $("#indexpanel .jsHover,#showHtmlObj .jsHover").find(".js点击显示下层").each(function(){
       var Aobj=$(this).find("a");
       if(Aobj.length>1){
         Aobj.eq(0).attr({"href":"javascript:void(0)","onclick":"点击显示下层Fun(this)"}); 
       }
    });
    $(".jsPaiBanTongLan .js_mouseenter").mouseenter(function(){
       var that=$(this);
       setTimeout(function(){
         var JSgundongObj=that.offsetParent().closest(".JSgundong");
           if(JSgundongObj.length==0){
               var PBTLObj = that.offsetParent().closest(".jsPaiBanTongLan");
             PaiBanTongLan_setH(PBTLObj,false); 
           }
       },100); 
    });
    $(document).on("click",".js_clickheight",function(){
      var that=$(this);
       setTimeout(function(){
         var JSgundongObj=that.offsetParent().closest(".JSgundong");
           if(JSgundongObj.length==0){
               var PBTLObj = that.offsetParent().closest(".jsPaiBanTongLan");
             PaiBanTongLan_setH(PBTLObj,false); 
           }
       },100); 
    });


}
function 点击显示下层Fun(that)
{ 
    var Aobj=$(that); 
    var setObj=Aobj.closest(".js点击显示下层");
    var calssstr=setObj.attr("class");
    if(calssstr.indexOf("jsHFYesShow")>-1){
        var YNsd = setObj.data("YNsd");
        if (YNsd != "1") HoverFlexRemove(setObj, 0);
        pr_add_zI(setObj, 0, "zIA2");
        setObj.removeClass("jsHFYesShow");

    }else{
        HoverFlexAdd(setObj, 0);
        setObj.addClass("jsHFYesShow");
        pr_add_zI(setObj, 1, "zIA2");

    } 
}



function url_selected()
{//url选中状态
   try{
       // for(var a in selectedJson)
       for (var a = selectedJson.length - 1; a >= 0; a--) {
           if (a == 0) {
               var jsonStr = selectedJson[a];
               if (jsonStr["sdStr"].indexOf("cclass") > -1) {
                   var cclass = jsonStr["sdStr"].replace("cclass", "");
                   var JQstr = "a[href*='piclist-" + cclass + "-'],a[href*='newslist-" + cclass + "-'],a[href*='userpage-" + cclass + ".']"

                   $(JQstr).closest(".jsHoverFlex").each(function (i) {
                       $(this).data("YNsd", "1");
                       var morenstyle = $(this).closest(".jsHover").attr("morenstyle");
                       $(this).closest(".jsHover").find(".jsHoverFlex>a").attr({ "style": morenstyle })
                       HoverFlexAdd($(this), 0);
                   });


                   $(JQstr).closest(".jslie").each(function (i) {


                       lie_click($(this), "jsGunDongLB_show_Select");
                       // HoverFlexAdd($(this), 0);
                   });

               } else if (jsonStr["sdStr"].indexOf("YML") > -1) {
                   var cclass = jsonStr["sdStr"].replace("YML", "");
                   $("a[href*='YML" + cclass + ".']").closest(".jsHoverFlex").each(function (i) {
                       $(this).data("YNsd", "1");
                       var morenstyle = $(this).closest(".jsHover").attr("morenstyle");
                       $(this).closest(".jsHover").find(".jsHoverFlex>a").attr({ "style": morenstyle })
                       HoverFlexAdd($(this), 0);
                   });
               } else if (jsonStr["sdStr"].indexOf("其它") > -1) {
                   var cclass = jsonStr["sdStr"].replace("其它", "");
                   $("a[href*='" + cclass + "']").closest(".jsHoverFlex").each(function (i) {
                       $(this).data("YNsd", "1");
                       var morenstyle = $(this).closest(".jsHover").attr("morenstyle");
                       $(this).closest(".jsHover").find(".jsHoverFlex>a").attr({ "style": morenstyle })
                       HoverFlexAdd($(this), 0);
                   });
               }
           }
       }
   }catch(e){}
}


function HoverFlexAdd(that, YNnum) {
    var YNHF1 = false;
    if ($(that).closest(".jsHoverFlex1").length > 0) YNHF1 = true;

   
    if (!YNHF1) {
        var jsonval = that.data("jsonval");
        if (!jsonval) jsonval = {};
        if (YNnum == 1) {
            jsonval["YN"] = true;
            //console.log("gundongFun_HoverFlexAdd--",jsonval);
            that.data("jsonval", jsonval);
        }
        var hoverstyle = that.closest(".jsHover").attr("hoverstyle");
        that.find("a").eq(0).attr({ "style": hoverstyle });
    }
    $(that).closest(".jsHoverFlex1")
    $(that).addClass("jsHoverFlexYes");
    

    if ($(that).find(".js2层计高度").length > 0) {
        $(that).addClass("jsHFYesShow");
       setTimeout(function(){ PaiBanTongLan_H(false);},100); 
       setTimeout(function(){ PaiBanTongLan_H(false);},200); 
    }
 }
 function HoverFlexRemove(that,YNnum) {
        var jsonval = that.data("jsonval");
        if(!jsonval) jsonval={};
        var YN = jsonval["YN"];
        if (YN==undefined) YN = false;
        if(YNnum==-1){
          YN= false;
          jsonval["YN"]=false;
          that.data("jsonval",jsonval);
        }
      //console.log("HoverFlexRemove--", YN, jsonval);
      if (!YN) {
          var MoRenStyle = that.closest(".jsHover").attr("MoRenStyle");
          if (!MoRenStyle) MoRenStyle = "";
          if (that.closest(".jsHoverFlex1").length == 0) that.find("a").eq(0).attr({ "style": MoRenStyle });
          that.removeClass("jsHoverFlexYes");
          //.removeClass("jsHFYesShow")
        } 
    }
function setClickNum(ObjThis){
    var clickNum=ObjThis.data("clickNum");
    if(!clickNum)clickNum=0;
    clickNum++;
    ObjThis.data("clickNum",clickNum);
}
function YNClickNum(ObjThis){
   var clickNum=ObjThis.data("clickNum");
   if(clickNum>1) alert("有多个点击事件");
}


function gundongLoad()//滚动初始化
{
    $(".JSgundong").each(function (i) {//滚动模块
        var GDongObj = this;
        var click_topObj = $(this).find("[clickid]").eq(0);
        $(GDongObj).children("[clickid]").each(function (i) {
            var clickID = $(this).attr("clickid");
            var gdnum = $(GDongObj).children(".jsgundongdiv").index(this)
            var NewObj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + clickID);
            NewObj.unbind("click");
            NewObj.data("gdnum", gdnum);
            NewObj.click(function () {
                gundongFun(GDongObj, true, $(this).data("gdnum"), true);
            });
        });


        gundongFun(GDongObj, true, -1, true);
        var 滚动 = $(this).data("滚动")
        var 左边ID = 滚动["左边ID"];
        if (左边ID) if (左边ID != "") {
            var clickObj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 左边ID);
            clickObj.unbind("click");
            setClickNum(clickObj);
            clickObj.click(function () {
                //console.log("gundongFun左边ID");
                YNClickNum($(this));
                gundongFun(GDongObj, false, -1, false);
            });
        }

        var 右边ID = 滚动["右边ID"];
        if (右边ID) if (右边ID != "") {
            var clickObj = $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 右边ID);
            setClickNum(clickObj);
            clickObj.unbind("click");
            clickObj.click(function () {
                //console.log("gundongFun右边ID");
                YNClickNum($(this));
                gundongFun(GDongObj, false, -1, true);
            });
        }

        var 分版Obj = $(GDongObj).next("[data-分版样式]");
        if (分版Obj.length > 0) {
            var 分版样式 = 分版Obj.data("分版样式");
            var 每版个数 = 1;
            分版Obj.find(".page").each(function (i) {
                $(this).click(function () {
                    gundongFun(GDongObj, true, i, true);
                });
            });
            分版Obj.find(".pageLeft").click(function () {
                var SDObj = 分版Obj.find(".pageSD");
                var Num = 分版Obj.find(".page").index(SDObj) - 1;
                分版Obj.find(".page").eq(Num).click();
            });
            分版Obj.find(".pageRight").click(function () {
                var SDObj = 分版Obj.find(".pageSD");
                var Num = 分版Obj.find(".page").index(SDObj) + 1;
                分版Obj.find(".page").eq(Num).click();
            });
        }

        if ($(GDongObj).find(".JSgundong,.jsGunDongLB").length == 0) {
            //--------------------滑动开始---------------------------

            $(GDongObj).on("touchstart", function (e) {
                var touch = e.originalEvent.targetTouches[0];
                var ML_GD = $(this).css("margin-left");
                if (!ML_GD) ML_GD = "0";
                ML_GD = ML_GD.replace("px", "");
                var 滚动 = $(this).data("滚动");
                滚动["YNhover"] = true;
                $(this).data("滚动", 滚动).data("startX", touch.pageX).data("ML", 0).data("ML_GD", ML_GD);
            });
            $(GDongObj).on("touchmove", function (e) {
                var touch = e.originalEvent.targetTouches[0];
                var startX = $(this).data("startX");
                var endX = startX - touch.pageX;
                var ML = $(this).data("ML");
                var ML_GD = $(this).data("ML_GD");
                ML = parseInt(ML) - endX;
                ML = ML / autoWzoom + parseInt(ML_GD);
                $(this).data("endX", endX).css({ "margin-left": ML + "px" });
            });
            $(GDongObj).on("touchend", function (e) {//左右滑动成功
                var endX = parseFloat( $(this).data("endX"));
                var startX = parseFloat($(this).data("startX"));
                //console.log("touchend","endX",endX,"endX>0",(endX>0),"startX",startX);
                if(endX>0)
                {
                    var YN = false;
                    if (endX > 0) YN = true;
                    var 滚动 = $(this).data("滚动");
                    滚动["YNhover"] = false;
                    $(this).data("滚动", 滚动); 
                    gundongFun(GDongObj, false, -1, YN); 
                }
            });
            //-------------------滑动结束-------------------------------------
        }

    });
    $(".JSgundong").unbind("hover")
    //暂停滚动
    $(".JSgundong").hover(
      function () {
        var 滚动 = $(this).data("滚动");
        滚动["YNhover"]=true; 
        $(this).data("滚动",滚动);
      },
      function () {
        var 滚动 = $(this).data("滚动");
        滚动["YNhover"]=false; 
        $(this).data("滚动",滚动);
      }
    );
      $(".jsGunDongLB").each(function () {

          var 滚动设置 = $(this).data("滚动设置");
          var 滚动类型 = 滚动设置["滚动类型"];
          滚动设置["YNhover"] = "N";
          if (!滚动类型) 滚动类型 = "0";
          $(this).hover(function () {
              var 滚动设置 = $(this).data("滚动设置");
              滚动设置["YNhover"] = "Y";
              $(this).data("滚动设置", 滚动设置);
          },
          function () {
              var 滚动设置 = $(this).data("滚动设置");
              滚动设置["YNhover"] = "N";
              $(this).data("滚动设置", 滚动设置);
          });
          if (滚动类型 == "2") {
              无停滚动($(this));
          } else {
              滚动设置["NewNum"] = 0;
              var ObjThis = this;
              var dpibObj = $(ObjThis).find(".jsGDlie");
              gundongLBFun_jsGDlie(dpibObj, -1);
              滚动设置["MaxNum"] = dpibObj.length;
              if (滚动设置["滚动方法"] == "上下") {
                  var W = dpibObj.eq(0).outerHeight(true);
                  滚动设置["MaxW"] = W;
              } else {
                  var W = dpibObj.eq(0).outerWidth(true);
                  滚动设置["MaxW"] = W;
              }
              var 滚动个数 = 滚动设置["滚动个数"];
              if (!滚动个数 || 滚动个数 == "") 滚动个数 = 1;
              滚动个数 = parseInt(滚动个数);

              var 滚动行数 = 滚动设置["滚动行数"];
              if (!滚动行数 || 滚动行数 == "") 滚动行数 = 1;
              滚动行数 = parseInt(滚动行数);
              滚动设置["滚动行数"] = 滚动行数;
              var 滚动秒数 = 滚动设置["滚动秒数"];
              if (!滚动秒数 || 滚动秒数 == "") 滚动秒数 = 0;
              滚动秒数 = parseInt(滚动秒数);
              滚动设置["滚动秒数"] = 滚动秒数;
              var 选中框 = 滚动设置["选中框"];
              if (选中框) {
                  if (parseInt(选中框) > -1) {
                      gundongLBFun_选中(dpibObj, 选中框);
                  }
              }
              //--------------------滑动开始---------------------------
              $(ObjThis).on("touchstart", function (e) {
                  var touch = e.originalEvent.targetTouches[0];
                  var ML_GD = $(this).find(".jsGunDongLB_ml").css("margin-left");
                  ML_GD = ML_GD.replace("px", "");
                  $(this).data("startX", touch.pageX).data("ML", 0).data("ML_GD", ML_GD).removeAttr("endX");

                  //console.log("touch-start");

              });
              $(ObjThis).on("touchmove", function (e) {
                  var touch = e.originalEvent.targetTouches[0];
                  var startX = $(this).data("startX");
                  var endX = startX - touch.pageX;
                  var ML = $(this).data("ML");
                  var ML_GD = $(this).data("ML_GD");
                  ML = parseInt(ML) - endX;
                  ML = ML / autoWzoom + parseInt(ML_GD);
                  $(this).data("endX", endX).find(".jsGunDongLB_ml").css({ "margin-left": ML + "px" });
              });
              $(ObjThis).on("touchend", function (e) {//左右滑动成功
                  var endX = $(this).data("endX");
                  var YN = false;
                  if (endX == undefined) return;
                  if (endX > 0) YN = true;
                  var ML = $(this).data("ML_GD");

                  var 滚动设置 = $(this).data("滚动设置");
                  var MaxW = 滚动设置["MaxW"];
                  var 滚动行数 = 滚动设置["滚动行数"];
                  var NewNumValue = 0;
                  for (var Num = 0; Num < 滚动设置["MaxNum"]; Num = Num + parseInt(滚动行数) ) {
                      var NewML = (Num * MaxW * -1 / parseInt(滚动行数));
                      if (NewML <= ML + 10 || NewML <= ML - 10) {
                          NewNumValue = Num;
                          break;
                      }
                  }
                  滚动设置["NewNum"] = NewNumValue;
                  $(this).data("滚动设置", 滚动设置);
                  gundongLBFun(ObjThis, 滚动个数, YN, -1);
              });
              //-------------------滑动结束-------------------------------------

              var 分版Obj = $(this).find("[data-分版样式]");
              if (分版Obj.length > 0) {
                  var 分版样式 = 分版Obj.data("分版样式");
                  if (分版样式["外框"]) {
                      分版Obj.attr(分版样式["外框"]);
                      if(分版样式["默认显示"]) 分版Obj.find(".page").attr(分版样式["默认显示"]).removeClass("pageSD");
                      if (!选中框) 选中框 = "0";

                      if (分版样式["选中显示"]) 分版Obj.find(".page").eq(parseInt(选中框)).attr(分版样式["选中显示"]).addClass("pageSD");
                      else 分版Obj.find(".page").eq(parseInt(选中框)).addClass("pageSD");
                  }
                  var 每版个数 = parseInt(滚动设置["每版个数"]);

                  分版Obj.find(".page").each(function (i) {
                      $(this).click(function () { gundongLBFun(ObjThis, 滚动个数, false, i * parseInt(每版个数)); });
                  });
                  分版Obj.find(".pageLeft").click(function () {
                      var SDObj = 分版Obj.find(".pageSD");
                      var Num = 分版Obj.find(".page").index(SDObj) - 1;
                      分版Obj.find(".page").eq(Num).click();

                  });
                  分版Obj.find(".pageRight").click(function () {
                      var SDObj = 分版Obj.find(".pageSD");
                      var Num = 分版Obj.find(".page").index(SDObj) + 1;
                      分版Obj.find(".page").eq(Num).click();
                  });

              }
              var 滚动点击 = 滚动设置["滚动点击"];
              if (滚动点击 == "yes") {
                  $(this).find(".jsGDlie").each(function (i1) {
                      $(this).click(function () { gundongLBFun(ObjThis, 滚动个数, false, i1); });
                  });
              }
              if (dpibObj.length > 1 && 滚动秒数 > 1000) {
                  if (滚动设置["thatObj"]) clearInterval(滚动设置["thatObj"]);
                  滚动设置["thatObj"] = setInterval(function () { gundongLBFun(ObjThis, 滚动个数, true, -1); }, 滚动秒数);
              }
              $(this).data("滚动设置", 滚动设置);
              var 左边ID = 滚动设置["左边ID"];
              if (左边ID) if (左边ID != "") {
                  $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 左边ID).unbind("click");
                  $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 左边ID).click(function () {
                      gundongLBFun(ObjThis, 滚动个数, false, -1);
                  });
              }
              var 右边ID = 滚动设置["右边ID"];
              if (右边ID) if (右边ID != "") {
                  $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 右边ID).unbind("click");
                  $(this).closest("#showHtmlObj,#indexpanel,#wappanel").find("." + 右边ID).click(function () {
                      gundongLBFun(ObjThis, 滚动个数, true, -1);
                  });
              }
              //console.log("jsGunDongLB_end6")
          }
      });

  }
  function 无停滚动(that) {

      var DownObj = $(that).find(".jsGunDongLB_ml").eq(0);

      var ml = DownObj.css("margin-left");
      var 滚动设置 = $(that).data("滚动设置");
      if (滚动设置["滚动方法"].toString() == "上下") ml = DownObj.css("margin-top");

      if (!ml) ml = 0;
      else ml = parseInt(ml.replace("px", ""));
      var DownObj1 = DownObj.find(".jsGDlie").eq(0);
      var W = DownObj1.outerWidth(true);
      if (滚动设置["滚动方法"].toString() == "上下") W = DownObj1.outerHeight(true);

      if (Math.abs(ml) > (W + 10)) {

          DownObj.css({ "transition": "inherit" });
          DownObj1.appendTo(DownObj);
          setTimeout(function () { DownObj.css({ "transition": ".2s" }); }, 10);  
          ml = ml + W;


      }
      ml = ml - 10;
     
      var YNhover = "N";
      if (滚动设置["YNhover"]) YNhover = 滚动设置["YNhover"];
      //console.log("无停滚动", 滚动设置)
      if (YNhover != "Y") {
          if (滚动设置["滚动方法"].toString() == "上下") DownObj.css({ "margin-top": ml + "px" });
          else DownObj.css({ "margin-left": ml + "px" });
      }
      setTimeout(function () { 无停滚动(that); }, 210);
  }
function gundongLBFun_jsGDlie(thatAll,选中框)
{
   var Obj=thatAll.eq(0).find(".jsGunDongLB_showN").eq(0);
   thatAll.width(Obj.outerWidth(true));
   thatAll.height(Obj.outerHeight(true));
   if(选中框>-1){
     var ObjSd=thatAll.eq(选中框).find(".jsGunDongLB_showY").eq(0);
     thatAll.eq(选中框).width(ObjSd.outerWidth(true));
     //console.log("gundongLBFun_jsGDlie",ObjSd.outerWidth(true));
     var sdH = ObjSd.outerHeight(true);
     if (sdH > 0) thatAll.eq(选中框).height(sdH);
   }
}

function gundongLBFun_选中(thatAll,选中框){

    thatAll.removeClass("jsGunDongLB_show");
    thatAll.eq(parseInt(选中框)).addClass("jsGunDongLB_show");
    var newObj=thatAll.eq(parseInt(选中框));
   //console.log("gundongLBFun_选中",选中框);
    var DaTuObj=newObj.closest(".JSZJC").find(".jsGDDaTu");
    gundongLBFun_jsGDlie(newObj.closest(".jsGunDongLB_ml").find(".jsGDlie"),选中框);
    if(DaTuObj.length>0)
    {
        var src=newObj.find("img").eq(0).attr("src");
        DaTuObj.attr({"src":src});
        DaTuObj.closest("[rel='lightbox[plants]']").attr({"href":src})


    }
}
$(document).on("click", ".jsGDDaTu", function () {
    window.open($(this).attr("src"));
});
function iframe_zoom() {

    $("#wappanel").find("iframe").contents().find("body").css({ "zoom": autoWzoom });

}

function gundongLBFun(ObjThis,GD_num,YN,showNum){
 
   var 滚动设置=$(ObjThis).data("滚动设置");
   var Num=滚动设置["MaxNum"];
   var MaxW=滚动设置["MaxW"];
   var NewNum = parseInt(滚动设置["NewNum"]);
   NewNum = NewNum - (NewNum % GD_num);

   var 每版个数=滚动设置["每版个数"];
   if(!每版个数)每版个数=1;
   if(YN)NewNum=NewNum+parseInt(GD_num);
   else NewNum = NewNum - parseInt(GD_num);
   if (showNum > -1) NewNum = showNum;　

   var 结束转到开始=滚动设置["结束转到开始"];
   if(结束转到开始==undefined || 结束转到开始=="")结束转到开始="是";

   if (NewNum == Num && 结束转到开始=="是") NewNum = 0;
   else if(NewNum == Num ) NewNum=Num-parseInt(GD_num);
   else if((Num-parseInt(GD_num))<NewNum) NewNum=Num-parseInt(GD_num);
   else if (NewNum <= -parseInt(GD_num) && 结束转到开始=="是") NewNum = Num - parseInt(GD_num);
   else if (NewNum < 0) NewNum = 0;
   var 选中框 = 滚动设置["选中框"]; 
    if(选中框)
    {
        if(parseInt(NewNum)>-1 && parseInt(选中框)>-1){
            gundongLBFun_选中($(ObjThis).find(".jsGDlie"),NewNum);
        }
    }
   滚动设置["NewNum"]=NewNum;
   var NewNumML=NewNum;
   if(parseInt(GD_num)<parseInt(每版个数))
   {
     var pageNum=(parseInt(每版个数)-parseInt(GD_num))/2;
     NewNumML=NewNumML-pageNum;
     if(NewNumML>(Num-parseInt(每版个数))) NewNumML=Num-parseInt(每版个数);
     if(NewNumML<0)NewNumML=0;
   } 
    var 分版Obj=$(ObjThis).find("[data-分版样式]");
    if(分版Obj.length>0){
        var 分版样式=分版Obj.data("分版样式");
        if(分版样式["外框"]){
         分版Obj.attr(分版样式["外框"]);
         if (分版样式["默认显示"]) 分版Obj.find(".page").attr(分版样式["默认显示"]).removeClass("pageSD");
         else 分版Obj.find(".page").removeClass("pageSD");
         var 余Num=NewNumML%每版个数;
         var Num=(NewNumML-余Num)/每版个数;
         if(余Num>0) Num++;
         if (分版样式["选中显示"]) 分版Obj.find(".page").eq(Num).attr(分版样式["选中显示"]).addClass("pageSD");
         else 分版Obj.find(".page").eq(Num).addClass("pageSD");
        }
    }
    var 滚动行数=滚动设置["滚动行数"];
     if(滚动设置["滚动方法"]=="上下"){
        $(ObjThis).find(".jsGunDongLB_ml").css({"margin-top":(NewNumML*MaxW*-1/parseInt(滚动行数))+"px"});
     }else{
        var NewNumML余数 = NewNumML % parseInt(滚动行数);
        if (NewNumML余数 == 0) $(ObjThis).find(".jsGunDongLB_ml").css({ "margin-left": (NewNumML * MaxW * -1 / parseInt(滚动行数)) + "px" });
        else {
            $(ObjThis).find(".jsGunDongLB_ml").css({ "margin-left": ((NewNumML + parseInt(滚动行数) - NewNumML余数) * MaxW * -1 / parseInt(滚动行数)) + "px" });
        }
   }
   $(ObjThis).data("滚动设置",滚动设置);

}
function 移入模块重新高度(ObjThis) 
{
    var 滚动 = $(ObjThis).data("滚动");
    模块重新高度(ObjThis, 滚动["当前显示"], parseFloat(滚动["高度"].toString()));

}


function gundongFun(ObjThis,YN_load,SetNewNum,YN) //滚动
{
    var 滚动 = $(ObjThis).data("滚动");
    if (滚动["thatObj"]) clearTimeout(滚动["thatObj"]);
    var newNum = parseInt(滚动["当前显示"]);
    var YNhover=滚动["YNhover"];
    if(!YNhover) YNhover=false;
    if(!YN_load && !YNhover && YN) newNum++;
    else if(!YN_load && !YNhover && !YN) newNum--;
    else if(SetNewNum>-1)newNum=SetNewNum;
 
    if (parseInt(滚动["个数"]) <= newNum) newNum = 0;
    if(newNum==-1)newNum=parseInt(滚动["个数"])-1;
    滚动["当前显示"] = newNum;
    if (滚动["切换重新高度"] == "是") {
        if (!滚动["高度"]) {
            滚动["高度"] = $(ObjThis).height();
            $(ObjThis).find(".js_mouseenter").mouseenter(function () {
                setTimeout(function(){移入模块重新高度(ObjThis);},100);
            });
        }
        模块重新高度(ObjThis, newNum, parseFloat(滚动["高度"].toString()));
    }
    if (!YNhover) $(ObjThis).css({ "margin-left": "-" + newNum + "00%" });
    if (parseInt(滚动["个数"]) > 1 && parseInt(滚动["滚动秒数"])>1000){
      if(!YNhover){
         $(ObjThis).find(".js组件层[Keshi='true'][data-动画]").each(function(){
            strat动画($(this).attr("ymy_id"));
         });
     }
     if(SetNewNum==-1)  滚动["thatObj"] = setTimeout(function () { gundongFun(ObjThis,false,-1,true); }, parseInt(滚动["滚动秒数"]));
    }
    var clickID=$(ObjThis).children(".jsgundongdiv").eq(newNum).attr("clickID");
    if(clickID) if(clickID!=""){
        var clickObj=$("."+clickID);
        var classStr=clickObj.attr("class");
        if(classStr)if(classStr.indexOf("jsHoverFlex")>-1)
        { //导航栏使用
            var TopclickObj=clickObj.closest(".jsHover");
            var hoverstyle=TopclickObj.attr("hoverstyle");
            TopclickObj.find(".jsHoverFlexYes").each(function(){
               HoverFlexRemove($(this),-1)
           });
           $(ObjThis).find("[clickid]").each(function () { 
               HoverFlexRemove($("." + $(this).attr("clickid")), -1)
           });
            HoverFlexAdd(clickObj,1);
        } else {//列表
            $(ObjThis).find("[clickid]").each(function () {                
                $("." + $(this).attr("clickid")).removeClass("jsGunDongLB_show");
            });
            lie_click(clickObj, "jsGunDongLB_show")
        }
   }

   var 分版Obj = $(ObjThis).next("[data-分版样式]");
   if (分版Obj.length > 0) {
       var 分版样式 = 分版Obj.data("分版样式");       
       if (分版样式["外框"]) {
           分版Obj.attr(分版样式["外框"]);
           var 默认显示0 = 分版样式["默认显示"];
           if (默认显示0 == undefined) 默认显示0 = {};
           var 选中显示0 = 分版样式["选中显示"];
           if (选中显示0 == undefined) 选中显示0 = {};
           分版Obj.find(".page").attr(默认显示0).removeClass("pageSD");
           分版Obj.find(".page").eq(newNum).attr(选中显示0).addClass("pageSD");
       }
   }



     WenGengDuo_HuanYuan($(ObjThis),0);
     if (!YNhover) $(ObjThis).data("滚动", 滚动);
}