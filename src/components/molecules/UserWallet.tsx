"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserWalletProps {
  balance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>
}

export default function UserWallet({ balance, setBalance }: UserWalletProps) {
  const [addAmount, setAddAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddMoney = () => {
    const addedAmount = parseFloat(addAmount)
    if (isNaN(addedAmount) || addedAmount <= 0) {
      toast({ title: "Valor inválido", description: "Por favor, insira um valor válido.", variant: "destructive" })
      return
    }
    setBalance(prevBalance => prevBalance + addedAmount)
    toast({ title: "Dinheiro adicionado", description: `R$ ${addedAmount.toFixed(2)} adicionado à sua conta com sucesso.` })
    setAddAmount("")
    setIsDialogOpen(false)
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Seu Saldo</CardTitle>
        <CardDescription>Fundos disponíveis atualmente</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between h-[calc(100%-90px)] space-y-4">
        <p className="text-4xl font-bold">
          R$ {balance.toFixed(2)}
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Dinheiro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Dinheiro</DialogTitle>
              <DialogDescription>
                Insira o valor que deseja adicionar à sua conta.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="addAmount">Valor</Label>
                <Input
                  id="addAmount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Insira o valor"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMoney}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}