'use client'
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "../atoms/FormError";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  useEffect(() => {
    const valid = errors.email === "" && errors.password === "" && email !== "" && password !== "";
    setIsLoginButtonDisabled(!valid);
  }, [errors, email, password]);

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 7) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    const valid = validateFields();

    if (valid) {
      console.log("Logging in with:", { email, password });
      //Chamada a API para login
    }
  };



  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateFields();
              }}
            />
            {errors.email && <FormError>{errors.email}</FormError>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              required
              value={password}
              type="password"
              showPasswordToggle
              onChange={(e) => {
                setPassword(e.target.value);
                validateFields();
              }}
            />
            {errors.password && <FormError>{errors.password}</FormError>}
          </div>
          <Button
            className="w-full"
            disabled={isLoginButtonDisabled}
          >
            Login
          </Button>
          <Button className="w-full" variant='link' onClick={() => router.push('/register')}>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
