import Vue from 'vue'
import {login} from '../api/user';
import Vuex from 'vuex'
import { Form } from 'iview'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading:false,
    username: 'xxx'
  },
  // 用来获得state里面的数据的
  getters:{},
  mutations: {//commit
    // mutations里面方法的参数都是state
    showLoading(state){
      state.isShowLoading = true;
    },
    hideLoading(state){
      state.isShowLoading = false;
    },
    setUser(state, username){
      state.username = username;
    }
  },
  // 存放这个接口调用
  actions: {//dispatch
      async toLogin({commit},username){
       let res = await login(username)
       if(res.code === 0){//成功
          commit('setUser',res.username)
       }else{
        //  返回的失败的promise
         return Promise.reject(res.data)
       }
      }
  },
  modules: {
  }
})
