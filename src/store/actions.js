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
  async getUserInfo({commit,state},{queryData,success,fail}){
    const res = await queryLogin(queryData)
    if(res.result_code === '00'){
      const userInfo = res.result
      setCookie('JSESSqueryCustVirtualIONID',res.sessionId)
      localStorage.app_uid = state.custId = res.result.id
      localStorage.cust_name = res.result.cust_name
      localStorage.isLogin = 'true'
      success()
      commit(REQ_LOGIN, {userInfo})
    }else if(res.result_code === '1062'){
      fail(res.result_desc)
    }
  },
  async addCar({commit,state},{queryData,callback}){
    const res = await queryAddCar(queryData)
    if(res.result_code === '00'){
      callback()
      let res = await queryCarNum({custId:localStorage.app_uid})
      if(res.result_code === '00'){
        let cartsum = res.result.cartsum
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
