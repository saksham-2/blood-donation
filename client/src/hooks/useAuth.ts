import { useRecoilState } from 'recoil'
import { authState } from '../store/auth'
import { User } from '../types/user'

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState)

  const login = (user: User, token: string) => {
    setAuth({
      user,
      token,
      isAuthenticated: true
    })
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false
    })
    localStorage.removeItem('token')
  }

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    login,
    logout
  }
} 