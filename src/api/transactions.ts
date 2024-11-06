const api = 'http://localhost:8080/'


export const getTransactions = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${api}transactions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}