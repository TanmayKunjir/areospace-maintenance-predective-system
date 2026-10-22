"use client"

import { Brain, CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIInterpretationProps {
  healthScore: number
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  hasAnomaly: boolean
  failureProbability: number
  confidence: number
}

function generateInterpretation(
  healthScore: number,
  risk: string,
  hasAnomaly: boolean,
  failureProbability: number
): string {
  if (risk === "CRITICAL" || hasAnomaly) {
    return `Critical anomaly detected in engine telemetry. Immediate inspection recommended. Failure probability at ${failureProbability.toFixed(1)}% indicates potential system degradation. Recommend reducing thrust output and initiating diagnostic protocols.`
  }
  
  if (risk === "HIGH") {
    return `Engine parameters showing elevated stress indicators. Health index at ${healthScore}% suggests increased wear patterns. Schedule preventive maintenance within next operational window. Continue monitoring vibration and thermal signatures.`
  }
  
  if (risk === "MEDIUM") {
    return `Engine operating within acceptable parameters with minor deviations noted. Health index stable at ${healthScore}%. No immediate action required, but recommend increased monitoring frequency for thermal subsystems.`
  }
  
  return `All engine systems operating within optimal parameters. Health index at ${healthScore}% indicates excellent operational condition. No maintenance required. System cleared for continued nominal operations.`
}

export function AIInterpretation({
  healthScore,
  risk,
  hasAnomaly,
  failureProbability,
  confidence,
}: AIInterpretationProps) {
  const interpretation = generateInterpretation(healthScore, risk, hasAnomaly, failureProbability)
  
  const getStatusIcon = () => {
    if (risk === "CRITICAL" || hasAnomaly) {
      return <XCircle className="w-5 h-5 text-red-400" />
    }
    if (risk === "HIGH") {
      return <AlertTriangle className="w-5 h-5 text-amber-400" />
    }
    if (risk === "MEDIUM") {
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />
    }
    return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  }

  const getStatusColor = () => {
    if (risk === "CRITICAL" || hasAnomaly) return { border: "border-red-500/25", bg: "bg-red-500/8", glow: "rgba(239,68,68,0.15)" }
    if (risk === "HIGH") return { border: "border-amber-500/25", bg: "bg-amber-500/8", glow: "rgba(245,158,11,0.15)" }
    if (risk === "MEDIUM") return { border: "border-yellow-500/25", bg: "bg-yellow-500/8", glow: "rgba(234,179,8,0.15)" }
    return { border: "border-emerald-500/25", bg: "bg-emerald-500/8", glow: "rgba(16,185,129,0.15)" }
  }

  const statusStyles = getStatusColor()

  return (
    <div className="space-y-5">
      {/* AI Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full" />
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-primary/15 border border-accent/25">
            <Brain className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">Neural Analysis Engine</p>
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Model Confidence: <span className="font-mono font-semibold text-primary">{confidence.toFixed(1)}%</span>
          </p>
        </div>
        {getStatusIcon()}
      </div>

      {/* Interpretation Text */}
      <div 
        className={cn("p-5 rounded-xl border", statusStyles.border, statusStyles.bg)}
        style={{ boxShadow: `0 0 30px ${statusStyles.glow}` }}
      >
        <p className="text-sm text-foreground/90 leading-relaxed font-medium">
          {interpretation}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div 
          className="text-center p-3 rounded-xl border border-primary/10"
          style={{ background: "rgba(8,15,28,0.6)" }}
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium">Analysis</p>
          <p className="text-sm font-mono font-semibold text-primary mt-1.5">Complete</p>
        </div>
        <div 
          className="text-center p-3 rounded-xl border border-accent/10"
          style={{ background: "rgba(8,15,28,0.6)" }}
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium">Accuracy</p>
          <p className="text-sm font-mono font-semibold text-accent mt-1.5">
            {confidence >= 95 ? "High" : confidence >= 80 ? "Medium" : "Low"}
          </p>
        </div>
        <div 
          className="text-center p-3 rounded-xl border"
          style={{ 
            background: "rgba(8,15,28,0.6)",
            borderColor: risk === "LOW" ? "rgba(16,185,129,0.15)" : 
                         risk === "MEDIUM" ? "rgba(234,179,8,0.15)" : 
                         risk === "HIGH" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"
          }}
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium">Action</p>
          <p className={cn(
            "text-sm font-mono font-semibold mt-1.5",
            risk === "LOW" ? "text-emerald-400" : 
            risk === "MEDIUM" ? "text-yellow-400" : 
            risk === "HIGH" ? "text-amber-400" : "text-red-400"
          )}>
            {risk === "LOW" ? "None" : risk === "MEDIUM" ? "Monitor" : risk === "HIGH" ? "Schedule" : "Urgent"}
          </p>
        </div>
      </div>
    </div>
  )
}
