// 直接更新state的多个方法对象
import {
  REQ_LOGIN,
  REQ_ADDCAR
} from './mutation-types'
export default {
  [REQ_LOGIN](state,{userInfo}){
    state.userInfo=userInfo
  },
  [REQ_ADDCAR](state, {cartsum}){
    state.cartsum=cartsum
  },
  setCarNum(state,{unm}){
    state.cartsum=unm
  },
  setCustId(state){
    state.custId=''
  }
}
