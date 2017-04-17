# 开发接口

> PPVision 控件javascript

## 方法

### setServer(url)
> 设置服务器地址，并验证服务。

| 参数url | type | example |
| :---: | :---: | :---: |
| WebService服务地址 | String | "http://211.101.37.253:8013//PPVServer.asmx" |

> 返回数据

| 标识 | 状态 |
| :---: | :---: |
| 0 | 成功 |
| 1 | 服务检测软件狗信息失败 |
| 2 | 服务验证操作失败 |
| 3 | 服务未授权 |

### setSRS(srs) (正在开发中。。。)
> 设置系统参照系。
srs 参照系定义

```bash
<srs>
    <gcs>
        <datum>Beijing 1954</datum>
        <spheroid>Krassowsky 1940</spheroid>
        <prime_meridian>0</prime_meridian>
        <semi_major>6378245</semi_major>
        <inv_flattening>298.3</inv_flattening>
    </gcs>
    <tm>
        <center_lon>116.3502518</center_lon>
        <center_lat>39.86576603</center_lat>
        <scale_factor>1</scale_factor>
        <false_easting>500000</false_easting>
        <false_northing>300000</false_northing>
    </tm>
    <param7>
        <dx>-238.7663460969925</dx>
        <dy>-259.1800392195582</dy>
        <dz>4.466602623462677</dz>
        <ex>-3.781164154498</ex>
        <ey>3.82832126902211</ey>
        <ez>-7.35755130731509</ez>
        <s>-3.904750371819254</s>
    </param7>
</srs>
```

> 返回数据

| 标识 | 状态 |
| :---: | :---: |
| 0 | 成功 |
| 1 | 失败 |

### locate(type, lon, lat, alt)

> 打开可测量影像

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 3、4 |
| lon | Number | 112.56 | 经度 |
| lat | Number | 23.56 | 纬度 |
| alt | Number | 0 | 高程 |

> 返回数据

| 标识 | 状态 |
| :---: | :---: |
| 0 | 成功 |
| 1 | 系统忙，正在下载 |
| 2 | type无效 |
| 3 | 轨迹数据无效 |
| 4 | 需要换带，请保存并删除所有要素 |

### locateByID(type, id) (正在开发中。。。)
> 通过id定位可测量影像

| 参数 | type | example | 说明 |
| :---: | :---: | :---: | :---: |
| type | Number | 3 | 图像类型，目前仅支持 3、4 |
| id | String | '1111' | 每张影像对应的唯一标识 |

> 返回数据

| 标识 | 状态 |
| :---: | :---: |
| 0 | 成功 |
| 1 | 系统忙，正在下载 |
| 2 | type无效 |
| 3 | 轨迹数据无效 |
| 4 | 需要换带，请保存并删除所有要素 |
| 5 | 未授权 |

### play() (正在开发中。。。)
> 开始自动播放轨迹图像

### stop() (正在开发中。。。)
> 停止播放轨迹图像

### setTool(cid) (正在开发中。。。)
> 设置当前工具

| 类型 | 说明 |
| :---: | :---: |
| reset_tool  | 重置工具 |
| select  | 选择 |
| caliplane  | 标定面 |
| create_point  | 采集点 |
| create_line  | 采集线 |
| create_polygon  | 采集面 |
| measure_position  | 测量位置坐标 |
| measure_length  | 测量长度 |
| measure_area  | 测量面积 |

### getTool() (正在开发中。。。)
> 查询当前工具

### setSampleMode(mode) (正在开发中。。。)
> 设置采样模式。摄影测量法，定位一个点需要在两个影像点击两次，标定面法只需要点
击一次，但需要预先标定面。

mode 采样模式

| 类型 | 说明 |
| :---: | :---: |
| id_sample_cloud  | 点云 |
| id_sample_photo  | 摄影测量 |
| id_sample_3d  | 3D 对象 |
| id_sample_plane  | 标定面 |
| id_sample_ground  | 地面 |
| id_sample_depth  | 深度图 |

事件

触发 onSampleMode 事件

### getSampleMode() (正在开发中。。。)
> 查询当前采样模式

### getFrame() (正在开发中。。。)
> 查询当前照片 id

| 类型 | 说明 |
| :---: | :---: |
| id  | 当前照片 id |

### toggleFullscreen() (正在开发中。。。)
> 切换全屏显示
  * 快捷键
  * z：切换全屏、正常
  * esc: 切换正常

> 返回数据

| 标识 | 状态 |
| :---: | :---: |
| 0 | 正常 |
| 1 | 全屏 |

### popHtml(url) (正在开发中。。。)

> 弹出网页窗口，并定向到 url

### eyeRotateHor[Ver](angle) (正在开发中。。。)
> 水平[垂直]旋转视线

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| angle | Number | 旋转角度，单位为度，正值顺时针旋转，负值逆时针旋转 |

### eyeFov(scale) (正在开发中。。。)
> 视角缩放

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| scale | Number | 缩放比例，取值应大于 0，大于 1 放大，小于 1 缩小 |

### lookAt(lon, lat, alt) (正在开发中。。。)
> 定位视线方向，通过当前视点位置与目标点坐标，确定一条射线

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| lon | Number | 经度 |
| lat | Number | 纬度 |
| alt | Number | 高程 |

### addLayer(def) (正在开发中。。。)
> 添加一个图层

参数def 图层定义
样例：
```json
{
    "name":"Lamp Pole", //图层名称
    "type":"Point", //Point, Line, Polygon 三种类型，并非强约束
    "color":"0,0,255,255", //RGBA or RGB，颜色
    "size":15, //点大小，或线宽，单位是像素
    "icon":{ //如果定义了 icon，将忽略 color 与 size
        "size":[48,48], //图标大小
        "offset":[0,24], //图标偏移
        "url":"http://localhost/icon/019-marker.png" //支持 png、jpg
    }
}
```

注意：Line、Polygon 类型的图层，不应该设置 icon


### findLayer(name) (正在开发中。。。)
> 根据图层名，查找图层
参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| name | String | 图层名 |

### removeLayer(handle) (正在开发中。。。)
> 删除图层

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | String | 图层handle |

### removeAllLayers() (正在开发中。。。)
> 删除所有图层


### addFeature(hlayer, def) (正在开发中。。。)
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
| to_ground | 高程值是否相对于地面{1 绝对高程，to_gound = false 2 如果帧包含地面高差信息，高程可以相对于地面 3 如果没有地面高差信息，高程可以相对于当前视点} |

样例

```json
{
    "type":"Feature",
    "properties":{
        "fid":1234,
        "name":"灯杆",
        "color":"0,255,255,255",//RGBA or RGB
        "size":25,
        "icon":{
        "size":[32,32],
        "offset":[0,16],
        "url":"http://localhost/icon/019-marker.png"
    }
    },
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


### findFeatureByID(fid) (正在开发中。。。)
> 根据id 查找要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| fid | String | 要素fid |

### removeFeature(handle) (正在开发中。。。)
> 删除要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | '' |  要素handle |


### removeAllFeatures(hlayer) (正在开发中。。。)
> 删除指定图层的所有要素

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| hlayer | 图层 handle |  图层handle |

### selectFeature(handle) (正在开发中。。。)
> 选中要素，高亮显示

参数

| 参数 | 类型 | 说明 |
| :---: | :---: | :---: |
| handle | 要素 handle |  要素 handle |
