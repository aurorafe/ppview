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


## onFeatureCreate(def) 
> 响应采集点、线、面工具

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| def | GeoJson | 要素定义，GeoJson 字符串 |

## onFeatureSelect(event) 
> 响应要素被控件工具选中 

参数

event={ 
layer:hlayer, //图层 handle
feature:handle, //要素 handle
layername:"lay_name", //图层名称
fid:123 //要素 id
}


## onFeatureRemove(event) 
> 响应要素被控件工具删除

参数 
 
event={   
layer:hlayer, //图层 handle  
feature:handle, //要素 handle  
layername:"lay_name", //图层名称  
fid:123 //要素 id  
}  


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
## onLocate
> 响应 locate 和 locateByID，可判断是否成功  
参数  
event={   
state:LocateState.success  
}   
varLocateState= { success:0, typeError:1, dataError:2, imageError:3 };  
