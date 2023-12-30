// 封装请求模块
import Constants from './Constants';
import {getBoarding} from '../../../utils/BoardingUtil';
import NavigationUtil from '../../navigator/NavigationUtil';
/**
 * 发送get请求
 * @param api 请求接口
 */
export function get(api: string) {
  return async (params?: {}) => {
    const boarding = await getBoarding();
    const {headers, url} = Constants;
    return handleData(
      fetch(buildParams(url + api, params), {
        headers: {
          ...headers,
          'boarding-pass': boarding || '',
        },
      }),
    );
  };
}

/**
 * 发送post请求
 * @param api 请求地址
 * @returns 返回函数
 */
export function post(api: string) {
  return (params?: {}) => {
    return async (queryParams?: {} | string) => {
      const {headers, url} = Constants;
      const boarding = await getBoarding();
      var data = params instanceof FormData ? params : JSON.stringify(params);
      return handleData(
        fetch(buildParams(url + api, queryParams), {
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'application/json',
            ...headers,
            'boarding-pass': boarding || '',
          },
        }),
      );
    };
  };
}

/**
 * 处理接口响应数据
 * @param doAction 响应结果
 */
function handleData(doAction: Promise<any>) {
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        // 解析content-type 防止将非json数据进行json转换
        const type = res.headers.get('Content-Type');
        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        }
        return res.text();
      })
      .then(result => {
        console.log(result);
        // resolve(result);
        if (typeof result === 'string') {
          throw new Error(result);
        }
        const {code, msg, data: {list = undefined} = {}} = result;
        if (code === 401) {
          // 跳转登录页
          NavigationUtil.resetToLoginPage({msg});
          return;
        }
        resolve(list || result);
      })
      .catch(err => {
        console.log('响应错误HiNet', err);
        reject(err);
      });
  });
}

/**
 * 构建url参数
 * @param url 请求路径
 * @param params 请求参数
 * @returns 构建结果
 */
function buildParams(url: string, params?: {} | string): string {
  let newUrl = new URL(url);
  let finalUrl;
  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof params === 'string') {
    // 适配path参数
    finalUrl = url.endsWith('/') ? url + params : url + '/' + params;
  } else {
    finalUrl = newUrl.toString();
  }
  console.log('---buildParams:', finalUrl);
  return finalUrl;
}
