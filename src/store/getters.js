// 包含多个基于state的getter计算属性的对象
export default {
  // 添加“所有商品”分类
  classList(state){
    if(state.class1){
      return [{id:'0', name:'所有商品'},...state.class1]
    }
    return ''
  }
}
