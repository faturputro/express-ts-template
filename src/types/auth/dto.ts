export type LoginDTO = {
  email: string
  password: string
}

export type ForgotPasswordDTO = {
  email: string
}

export type UserSession = {
  id: number
  email: string
  role: {
    name: string
    slug: string
  }
  permissions: string[]
}
