import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { useEffect, useRef } from 'react'
import { userStorage } from 'utils/localStorage'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()
  const user = authStore.user
  const timerRef = useRef<any>(null)

  const refreshTokens = async () => {
    const response = await API.refreshTokens()
    if (response.data.statusCode === StatusCode.FORBIDDEN) {
      await API.signout()
      userStorage.clearUser()
      authStore.signout()
      navigate('/')
    } else {
      authStore.login(response)
    }
  }

  useEffect(() => {
    if (userStorage.getUser()) {
      (async () => {
        const response = await API.fetchUser()
        if (response.data.email) {
          authStore.login(response.data)
          clearInterval(timerRef.current)
          timerRef.current = setInterval(refreshTokens, 840000)
        } else if (response.data.statusCode === StatusCode.UNAUTHORIZED) {
          userStorage.clearUser()
          authStore.signout()
          navigate('/')
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (user) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(refreshTokens, 840000)
    }
  }, [user])
}

export default useAuth
