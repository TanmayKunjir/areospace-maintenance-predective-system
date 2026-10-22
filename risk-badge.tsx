"use client"

import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const config = {
    LOW: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      glow: "0 0 25px rgba(16,185,129,0.4)",
      dot: "bg-emerald-400",
      label: "LOW RISK"
    },
    MEDIUM: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/40",
      text: "text-amber-400",
      glow: "0 0 25px rgba(245,158,11,0.4)",
      dot: "bg-amber-400",
      label: "MEDIUM RISK"
    },
    HIGH: {
      bg: "bg-orange-500/15",
      border: "border-orange-500/40",
      text: "text-orange-400",
      glow: "0 0 25px rgba(249,115,22,0.4)",
      dot: "bg-orange-400",
      label: "HIGH RISK"
    },
    CRITICAL: {
      bg: "bg-red-500/15",
      border: "border-red-500/40",
      text: "text-red-400",
      glow: "0 0 25px rgba(239,68,68,0.5)",
      dot: "bg-red-400",
      label: "CRITICAL"
    }
  }

  const styles = config[risk]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border",
        "font-semibold text-sm tracking-[0.15em]",
        "transition-all duration-300 hover:scale-105",
        styles.bg,
        styles.border,
        styles.text
      )}
      style={{ boxShadow: styles.glow }}
    >
      <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse", styles.dot)} 
        style={{ boxShadow: `0 0 10px ${styles.dot === 'bg-emerald-400' ? 'rgba(16,185,129,0.6)' : styles.dot === 'bg-amber-400' ? 'rgba(245,158,11,0.6)' : styles.dot === 'bg-orange-400' ? 'rgba(249,115,22,0.6)' : 'rgba(239,68,68,0.6)'}` }}
      />
      {styles.label}
    </div>
  )
}
