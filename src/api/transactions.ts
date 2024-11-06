const api = 'http://localhost:8080/'


export const getTransactions = async () => {
  const response = await fetch(`${api}transactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}