

export default function StatsCard({
  label,
  value,
  changeText,
  changeType = 'success',
  className = '',
}) {
  const getChangeBadgeColor = () => {
    switch (changeType) {
      case 'success':
        return 'text-success bg-success/10'
      case 'error':
        return 'text-error bg-error/10'
      case 'warning':
        return 'text-warning bg-warning/10'
      case 'stable':
      default:
        return 'text-text-secondary bg-muted'
    }
  }

  return (
    <div
      className={`bg-surface rounded-xl p-8 border border-primary/4 shadow-glow flex flex-col justify-center gap-2 transition-all hover:scale-[1.01] hover:shadow-active-glow duration-300 ${className}`}
    >
      <span className="text-[14px] font-bold text-text-secondary uppercase tracking-wide">
        {label}
      </span>
      <span className="font-heading text-[32px] font-extrabold bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent tracking-tight">
        {value}
      </span>
      {changeText && (
        <span
          className={`text-[12px] font-bold self-start px-2 py-0.5 rounded-full ${getChangeBadgeColor()}`}
        >
          {changeText}
        </span>
      )}
    </div>
  )
}
