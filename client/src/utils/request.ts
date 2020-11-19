/**
 * @description http 请求方法
 * @author ronffy
 * @Date 2019-11-19 13:20:52
 * @LastEditTime 2019-12-25 20:37:21
 * @LastEditors cq
 */
import Taro from '@tarojs/taro';
import qs from 'qs';
import globalApp from './globalApp';
import delay from './delay';
import apis from '@config/apis';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type RequestOptions = Partial<{
  method: Method
  header: object
  data: object | string
  params: object
  noErrorToast: boolean // 不启用错误 toast 提示（如需自己控制错误提示而不使用公共错误提示时启用）
  [props: string]: any
}>

type ReuqestUrl = {
  url: string
}

type RequestFn = (url: string, opts?: RequestOptions) => Promise<any>;

type RequestMethods = {
  post: RequestFn
  get: RequestFn
  delete: RequestFn
  put: RequestFn
}

type Request = RequestFn & RequestMethods;

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const defaultErrorResponse = {
  message: '网络错误，请重试',
  success: false,
  data: null
};

const defaultHeader = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json; charset=utf-8',
}

const defaultOptions: RequestOptions = {
  method: 'GET',
  header: defaultHeader,
};

const request: Request = async (url, opts: RequestOptions = {}) => {
  let Authorization;
  if (!url.includes(apis.login)) {
    Authorization = await awaitAuthorization();
    if (!Authorization) {
      console.error('获取 Authorization 失败');
      return defaultErrorResponse;
    }
  }

  const options: RequestOptions = {
    ...defaultOptions,
    ...opts,
    header: {
      Authorization,
      ...defaultHeader,
      ...opts.header,
    }
  }
  const { method, data, params } = options;
  const uppMethod = method.toUpperCase();

  // get 请求时，解析 data ，拼接到 url 上
  if (uppMethod === 'GET' && (data || params)) {
    const _params = qs.stringify(data || params);
    url = `${url}${url.includes('?') ? '&' : '?'}${_params}`;
    delete options.data;
  }
  // 非 get 请求时，通过 params 向 url 上添加参数
  if (uppMethod !== 'GET' && params) {
    const _params = qs.stringify(params);
    url = `${url}${url.includes('?') ? '&' : '?'}${_params}`;
    delete options.params;
  }
  // 添加时间戳
  url = `${url}${url.includes('?') ? '&' : '?'}_t=${+new Date()}`;

  return dispatchRequest({
    url,
    ...options
  });
}

async function dispatchRequest(opts: RequestOptions & ReuqestUrl) {
  return Taro.request(opts)
    .then(res => {
      const { statusCode, data = {} } = res;
      if (statusCode !== 200 || data.code !== 0) {
        console.error(`接口请求报错,statusCode不是200 或 返回的code不是0。`, opts, res);

        const errorMsg = data.error || data.message || defaultErrorResponse.message;
        if (!opts.noErrorToast) {
          Taro.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
        return {
          ...defaultErrorResponse,
          message: errorMsg
        }
      }

      return {
        ...res,
        success: true,
        statusCode,
        data: data.data
      }
    })
    .catch(error => {
      console.error(`接口请求报错,http状态码不是200`, opts, error);
      return defaultErrorResponse;
    });
}

async function awaitAuthorization() {
  let Authorization = globalApp.get('Authorization');
  let i = 0;
  while (!Authorization && i++ < 20) {
    await delay(100);
    Authorization = globalApp.get('Authorization');
  }
  return Authorization;
}

// 添加简便方法
request.get = (url, opts) => request(url, {
  ...opts,
  method: 'GET'
});
request.post = (url, opts) => request(url, {
  ...opts,
  method: 'POST'
})
request.put = (url, opts) => request(url, {
  ...opts,
  method: 'PUT'
})
request.delete = (url, opts) => request(url, {
  ...opts,
  method: 'DELETE'
})

export default request;
