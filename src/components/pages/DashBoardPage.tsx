'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UserWallet from "../molecules/UserWallet"
import TransactionsTable from "../organisms/TransactionsTable"
import MakeTransaction from "../molecules/MakeTransaction"
import { Button } from "../ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const token = localStorage.getItem('token')
  
  const [reloadTransactions, setReloadTransactions] = useState(false)
  const [reloadWallet, setReloadWallet] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLogged')
    router.push('/login')
  }

  const handleTransactionMade = () => {
    setReloadTransactions(prev => !prev)
    setReloadWallet(prev => !prev)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold mb-6">Painel de Transferência de Dinheiro</h1>
        <div className="w-20">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 w-full">
        <UserWallet 
          reloadWallet={reloadWallet} 
        />
        <MakeTransaction onTransactionMade={handleTransactionMade} />
      </div>
      <TransactionsTable reloadTransactions={reloadTransactions} onRevertTransaction={handleTransactionMade} />
    </div>
  )
}
