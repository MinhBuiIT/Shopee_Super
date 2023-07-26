import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import header_En from 'src/lang/en/header.json'
import productList_En from 'src/lang/en/productList.json'
import user_En from 'src/lang/en/user.json'
import header_Vi from 'src/lang/vi/header.json'
import productList_Vi from 'src/lang/vi/productList.json'
import user_Vi from 'src/lang/vi/user.json'

export const languageMode = {
  en: 'English',
  vi: 'Tiếng Việt'
}
export const resources = {
  en: {
    productList: productList_En,
    header: header_En,
    user: user_En
  },
  vi: {
    productList: productList_Vi,
    header: header_Vi,
    user: user_Vi
  }
}
export const defaultNS = 'productList'
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // if you'e using a language detector, do not define the lng option
    fallbackLng: 'vi',
    defaultNS,
    interpolation: {
      escapeValue: false
    }
  })
