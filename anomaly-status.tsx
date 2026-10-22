"use client"

import { AlertTriangle, CheckCircle2, Shield, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnomalyStatusProps {
  hasAnomaly: boolean
}

export function AnomalyStatus({ hasAnomaly }: AnomalyStatusProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 px-5 py-4 rounded-xl border overflow-hidden",
        "transition-all duration-500",
        hasAnomaly
          ? "bg-red-500/10 border-red-500/30"
          : "bg-emerald-500/10 border-emerald-500/30"
      )}
      style={{
        boxShadow: hasAnomaly 
          ? "0 0 40px rgba(239,68,68,0.2), inset 0 1px 0 rgba(239,68,68,0.1)" 
          : "0 0 40px rgba(16,185,129,0.2), inset 0 1px 0 rgba(16,185,129,0.1)"
      }}
    >
      {/* Background pulse effect for anomaly */}
      {hasAnomaly && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
      )}
      
      <div className={cn(
        "relative p-2.5 rounded-lg",
        hasAnomaly ? "bg-red-500/20" : "bg-emerald-500/20"
      )}>
        {hasAnomaly ? (
          <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
        ) : (
          <Shield className="w-6 h-6 text-emerald-400" />
        )}
      </div>
      
      <div className="relative flex-1">
        <p className={cn(
          "font-semibold text-sm",
          hasAnomaly ? "text-red-400" : "text-emerald-400"
        )}>
          {hasAnomaly ? "Anomaly Detected" : "Systems Normal"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {hasAnomaly 
            ? "Abnormal patterns identified in sensor data" 
            : "All systems operating within expected parameters"}
        </p>
      </div>
      
      <div className={cn(
        "w-3 h-3 rounded-full",
        hasAnomaly ? "bg-red-400 animate-ping" : "bg-emerald-400"
      )} />
    </div>
  )
}
