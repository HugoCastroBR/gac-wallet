import { authLogin, authRegister } from "@/types/auth"
import { api } from "@/utils/constants"

export const login = async (data: authLogin) => {
  const response = await fetch(`${api}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const register = async (data: authRegister) => {
  const response = await fetch(`${api}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const me = async () => {
  const response = await fetch(`${api}auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
  return response.json()
}

export default {
  login,
  me,
  register,
}
