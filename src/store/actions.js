// 通过mutations间接更新state的多个方法对象
import {
  RECEIVE_CLASS1,
  RECEIVE_CLASS2,
  RECEIVE_GOODS,
  SET_PARENT_ID
} from './mutation-types'

import {
  queryClass,
  queryGoods
} from '../api'

export default {
  set_parent_id({commit}, id){
    commit(SET_PARENT_ID, {id})
  },
  async getClass({commit}){                                           //  异步获取class
    const queryData = {pageNumber:1, pageSize: 50}
    const res = await queryClass(queryData)                           //  发送异步ajax请求
    if(res.result_code === '00'){                                     //  提交一个mutation
      const class1 = res.result
      commit(RECEIVE_CLASS1, {class1})
    }
  },
  async getClass2({commit, state}){                                    //  异步获取class2
    const queryData = {class_parent_id: state.class_parent_id, pageNumber: 1, pageSize: 50}
    const res = await queryClass(queryData)                           //  发送异步ajax请求
    if(res.result_code === '00'){                                     //  提交一个mutation
      const class2 = res.result
      commit(RECEIVE_CLASS2, {class2})
    }
  },
  async getGoods({commit, state}){                                    //  异步获取 goods
    const queryData = {ref_factor_id: state.ref_factor_id, classId: state.classId, pageNumber: state.pageNumber, pageSize: state.pageSize}
    const res = await queryGoods(queryData)                           //  发送异步ajax请求
    if(res.result_code === '00'){                                     //  提交一个mutation
      const goods = [...state.goods, ...res.result]
      commit(RECEIVE_GOODS, {goods})
    }
  }
}
