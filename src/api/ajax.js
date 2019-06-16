// ajax 请求函数模块
import axios from 'axios'
// 自动切换环境
if (process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug'){
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://139.159.204.137/wapback/app/';
}
//设置超时时间
axios.defaults.timeout = 2000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//对外接口
export default function ajax(url='', data={}, method='POST'){
  if(method === 'GET'){
    return get(url, data);
  }else if(method === 'POST'){
    return post(url, data);
  }
}
// 封装get方法
function get(url, data){
  return new Promise((resolve, reject) =>{
    url = url + '?' + dataStr(data)
    axios.get(url).then(res =>{
      resolve(res.data);
    }).catch(err =>{
      reject(err);
    })
  });
}
// 封装post方法
function post(url, data){
  return new Promise((resolve, reject) =>{
    data = dataStr(data)
    axios.post(url, data).then(res =>{
      resolve(res.data);
    }).catch(err =>{
      reject(err);
    })
  });
}

//数据拼接字符串
function dataStr(data) {
  let str = ''
  Object.keys(data).forEach(key => {
    str += key + '=' + data[key] + '&'
  })
  if (str !== '') {
    str = str.substring(0, str.lastIndexOf('&'))
  }
  return str
}

// https://www.jianshu.com/p/0842ade7a4ac
