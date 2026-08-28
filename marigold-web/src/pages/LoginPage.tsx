import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginApi } from '../api/auth'
import { useAuth } from '../auth/useAuth'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { getErrorMessage } from '../lib/errors'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setFormError(null)
    try {
      const auth = await loginApi(values)
      login(auth)
      navigate(auth.role === 'ANALYST' ? '/fraud' : '/dashboard', { replace: true })
    } catch (error) {
      setFormError(getErrorMessage(error, 'Invalid email or password'))
    }
  }

  return (
    <AuthLayout>
      <h2 className="mb-6 font-display text-2xl font-semibold text-text">Welcome back</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        {formError && <p className="text-sm text-danger-700">{formError}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-text-muted">
        New here?{' '}
        <Link to="/register" className="font-medium text-marigold-600 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
