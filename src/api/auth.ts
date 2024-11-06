import { authLogin } from "@/types/auth"
const api = 'http://localhost:8080/'

const login = async (data: authLogin) => {
  const response = await fetch(`${api}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export default {
  login,
}