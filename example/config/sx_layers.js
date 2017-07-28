var layerConfig = {
  layers: [
    {
      layerName: 'GIS_QL',
      tableName: 'gl_qiao',
      name: '公路桥梁'
    },
    {
      layerName: 'GIS_SD',
      tableName: 'gl_suid',
      name: '公路隧道'
    },
    {
      layerName: 'GIS_FWQ',
      tableName: 'gl_fwq',
      name: '服务区'
    },
    {
      layerName: 'GIS_CRK',
      tableName: 'gl_crk',
      name: '出入口'
    },
    {
      layerName: 'GIS_SFZ',
      tableName: 'gl_sfz',
      name: '收费站'
    },
    {
      layerName: 'GIS_ZCZ',
      tableName: 'gl_zcz',
      name: '治超站'
    },
    {
      layerName: 'GIS_VIDEO',
      tableName: 'gl_jksssb',
      name: '监控摄像设备'
    },
    {
      layerName: 'GIS_QBB',
      tableName: 'gl_kbqbb',
      name: '可变情报板'
    },
    {
      layerName: 'GIS_BZBP',
      tableName: 'gl_bzbp',
      name: '标识标牌'
    }
  ],
  /**
   * 根据tableName或tableName获取配置信息
   * @param tableName
   * @returns {*}
   */
  getLayerConfigBytableName: function (tableName) {
    var layerConfig = null
    this.layers.every(function (layer) {
      if (tableName === layer['tableName'] || tableName === layer['tableName']) {
        layerConfig = layer
        return false
      } else {
        return true
      }
    })
    return layerConfig
  }
}