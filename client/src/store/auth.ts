import { atom } from 'recoil'
import { AuthState } from '../types/user'

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    token: null,
    isAuthenticated: false
  }
}) 