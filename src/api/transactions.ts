import { api } from "@/utils/constants"


interface getTransactionsReqProps {
  page: number
  limit: number
  orderBy: string
  order: 'asc' | 'desc'
}
export const getTransactions = async ({
  page,
  limit,
  orderBy,
  order,
}:
  getTransactionsReqProps
) => {

  const token = localStorage.getItem('token')
  const response = await fetch(`${api}transactions?page=${page}&itemsPerPage=${limit}&orderBy=${orderBy}&order=${order}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

interface makeTransactionReqProps {
  description?: string
  sentToUserEmail: string
  valueBrl: number
}

export const makeTransaction = async ({
  description = '',
  sentToUserEmail,
  valueBrl,
}:
  makeTransactionReqProps
) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${api}transactions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reversed: false,
      description,
      sentToUserEmail,
      valueBrl,
    }),
  })
  return response.json()
}

export const revertTransaction = async (id:number) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${api}transactions/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}



