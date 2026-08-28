import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerApi } from '../api/auth'
import { useAuth } from '../auth/useAuth'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { getErrorMessage } from '../lib/errors'

const schema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setFormError(null)
    try {
      const auth = await registerApi(values)
      login(auth)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setFormError(getErrorMessage(error, 'Could not create your account'))
    }
  }

  return (
    <AuthLayout>
      <h2 className="mb-6 font-display text-2xl font-semibold text-text">Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Full name"
          {...registerField('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Email"
          type="email"
          {...registerField('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...registerField('password')}
          error={errors.password?.message}
        />
        <Input
          label="Confirm password"
          type="password"
          {...registerField('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        {formError && <p className="text-sm text-danger-700">{formError}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-marigold-600 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
