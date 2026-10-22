"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  variant?: "cyan" | "violet" | "green" | "amber"
  className?: string
}

const variantStyles = {
  cyan: {
    bg: "bg-[#00E5FF]/10",
    border: "border-[#00E5FF]/25",
    text: "text-[#00E5FF]",
    glow: "rgba(0, 229, 255, 0.15)",
    gradient: "from-[#00E5FF]/10 to-transparent",
  },
  violet: {
    bg: "bg-[#8B5CF6]/10",
    border: "border-[#8B5CF6]/25",
    text: "text-[#8B5CF6]",
    glow: "rgba(139, 92, 246, 0.15)",
    gradient: "from-[#8B5CF6]/10 to-transparent",
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    text: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.15)",
    gradient: "from-emerald-500/10 to-transparent",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    text: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.15)",
    gradient: "from-amber-500/10 to-transparent",
  },
}

export function MetricCard({ title, value, icon: Icon, variant = "cyan", className }: MetricCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "group relative p-5 rounded-xl border backdrop-blur-md overflow-hidden",
        "bg-[rgba(8,15,28,0.6)]",
        "hover:scale-[1.02] transition-all duration-300",
        className
      )}
      style={{
        borderColor: `${styles.glow.replace('0.15', '0.2')}`,
        boxShadow: `0 4px 20px ${styles.glow}`,
      }}
    >
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none",
        styles.gradient
      )} />
      
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </p>
          <p className={cn("text-2xl font-bold font-mono", styles.text)}>
            {value}
          </p>
        </div>
        <div 
          className={cn("p-2.5 rounded-xl border", styles.bg, styles.border)}
          style={{ boxShadow: `0 0 15px ${styles.glow}` }}
        >
          <Icon className={cn("w-5 h-5", styles.text)} />
        </div>
      </div>
    </div>
  )
}
