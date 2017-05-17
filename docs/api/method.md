# 开发接口

> PPVision 控件javascript

## 方法

### setServer(url)
> 设置服务器地址，并验证服务。

| 参数url | type | example |
| :---: | :---: | :---: |
| WebService服务地址 | String | "http://211.101.37.253:8013//PPVServer.asmx" |



### locate(type, lon, lat, alt)

> 异步方式打开全景或可测量影像，会触发 onLocate 事件 

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 3、4 |
| lon | Number | 112.56 | 经度 |
| lat | Number | 23.56 | 纬度 |
| alt | Number | 0 | 高程 |
> 事件  
触发 onLocate 
详见事件描述

### locateByID(type, id)
> 通过id定位可测量影像（异步方式打开全景或可测量影像，会触发 onLocate 事件 ）

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 3、4 |
| id | String | '1111' | 每张影像对应的唯一标识 |

> 事件
触发 onLocate事件

### play() 
> 开始自动播放轨迹图像

### stop() 
> 停止播放轨迹图像

### setTool(cid) 
> 设置当前工具

| 类型 | 说明 |
| :---: | :---: |
参数 
cid 
工具定义 
var Tool= {
    none:0, 
    measurePoint:1, 
    measureLength:2,
    measureArea:3, 
    measureZ:4, 
    measureFacade:5, 
    measureAngle:6, 
    measureSlope:7, 
    createPoint:11, 
    createPolyline:12, 
    createPolygon:13, 
    pick:21, 
    remove:22
 };
bool mousedown 是否触发了 mousedown事件

事件
触发 onTool事件  



### getTool() 
> 查询当前工具
返回   
工具 id ，见 setTool参数 cid

定义
### setSampleMode(mode) 
> 设置采样模式。摄影测量法，定位一个点需要在两个影像点击两次，标定面法只需要点
击一次，但需要预先标定面。

mode 采样模式
 varSampleMode= { 
    none:0, 
    cloud:1,
    photo:2, 
    ground:3,
    plane:4, 
    object:5, 
    depth:6
 };
事件  

触发 onSampleMode事件  


### getSampleMode() 
> 查询当前采样模式

返回 
long 采样模式，见 setSampleMode  

参数 mode定义  

### getFrame() 
> 查询当前照片 id

| 类型 | 说明 |
| :---: | :---: |
| id  | 当前照片 id |



### lookAt(lon, lat, alt) 
> 定位视线方向，通过当前视点位置与目标点坐标，确定一条射线

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| lon | Number | 经度 |
| lat | Number | 纬度 |
| alt | Number | 高程 |

### addLayer(def) 
> 添加一个图层

参数def 图层定义
样例：
```json
样例 1 ：
{
    "name":"Lamp Pole", //图层名称
    "type":"Point", //Point, Line, Polygon 三种类型，并非强约束
    "color":"0xffffff", //颜色
    "size":15, //点大小，或线宽，单位是像素
    "icon":"http://localhost/icon/019-marker.png" //支持 png、jpg
}
```
```json
样例 2 ：
{
    name:"Road", // 图层名称 
    type:"Line", //Point,Line,Polygon三种类型，并非强约束
    color:"rgb(255,0,255)", //RGBAorRGB ，颜色 
    lineWidth:2, // 线宽，单位是像素， windows平台仅支持 1
}
```

注意：Line、Polygon 类型的图层，不应该设置 icon


### findLayer(name) 
> 根据图层名，查找图层
参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| name | String | 图层名 |

### getLayer
> 获得图层定义 
参数 
| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | :---: | 图层句柄 |

返回 
图层定义，与 addLayer相同

### setLayer
> 重新定义图层，更新已有图层样式 
参数 
| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | :---: | 图层句柄 |
| def    | :---: | 图层定义，与 addLayer相同 |
 
   

### removeLayer(handle) 
> 删除图层

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | String | 图层handle |

### removeAllLayers() 
> 删除所有图层


### addFeature(hlayer, def) 
> 向指定图层添加点、线、面要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| hlayer | String | 图层handle |
| def | json | 要素定义，GeoJson 字符串 |

注意：支持基本 GeoJson 对象，但不支持 GeometryCollection、FeatureCollection 对象
其中 properties 不是必须，
可识别的属性包括：

| 参数 | 说明 |
| :---: | :---: |
| name | 标注内容 |
| fid | 要素 id |
| color | 颜色，替代图层设置 |
| size | 点大小、线宽，单位是像素，替代图层设置 |
| icon | 图标符号，替代图层设置 |
| toGround | 高程值是否相对于地面{1 绝对高程，to_gound = false 2 如果帧包含地面高差信息，高程可以相对于地面 3 如果没有地面高差信息，高程可以相对于当前视点} |

样例

```json
{
    "type":"Feature",
    "fid":1234,
    "name":"灯杆",
    "toGround":0.5, 
    "geometry":{
        "type":"Point",
        "coordinates": [
            103.7618144853319,
            36.08614306284845,
            1481.648249594895
        ]
    }
}
```
返回  
要素 handle  

### findFeature(fid) 
> 根据id 查找要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| fid | String | 要素fid |

### getFeature
> 获得要素定义 

| 参数 | 类型 | 说明 |
参数 handle 要素句柄 
| :---: | :---: | :---: |
| handle | '--' |  要素handle |
返回 
string 
要素定义， Json字符串，与 addFeature相同

### setFeature
> 重新定义要素，更新已有要素 


| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | '--' | 要素句柄 |
| def    | '--' | 要素定义 与 addFeature相同


### removeFeature(handle) 
> 删除要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | '' |  要素handle |


### removeAllFeatures(hlayer) 
> 删除指定图层的所有要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| hlayer | 图层 handle |  图层handle |

### selectFeature(handle) 
> 选中要素，高亮显示

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | 要素 handle |  要素 handle |

### visible()

> 隐藏或显示图层或要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | 图层或要素handle |  图层或要素 handle |
| visible | 布尔 |  是否可见 |
