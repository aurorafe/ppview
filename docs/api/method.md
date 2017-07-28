# 开发接口

> PPVision 控件javascript

## 方法

### getVersion()

> 查询当前 ppv 版本, 返回一个字符串

### setServer(url)
> 设置服务器地址，并验证服务。

| 参数url | type | example |
| :---: | :---: | :---: |
| WebService服务地址 | String | "http://211.101.37.253:8013//PPVServer.asmx" |

### setPref()

> 设定 ppv 系统参数

example: 

```javascript
var pref = {
  bgcolor: 0x000000, // 'rgb(255,255,255)'，背景色
  fullView: FullMode.trans, // 照片填充窗口的模式
  enableArrow: true, // 方向箭头
  enableHistory: true, // 历史表盘
  scope: 100, // 可视范围，米，只对点要素起作用
  thumb: 'Small', // 缩略图尺寸，可选['Middle', ’Small’]，缺省'Middle'
  arrows: { // 方向箭头位置
    forward: 5, // 向前，米
    below: 1.8, // 降低，米
    lean: 15, // 前倾，度
  },
  magnifier: { // 放大镜
    size: 256, // 放大镜尺寸，像素
    zoom: 5.0, // 放大倍数
    fix: false // 是否启动放大镜后，固定位置不变。PPVision 客户端 开发指南另一种方式是，放大镜随鼠标移动
  },
  key: { // 快捷键
    play: 32, // 播放 space
    fforward: 33, // 快进 page up
    fbackward: 34, // 快退 page down
    forward: 38, // 前进 up
    backward: 40, // 后退 down
    fullscreen: 120 // 全屏 f9
  },
  label: { // 标注样式
    fontface: '微软雅黑', // 字体
    fontsize: 15, // 字高，像素
    textColor: '#000000', // 文字颜色
    borderThickness: 1, // 边框线宽，如果取 0 值，将禁用边框
    borderFillet: 0, // 边框圆角
    borderColor: 'rgba(0,0,0,0.8)', //边框颜色
    backgroundColor: 'rgba(255,255,255,0.8)' //背景颜色
  }
}
// 其中 fullView 可选值：
var FullMode= {
  fill: 1, // 填充，黑边，保持全部数据可见
  trans: 2, // 镂空，露出背景，保持全部数据可见
  clip: 3, // 裁剪，充满 div，数据不全
  stretch: 4 // 拉伸，充满 div，会变形
}
// 注意：ppv 在网页中布局与 css 样式，请参考样例页面中的设计
```

### getPref()

> 获得当前ppv系统设置

### locate(type, lon, lat, key)

> 异步方式打开全景或可测量影像，会触发 onLocate 事件 

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 0、3、4 |
| lon | Number | 112.56 | 经度 |
| lat | Number | 23.56 | 纬度 |
| key | string | '' | 用户密钥 |
> 事件  
触发 onLocate 
详见事件描述

### locateByID(type, id)
> 通过id定位可测量影像（异步方式打开全景或可测量影像，会触发 onLocate 事件 ）

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 0、3、4 |
| id | String | '1111' | 每张影像对应的唯一标识 |
| key | String | '' | 用户密钥 |

> 事件
触发 onLocate事件

### step(step)

> 前进或后退

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| step | Number | -1 | 帧数，负数表示后退 |

### play() 

> 开始自动播放轨迹图像

### stop() 

> 停止播放轨迹图像

### isPlaying()

> 是否正在播放图像, 返回true/false

### setTool(tool) 

> 设置当前工具

example: 
```javascript
var tool = {
  none: 0,
  measurePoint: 1,
  measureLength: 2,
  measureArea: 3,
  measureZ: 4,
  measureFacade: 5,
  measureAngle: 6,
  measureSlope: 7,
  createPoint: 11,
  createPolyline: 12,
  createPolygon: 13,
  caliplane: 14,
  pick: 21,
  remove: 22,
  fullscreen: 23,
  lrs: 24,
  play: 31,
  stop: 32,
  next: 33,
  prev: 34,
  branch: 35,
  back: 36,
  history: 37
}
```

#### 事件

> 触发 onTool 事件


### getTool() 

> 查询当前工具返回工具 id ，见 setTool参数 cid定义

### setSampleMode(mode) 
> 设置采样模式。摄影测量法，定位一个点需要在两个影像点击两次，标定面法只需要点
  击一次，但需要预先标定面

mode 采样模式
```javascript
var SampleMode={
  none: 0,
  cloud: 1,
  photo: 2,
  ground: 3,
  plane: 4,
  object: 5,
  depth: 6
}
```
#### 事件  
> 触发 onSampleMode事件  


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

返回 图层定义，与 addLayer相同

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
| fixSize | 值为布尔值，为true时要素随视角变化，false时，保持大小不变 |
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
返回要素 handle  

### findFeature(fid) 

> 根据id 查找要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| fid | String | 要素fid |

### getFeature

> 获得要素定义 

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | object |  要素handle |

返回 string 要素定义， Json字符串，与 addFeature相同

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


### removeAllFeatures(layer) 

> 删除指定图层的所有要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| layer | 图层 handle |  图层handle |

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
