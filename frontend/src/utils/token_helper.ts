import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { instance } from './network_manager'

const removeFromStorage = async (key: string) => {
  const encryptedValue = localStorage.getItem(key)
  if (encryptedValue) {
    localStorage.removeItem(key)
  }
}

export const checkTokenValidity = async () => {
  // Erişim token'ını al
  const authStore = useAuthStore()
  const { _accessToken: token } = storeToRefs(authStore)
  const accessToken = token.value

  // Eğer token yoksa veya süresi dolmuşsa, yeniden kimlik doğrulama yapılmalıdır.
  if (!accessToken || isTokenExpired(accessToken)) {
    // Yeniden kimlik doğrulama işlemleri...
    await removeFromStorage('authStore')
    useAuthStore().$reset()
    instance.defaults.headers['Authorization'] = null
  }
}

const isTokenExpired = (token: string) => {
  // Token'ın geçerlilik süresini kontrol et
  const expirationTime = decodeToken(token).exp

  // Şu anki zamanı al
  const currentTime = Math.floor(Date.now() / 1000)

  // Token süresi geçmişse true döndür
  return expirationTime < currentTime
}

const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(atob(base64))
}
