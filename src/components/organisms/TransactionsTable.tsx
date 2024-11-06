"use client"

import React, { useState } from 'react'
import { ArrowUpDown, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { transaction  } from '@/types/transaction'



interface TransactionsTableProps {
  transactions: transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<transaction[]>>
}

export default function TransactionsTable({ transactions, setTransactions }: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState<{ key: keyof transaction | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' })


  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const handleReverseTransaction = (transactionId: number) => {
    const transactionToReverse = transactions.find(t => t.id === transactionId)
    if (!transactionToReverse) return

    const reversedTransaction: transaction = {
      id: transactions.length + 1,
      type: transactionToReverse.type === "send" ? "receive" : "send",
      valueBrl: transactionToReverse.valueBrl,
      sentToUser: transactionToReverse.sentFromUser,
      sentFromUser: transactionToReverse.sentToUser,
      createdAt: new Date().toISOString(),
    }

    setTransactions(prevTransactions => [reversedTransaction, ...prevTransactions])
    toast({ 
      title: "Transação revertida", 
      description: `Transação de R$ ${parseFloat(transactionToReverse.valueBrl).toFixed(2)} foi revertida.` 
    })
  }

  const handleSort = (key: keyof transaction) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }))
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
        <CardDescription>Transferências de dinheiro recentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                  Tipo {sortConfig.key === 'type' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('valueBrl')}>
                  Valor {sortConfig.key === 'valueBrl' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort('sentFromUser')}>
                  De {sortConfig.key === 'sentFromUser' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort('sentToUser')}>
                  Para {sortConfig.key === 'sentToUser' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                  Data/Hora {sortConfig.key === 'createdAt' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction:transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.type === "send" ? "Enviado" : "Recebido"}</TableCell>
                  <TableCell>R$ {parseFloat(transaction.valueBrl).toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.sentFromUser.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.sentToUser.name}</TableCell>
                  <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleReverseTransaction(transaction.id)}>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Reverter</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, transactions.length)} de {transactions.length} transações
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <div className="text-sm font-medium">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}