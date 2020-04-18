// ajax获取
import axios from 'axios'
// 引入Vuex中的store
import store from '../store'
class Ajax {
    constructor() {
        // 请求的路径
        this.baseURL = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000';
        this.timeout = 3000; //超时时间
        this.queue = {}; //存放每次的请求
    }
    merge(options) {
        return {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout
        }
    }
    // 设置一个请求+响应拦截器
    setInterceptor(instance,url) {
        // 设置一个请求拦截器
        // 更改请求头
        // 每次请求时都会加一个loading效果
        instance.interceptors.request.use((config) => {
            // console.log(config);
            config.headers.Authorization = 'xxx';
            if (Object.keys(this.queue).length === 0) {
                store.commit('showLoading');
            }
            this.queue[url] = url;
            return config;
        })
        // 设置一个响应拦截器
        // 如果上一个promise返回了一个常量 会作为下一个promise的输入
        instance.interceptors.response.use((res) => {
            delete this.queue[url];//每次请求成功后，都删除队列里面的路径
            if (Object.keys(this.queue).length === 0) {
                store.commit('hideLoading')
            }
            return res.data;
        })
    }
    request(options) { //外部传递过来的 url,method、data数据参数等...
        let instance = axios.create(); //通过axios库创建一个axios实例
        this.setInterceptor(instance, options.url);
        let config = this.merge(options);
        return instance(config); //axios执行后返回的是一个promise
    }
}
export default new Ajax