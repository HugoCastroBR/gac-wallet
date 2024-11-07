'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import auth from '@/api/auth'

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
  })


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const response = await auth.register(data)
    if(response.error){
      setIsSubmitting(false)
      setApiError(response.error)
      return
    }
    localStorage.setItem('token', response.data.token)
    router.push('/login')
    setIsSubmitting(false)
  }

  const password = watch('password')

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Cadastro</CardTitle>
        <CardDescription>Insira seus dados para criar uma nova conta</CardDescription>
        {apiError && (
          <div className='flex items-center space-x-1 py-1'>
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-sm text-red-500">{apiError}</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register('name', { 
                required: 'Nome é obrigatório',
                minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
              })}
              placeholder="João Silva"
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'E-mail inválido',
                },
              })}
              placeholder="joao@exemplo.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              showPasswordToggle
              type="password"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 8,
                  message: 'A senha deve ter pelo menos 8 caracteres',
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              showPasswordToggle
              type="password"
              {...register('confirmPassword', {
                required: 'Confirmação de senha é obrigatória',
                validate: (value) => value === password || 'As senhas não coincidem',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Registrar'}
          </Button>
          <Button
            className="w-full"
            variant="link"
            type="button"
            onClick={() => router.push('/login')}
          >
            Voltar para o login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}