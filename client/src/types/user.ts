export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface User {
  id: string
  email: string
  name: string
  role: 'donor' | 'requester'
  bloodGroup?: BloodGroup
  location?: string
  phoneNumber?: string
  age?: number
  lastDonation?: Date
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
} 