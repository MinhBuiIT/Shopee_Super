import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthPath } from 'src/apis/auth.api'
import { AuthType } from 'src/types/Auth.type'
import { ResponseMessage, ResponseType } from 'src/types/Response.type'
import {
  clearAll,
  clearKeyLC,
  getAccessTKFromLC,
  getRefreshTKFromLC,
  saveAccessTKToLC,
  saveRerfeshTKToLC,
  saveUserTKToLC
} from './authLocal'
import { isExpiredTokenUnauthorizedErr, isUnauthorizedErr } from './util'
export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenFlat: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTKFromLC() || ''
    this.refreshToken = getRefreshTKFromLC() || ''
    this.refreshTokenFlat = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
        }

        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === AuthPath.LOGIN || url === AuthPath.REGISTER) {
          const { access_token: accessTK, user, refresh_token: refreshTK } = (response.data as AuthType).data
          this.accessToken = accessTK
          this.refreshToken = refreshTK
          saveAccessTKToLC(accessTK)
          saveRerfeshTKToLC(refreshTK)
          saveUserTKToLC(JSON.stringify(user))
        } else if (url === AuthPath.LOGOUT) {
          this.accessToken = ''
          clearKeyLC('access_token')
          clearKeyLC('user')
          clearKeyLC('refresh_token')
        }

        return response
      },
      (err: AxiosError) => {
        if (![401, 422].includes(err.response?.status as number)) {
          const dataErr: ResponseMessage | undefined = err.response?.data as ResponseMessage
          const message = dataErr?.message || err.message
          toast.error(message)
        }
        if (isUnauthorizedErr<ResponseType<{ message: string; name: string }>>(err)) {
          //nếu lỗi 401 thì vào đây
          const config = err.config
          // 401: token hết hạn *,truyền token ko đúng, refreshTk hết hạn
          if (isExpiredTokenUnauthorizedErr(err) && config?.url !== AuthPath.REFRESHTOKEN) {
            // Nếu token hết hạn thì vào đây
            this.refreshTokenFlat = this.refreshTokenFlat
              ? this.refreshTokenFlat
              : this.handleRefreshToken().finally(() => {
                  // phải set lại null để ko gây lặp vô hạn khi access token lần t2 bị stale
                  setTimeout(() => {
                    this.refreshTokenFlat = null
                  }, 10000)
                })
            console.log('ErrorUnAth', err)
            return this.refreshTokenFlat.then((res) => {
              //phải return để trả về được data sau khi gửi accessTK mới lên headers
              return this.instance({ ...config, headers: { ...config?.headers, authorization: res } })
            })
          }
          this.accessToken = ''
          this.refreshToken = ''
          clearAll()
          toast.error(err.response?.data.data.message)
        }
        return Promise.reject(err)
      }
    )
  }
  private async handleRefreshToken() {
    return this.instance
      .post<ResponseType<{ access_token: string }>>(AuthPath.REFRESHTOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        saveAccessTKToLC(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.accessToken = ''
        this.refreshToken = ''
        clearAll()
        throw error
      })
  }
}

export const http = new Http().instance
