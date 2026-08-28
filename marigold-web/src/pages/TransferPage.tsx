import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAccounts } from '../api/accounts'
import { createTransfer } from '../api/transfers'
import { queryKeys } from '../api/queryKeys'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { useToast } from '../components/ui/Toast'
import { getErrorMessage } from '../lib/errors'
import { CATEGORY_LIST } from '../lib/constants'

const schema = z.object({
  fromAccountId: z.coerce.number().int().positive('Choose an account'),
  toAccountId: z.coerce.number().int().positive('Enter a valid account id'),
  amount: z.coerce.number().min(0.01, 'Amount must be at least $0.01'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function TransferPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const accountsQuery = useQuery({ queryKey: queryKeys.accounts.all(), queryFn: getAccounts })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const from = searchParams.get('from')
    if (from) {
      setValue('fromAccountId', Number(from))
    }
  }, [searchParams, setValue])

  const transferMutation = useMutation({
    mutationFn: createTransfer,
    onSuccess: (transaction, variables) => {
      showToast('Transfer complete', 'success')
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all() })
      queryClient.invalidateQueries({
        queryKey: ['accounts', variables.fromAccountId, 'transactions'],
      })
      navigate(`/accounts/${variables.fromAccountId}`)
      void transaction
    },
    onError: (error) => showToast(getErrorMessage(error), 'danger'),
  })

  const onSubmit = (values: FormValues) => {
    transferMutation.mutate({
      fromAccountId: values.fromAccountId,
      toAccountId: values.toAccountId,
      amount: values.amount,
      description: values.description,
      category: values.category || undefined,
    })
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-semibold text-text">Transfer money</h1>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Select label="From account" {...register('fromAccountId')} error={errors.fromAccountId?.message}>
            <option value="">Select an account</option>
            {accountsQuery.data?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} · {account.accountNumber}
              </option>
            ))}
          </Select>
          <Input
            label="To account ID"
            type="number"
            {...register('toAccountId')}
            error={errors.toAccountId?.message}
          />
          <Input
            label="Amount"
            type="number"
            step="0.01"
            {...register('amount')}
            error={errors.amount?.message}
          />
          <Input
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
          <Select label="Category (optional)" {...register('category')}>
            <option value="">No category</option>
            {CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? 'Sending...' : 'Send transfer'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
