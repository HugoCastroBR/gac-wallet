'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function RegisterForm() {

  const router = useRouter();


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input id="email" type="email" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button className="w-full">
            Register
          </Button>
          <Button className="w-full" variant='link' onClick={() => router.push('/login')}>
            Back to login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}