"use client"

import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { makeTransaction } from '@/api/transactions'
import { AlertCircle } from 'lucide-react'

interface MakeTransactionProps {
  onTransactionMade: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MakeTransaction({
  onTransactionMade,
}: MakeTransactionProps) {

  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendMoney = async() => {

    setIsLoading(true)
    const response = await makeTransaction({
      sentToUserEmail: recipient,
      valueBrl: amount,
    })

    toast({ title: "Dinheiro enviado", description: `R$ ${amount.toFixed(2)} enviado para ${recipient}.` })    
    if(response.error){
      setError(response.error)
      setIsLoading(false)
    }
    setIsLoading(false)
    onTransactionMade(true)
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Enviar Dinheiro</CardTitle>
        <CardDescription>Transferir fundos para outro usuário</CardDescription>
        {error && (
          <div className='flex items-center space-x-1 py'>
            <AlertCircle className="text-red-500" size={18} />
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}
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
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Insira o valor"
          />
        </div>
        <Button 
          className="w-full"
          onClick={handleSendMoney}
          disabled={isLoading}
        >
          Enviar Dinheiro
        </Button>
      </CardContent>
    </Card>
  )
}