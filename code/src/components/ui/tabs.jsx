import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

const TabsContext = createContext(null)

function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}) {
  const [localValue, setLocalValue] = useState(defaultValue)
  const activeValue = value !== undefined ? value : localValue
  const setActiveValue = onValueChange !== undefined ? onValueChange : setLocalValue

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: setActiveValue }}>
      <div
        data-slot="tabs"
        className={cn("flex flex-col gap-4 w-full", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, children, ...props }) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-start rounded-xl bg-primary/5 p-1 text-text-secondary border border-primary/5 w-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTrigger({
  value,
  className,
  children,
  ...props
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used inside Tabs")
  const isActive = context.value === value

  return (
    <button
      type="button"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none",
        isActive
          ? "bg-surface text-primary shadow-glow border border-primary/5 font-extrabold"
          : "text-text-secondary hover:text-text-primary hover:bg-surface/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({
  value,
  className,
  children,
  ...props
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used inside Tabs")
  const isActive = context.value === value

  if (!isActive) return null

  return (
    <div
      data-slot="tabs-content"
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "outline-hidden w-full transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
