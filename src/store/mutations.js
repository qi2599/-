// 直接更新state的多个方法对象
import {
  RECEIVE_CLASS1,
  RECEIVE_CLASS2,
  RECEIVE_GOODS,
  SET_PARENT_ID
} from './mutation-types'
export default {
  [SET_PARENT_ID](state, {id}){
    state.class_parent_id=id
  },
  [RECEIVE_CLASS1](state,{class1}){
    state.class1 = class1
  },
  [RECEIVE_CLASS2](state,{class2}){
    state.class2 = class2
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
}
