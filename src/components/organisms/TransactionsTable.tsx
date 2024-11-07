import React, { useEffect, useState } from 'react'
import { ArrowUpDown, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { transaction } from '@/types/transaction'
import { getTransactions, revertTransaction } from '@/api/transactions'

interface TransactionsTableProps {
  reloadTransactions: boolean
  onRevertTransaction: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionsTable({
  reloadTransactions,
  onRevertTransaction,
}: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState<keyof transaction>('createdAt')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handlerGetTransactions = async (page: number = 1) => {
    const transactions = await getTransactions({
      page,
      limit: 5,
      orderBy,
      order,
    })
    setTotalPages(transactions.totalPages)
    setTransactions(transactions.data || [])
  }

  useEffect(() => {
    handlerGetTransactions(currentPage)
  }, [currentPage, orderBy, order, reloadTransactions])

  const handleReverseTransaction = async (transactionId: number) => {
    const res = await revertTransaction(transactionId)
    if (res.error) {
      toast({ title: "Erro", description: res.error, variant: "destructive" })
      return
    }
    handlerGetTransactions(currentPage)
    onRevertTransaction(true)
  }

  const handleSort = (key: keyof transaction) => {
    if (orderBy === key) {
      setOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(key)
      setOrder('desc')
    }
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
                  Tipo
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('valueBrl')}>
                  Valor {<ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort('sentFromUser')}>
                  De
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort('sentToUser')}>
                  Para
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                  Data/Hora {<ArrowUpDown className="inline ml-2 h-4 w-4" />}
                </TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: transaction) => (
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
            Pagina {currentPage} de {totalPages} paginas
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
