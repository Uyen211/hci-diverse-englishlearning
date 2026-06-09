import { useCounterStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'

export default function CounterDemo() {
  const { count, increase, decrease, reset } = useCounterStore()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Zustand Counter Store</h2>
        <p className="text-muted-foreground text-sm">Verifying state management with a Zustand store.</p>
      </div>

      <div className="p-8 rounded-xl border border-border bg-card text-card-foreground flex flex-col items-center justify-center space-y-6 shadow-sm">
        <div className="text-7xl font-extrabold text-primary tracking-tighter">{count}</div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={decrease}>Decrease</Button>
          <Button onClick={increase} className="font-semibold">Increase</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
    </div>
  )
}
