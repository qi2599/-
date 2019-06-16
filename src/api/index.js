// 与后台交互模块
import ajax from './ajax'
export const queryWapBar = () => ajax('prod/getWapBars')
export const queryClass = (queryData) => ajax('prod/queryClass', queryData)
export const queryGoods = (queryData) => ajax('prod/query', queryData)
export const getHomeGoods = () => ajax('prod/getIndexProducts')
export const queryDetail = (queryData) => ajax('prod/queryById', queryData)
export const queryHotSearch = () => ajax('busi/log/queryHot')
