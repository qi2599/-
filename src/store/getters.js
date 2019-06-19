// 包含多个基于state的getter计算属性的对象
export default {
  // 添加“所有商品”分类
  custId(state){
    if(state.userInfo){
      return state.userInfo.id
    }
    return ''
  }
}
