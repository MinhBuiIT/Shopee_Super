import axios, { AxiosInstance, AxiosError } from 'axios'
import { HttpStatusCode } from 'src/contants/HttpStatus'
import { toast } from 'react-toastify'
import { ResponseMessage } from 'src/types/Response.type'
import { AuthType } from 'src/types/Auth.type'
import { clearKeyLC, getAccessTKFromLC, saveAccessTKToLC, saveUserTKToLC } from './authLocal'
import { Path } from 'src/contants/path'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTKFromLC() || ''
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
        if (url === Path.login || url === Path.register) {
          const { access_token: accessTK, user } = (response.data as AuthType).data
          this.accessToken = accessTK
          saveAccessTKToLC(accessTK)
          saveUserTKToLC(JSON.stringify(user))
        } else if (url === Path.logout) {
          this.accessToken = ''
          clearKeyLC('access_token')
          clearKeyLC('user')
        }

        return response
      },
      (err: AxiosError) => {
        if (err.response?.status === HttpStatusCode.NotFound) {
          const dataErr: ResponseMessage | undefined = err.response.data as ResponseMessage
          const message = dataErr.message || err.message
          toast.error(message)
        }
        return Promise.reject(err)
      }
    )
  }
}

export const http = new Http().instance
