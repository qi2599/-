// 通过mutations间接更新state的多个方法对象
import {
  REQ_LOGIN,
  REQ_ADDCAR
} from './mutation-types'

import {
  queryLogin,
  queryAddCar,
  queryCarNum
} from '../api'

export default {
  async getUserInfo({commit,state},{queryData,callback}){
    const res = await queryLogin(queryData)
    if(res.result_code === '00'){
      const userInfo = res.result
      setCookie('JSESSIONID',res.sessionId,1)
      localStorage.app_uid = state.custId = res.result.id
      localStorage.isLogin = 'true'
      callback()
      commit(REQ_LOGIN, {userInfo})
    }
  },
  async addCar({commit,state},{queryData,callback}){
    const res = await queryAddCar(queryData)
    if(res.result_code === '00'){
      let res = await queryCarNum({custId:state.userInfo.id})
      if(res.result_code === '00'){
        const cartsum = res.result.cartsum
        callback()
        commit(REQ_ADDCAR, {cartsum})
      }
    }
  }
}

function setCookie(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/wapback")
}
