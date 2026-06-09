import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
})

export default function FormDemo() {
  const [submittedData, setSubmittedData] = useState(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: ''
    }
  })

  const onSubmit = (data) => {
    setSubmittedData(data)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Form Validation</h2>
        <p className="text-muted-foreground text-sm">Verifying React Hook Form + Zod validation with shadcn/ui components.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md p-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Username</label>
          <Input 
            {...register('username')}
            placeholder="Type your username"
          />
          {errors.username && <p className="text-destructive text-xs font-medium">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <Input 
            {...register('email')}
            placeholder="hello@example.com"
          />
          {errors.email && <p className="text-destructive text-xs font-medium">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full font-semibold">
          Submit Form
        </Button>
      </form>

      {submittedData && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-300 space-y-2">
          <p className="font-semibold">✅ Form submitted successfully:</p>
          <pre className="text-xs font-mono">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
