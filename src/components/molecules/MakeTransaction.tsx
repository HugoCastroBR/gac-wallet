"use client"

import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MakeTransactionProps {
  balance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>
}

export default function MakeTransaction({ balance, setBalance }: MakeTransactionProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMoney = () => {
    setIsLoading(true)
    const transferAmount = parseFloat(amount)

    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({ title: "Valor inválido", description: "Por favor, insira um valor válido.", variant: "destructive" })
      setIsLoading(false)
      return
    }

    if (transferAmount > balance) {
      toast({ title: "Saldo insuficiente", description: "Você não tem saldo suficiente para esta transferência.", variant: "destructive" })
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      toast({ title: "E-mail inválido", description: "Por favor, insira um endereço de e-mail válido para o destinatário.", variant: "destructive" })
      setIsLoading(false)
      return
    }

    // Simulate a delay for the transaction
    setTimeout(() => {
      setBalance(prevBalance => prevBalance - transferAmount)
      toast({ title: "Dinheiro enviado", description: `R$ ${transferAmount.toFixed(2)} enviado para ${recipient} com sucesso.` })
      setRecipient("")
      setAmount("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Enviar Dinheiro</CardTitle>
        <CardDescription>Transferir fundos para outro usuário</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">E-mail do Destinatário</Label>
          <Input
            id="recipient"
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Insira o e-mail do destinatário"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Valor</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Insira o valor"
          />
        </div>
        <Button 
          className="w-full"
          onClick={handleSendMoney}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Dinheiro"}
        </Button>
      </CardContent>
    </Card>
  )
}