# 事件

## onPosition(event)
var lon = event.lon;
var lat = event.lat;
> 响应视点位置改变

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| lon | Number | 经度 |
| lat | Number | 纬度 |
| alt | Number | 高程（m）|


## onEye(event)
var heading = event.heading;
var fovx = event.fovx;
> 响应视角改变

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| heading | Number | 当前视线方向方位角，北方向为 0，单位为度 |
| fovx | Number | 当前水平视角，单位为度|

## onInit() 
> 响应控件初始化

## onTool(cid) 
> 响应setTool

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| cid | String |  当前工具 id，见 setTool 参数 cid 定义 |

## onSampleMode(mode) 
> 响应setSampleMode

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| mode | String |  当前采样模式，见 setSampleMode 参数 mode 定义 |

## onFeatureCreate(def) 
> 响应采集点、线、面工具

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| def | GeoJson | 要素定义，GeoJson 字符串 |

## onFeatureSelect(handle, fid) 
> 响应要素被控件工具选中

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | 要素handle | 要素handle |
| fid | String | 要素fid |

## onFeatureRemove(handle, fid) 
> 响应要素被控件工具删除

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | 要素handle | 要素handle |
| fid | String | 要素fid |

## onMeasure(def) 
> 响应测量工具

def 不同德测量工具，返回不同的定义
 * 样例 1：

 ```json
 {"length”:123.456}
 ```


 * 样例 2：

 ```json
 {"length":10.459530,"dz":10.232580,"dxy":2.167046}
 ```
