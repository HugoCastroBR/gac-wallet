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

export default function LoginForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const response = await auth.login(data)
    if(response.error){
      setIsSubmitting(false)
      setApiError(response.error)
      return
    }
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard')
    setIsSubmitting(false)    
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Insira seus dados para entrar em sua conta</CardDescription>
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
              showPasswordToggle
              id="password"
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
          <Button 
            className="w-full" 
            type="submit" 
            disabled={!isValid || isSubmitting}
          >
            Entrar
          </Button>
          <Button
            className="w-full"
            variant="link"
            type="button"
            onClick={() => router.push('/register')}
          >
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}