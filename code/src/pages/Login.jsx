import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ErrorMessage } from '../components/FormElements'
import { Sparkles, KeyRound, User, Lock, Eye, EyeOff } from 'lucide-react'

// Define validation schema using Zod
const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Tên đăng nhập phải chứa ít nhất 3 ký tự' }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' }),
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    setAuthError('')
    setIsLoading(true)

    // Simulate network delay for premium feel
    setTimeout(() => {
      const result = login(data.username, data.password)
      setIsLoading(false)
      if (result.success) {
        navigate('/')
      } else {
        setAuthError(result.message)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      {/* Cosmic background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-galactic rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-nebula rounded-full opacity-[0.08] blur-[100px] pointer-events-none" />

      {/* Decorative Elliptical Orbit Line */}
      <svg
        className="absolute w-full h-full inset-0 opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="50%"
          cy="50%"
          rx="400"
          ry="250"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="600"
          ry="380"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="1.5"
          strokeDasharray="1 10"
        />
      </svg>

      {/* Floating Tiny Stars */}
      <div className="absolute top-[20%] left-[15%] opacity-40 animate-pulse"><Sparkles className="w-5 h-5 text-accent" /></div>
      <div className="absolute bottom-[30%] right-[15%] opacity-30 animate-pulse"><Sparkles className="w-4 h-4 text-light-accent" /></div>
      <div className="absolute top-[40%] right-[25%] opacity-20"><Sparkles className="w-3.5 h-3.5 text-primary" /></div>

      {/* Login Card */}
      <Card
        variant="default"
        className="w-full max-w-[450px] bg-surface/80 backdrop-blur-md border border-primary/10 shadow-[0_20px_48px_rgba(78,86,192,0.12)] z-10 p-9 flex flex-col gap-6 animate-scale-up"
      >
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-extrabold bg-gradient-galactic bg-clip-text text-transparent font-heading">
            Chào mừng bạn đến với DiveVerse
          </CardTitle>
          <CardDescription className="text-text-secondary text-sm mt-1">
            Đăng nhập tài khoản định danh vũ trụ tri thức
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* General Credentials Hint */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-[12px] text-text-secondary leading-relaxed mb-1">
              <p className="font-bold text-primary mb-1">💡 Tài khoản dùng thử:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Học viên: <code className="font-mono text-primary font-bold">student</code> / <code className="font-mono text-primary font-bold">student123</code></li>
                <li>Quản trị: <code className="font-mono text-primary font-bold">admin</code> / <code className="font-mono text-primary font-bold">admin123</code></li>
              </ul>
            </div>

            {/* Auth Error Message */}
            {authError && (
              <div className="p-3 bg-error/10 border border-error/20 text-error text-[13px] font-semibold rounded-lg text-center animate-shake">
                {authError}
              </div>
            )}

            {/* Username field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-primary flex items-center gap-1.5">
                <User className="w-4 h-4 text-text-secondary" />
                Tên đăng nhập / Email *
              </label>
              <Input
                type="text"
                placeholder="Nhập tên đăng nhập của bạn..."
                aria-invalid={!!errors.username}
                {...register('username')}
              />
              <ErrorMessage message={errors.username?.message} />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-primary flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-text-secondary" />
                Mật khẩu *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu..."
                  className="pr-12"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary cursor-pointer shrink-0"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <ErrorMessage message={errors.password?.message} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 h-11 text-white text-sm font-bold bg-primary border-none shadow-active-glow hover:shadow-hover-glow hover:bg-primary/95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng Nhập'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
