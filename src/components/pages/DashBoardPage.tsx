'use client'

import { useEffect, useState } from "react"
import { transaction } from "@/types/transaction"
import UserWallet from "../molecules/UserWallet"
import TransactionsTable from "../organisms/TransactionsTable"
import MakeTransaction from "../molecules/MakeTransaction"
import { getTransactions } from "@/api/transactions"

// Mock data and functions
const initialBalance = 1000


export default function DashboardPage() {

  



  const [transactions, setTransactions] = useState<transaction[]>([])
  const [balance, setBalance] = useState(initialBalance)

  const handlerGetTransactions = async () => {
    
    const transactions = await getTransactions()
    console.log(transactions)
    setTransactions(transactions.data)
  }

  useEffect(() => {
    handlerGetTransactions()
  }, [])


  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Painel de Transferência de Dinheiro</h1>
      <div className="grid gap-6 md:grid-cols-2 w-full">
        <UserWallet
          balance={balance}
          setBalance={setBalance}
        />
        <MakeTransaction 
          balance={balance}
          setBalance={setBalance}
        />
      </div>
      <TransactionsTable
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  )
}