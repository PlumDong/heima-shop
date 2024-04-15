/**
 * 添加拦截器
 */
import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// // 添加拦截器
const httpInterceptor = {
  // 请求前触发
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时默认10秒
    options.timeout = 10 * 1000
    // 添加请求头
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加Token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    return options
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Date<T> {
  code: string
  msg: string
  result: T
}

const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Date<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(result) {
        // 成功
        if (result.statusCode >= 200 && result.statusCode < 300) {
          resolve(result.data as Date<T>)
        }
        // 401 错误,清理用户信息，跳转登录页
        else if (result.statusCode == 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' }).then((r) => {})
          reject(result)
        }
        // 通用错误
        else {
          uni.showToast({
            icon: 'none',
            title: (result.data as Date<T>).msg || '请求错误！',
          })
          reject(result)
        }
      },
      fail(result) {
        // 网络错误
        uni.showToast({
          icon: 'none',
          title: '网络错误！换个网络试试！',
        })
        reject(result)
      },
    })
  })
}

export { http }
