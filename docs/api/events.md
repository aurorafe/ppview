# 事件

## onPosition(event)
var lon = event.lon;  
var lat = event.lat;  
> 响应视点位置改变

可响应的数据如下
```javascript
var event = {
  lon: 114.012, // 经度单位为度
  lat: 39.231, // 纬度单位为度
  alt: 62.089, // 高程单位为米
  prev: { // 前一幁
    id: 1234,
    heading: 67,
  },
  next: { // 下一帧
    id: 1234,
    heading: 67,
  },
  back: { // 返回
    id: 1234,
    heading: 67,
  },
  branch: [ // 分叉
    {
      heading: 67,
    },
    {
      id: 1234,
      heading: 67,
    }
  ],
  history: [ // 历史帧
    {
      id: 1234,
      heading: 67,
    },
    {
      id: 1234,
      heading: 67,
    }
  ]
}
```


## onEye(event)
var heading = event.heading;  
var fovx = event.fovx;  

> 响应视角改变

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| heading | Number | 当前视线方向方位角，北方向为 0，单位为度 |
| fovx | Number | 当前水平视角，单位为度|


## onFeatureCreate(def) 
> 响应采集点、线、面工具

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| def | GeoJson | 要素定义，GeoJson 字符串 |

## onFeatureSelect(event) 
> 响应要素被控件工具选中 

参数

```javascript
var event={ 
  layer: layer, //图层 handle
  feature: handle, //要素 handle
  layername: "layerName", //图层名称
  fid: 123 //要素 id
}
```


## onFeatureRemove(event) 
> 响应要素被控件工具删除

参数 
 
```javascript
var event={   
  layer:hlayer, //图层 handle
  feature:handle, //要素 handle
  layername:"lay_name", //图层名称
  fid:123 //要素 id
} 
``` 


## onMeasure(def) 
> 响应测量工具

def 不同的测量工具，返回不同的定义
 * 样例 1：
 
 ```json
 {
  "length": 123.456
 }
 }
 ```
 * 样例 2：

 ```json
 {
   "length":10.459530,
   "dz":10.232580,
   "dxy":2.167046
 }
 ```
 
## onLocate(event)
> 响应 locate 和 locateByID，可判断是否成功  

event.state

其中 state 可选值：

```javascript
var LocateState={
  success: 0, // 成功
  typeError: 1, // 类型错误
  dataError: 2, // 数据错误
  imageError: 3, // 图片错误
  busy: 4 // 服务忙
};
```

## onTool(event)

> 监听工具切换事件,功能改变时，触发事件

```javascript
{
  tool: '(对应的工具id)'
}
```
