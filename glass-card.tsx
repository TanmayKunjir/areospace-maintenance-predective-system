"use client"

import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  title?: string
  accent?: "cyan" | "violet" | "default"
  glow?: boolean
}

export function GlassCard({ children, className, title, accent = "default", glow = false }: GlassCardProps) {
  const accentColors = {
    cyan: {
      border: "rgba(0, 229, 255, 0.15)",
      hoverBorder: "rgba(0, 229, 255, 0.3)",
      glow: "rgba(0, 229, 255, 0.1)",
      gradient: "from-[#00E5FF]/20 via-transparent to-transparent",
    },
    violet: {
      border: "rgba(139, 92, 246, 0.15)",
      hoverBorder: "rgba(139, 92, 246, 0.3)",
      glow: "rgba(139, 92, 246, 0.1)",
      gradient: "from-[#8B5CF6]/20 via-transparent to-transparent",
    },
    default: {
      border: "rgba(0, 229, 255, 0.1)",
      hoverBorder: "rgba(0, 229, 255, 0.2)",
      glow: "rgba(0, 229, 255, 0.05)",
      gradient: "from-[#00E5FF]/10 via-transparent to-transparent",
    },
  }

  const colors = accentColors[accent]

  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl overflow-hidden",
        "bg-[rgba(8,15,28,0.5)] backdrop-blur-xl",
        "border transition-all duration-500",
        "hover:scale-[1.01]",
        className
      )}
      style={{
        borderColor: colors.border,
        boxShadow: glow 
          ? `0 0 40px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.03)` 
          : `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {/* Top gradient highlight */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-24 bg-gradient-to-b pointer-events-none",
        colors.gradient
      )} />
      
      {/* Top edge shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.glow}, transparent 40%)`,
        }}
      />
      
      <div className="relative">
        {title && (
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  )
}
