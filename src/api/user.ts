import { api } from "@/utils/constants"

export const deposit = async (amount:number) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${api}users/deposit`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount
    }),
  })
  return response.json()
}