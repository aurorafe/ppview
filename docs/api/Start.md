# 插件相关

## 简介

PPVision是图行移动测量系统嵌入式开发控件，该控件可访问网络服务
器上实景或可测量影像资源，同时也提供了在图像上进行空间定位与量测的功能，开发
人员可以轻易地将该控件嵌入到 Web 应用的网页系统。

> 主要功能
> - 浏览全景或可测量影像
- 空间三维量测
- 空间三维采集

## 安装与部署

直接在页面引入即可

```html
<script type="text/javascript" src="../dist/js/ppv.min.js"></script>
<script type="text/javascript" src="../dist/js/jquery-1.12.3.min.js"></script>
<script>	
//创建PPV对象
var ppv = new PPV("ppv");
//设置服务地址
ppv.setServer("http://192.168.0.226:8013/PPVServer.asmx");
//根据坐标定位当前实景
function load(){
	ppv.locate(3, 115.874498, 26.41398, 0);
}
</script>

```
<body onload="load();">
	<div id="ppv"></div>
</body>
##集成效果
