import { client } from '../api/client'

export const login = async (credentials) => {
  return await client('/auth/login', { body: credentials })
}

export const register = async (credentials) => {
  return await client('/auth/register', { body: credentials })
}

export const logout = async () => {
  return await client('/auth/logout', { method: 'POST' })
}
