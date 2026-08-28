export type Role = 'CUSTOMER' | 'ANALYST'

export type AuthResponse = {
  token: string
  email: string
  role: Role
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  fullName: string
  email: string
  password: string
}
