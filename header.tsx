"use client"

import { Rocket, Wifi, Clock, Satellite } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative border-b border-[rgba(0,229,255,0.1)] bg-[rgba(8,15,28,0.85)] backdrop-blur-xl">
      {/* Top accent gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[1500px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              {/* Icon glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/30 blur-xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 border border-primary/20">
                <Satellite className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Space Mission AI Control
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">
                Predictive Engine Diagnostics System
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-6">
            {/* Mission Status */}
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary/60 to-secondary/40 border border-primary/10 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground/80 uppercase tracking-wider">Mission Active</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/50 blur-md rounded-full animate-pulse" />
                <Wifi className="relative w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Online</span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* Time */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-secondary/40 border border-primary/5">
              <Clock className="w-4 h-4 text-primary/60" />
              <span className="text-sm font-mono font-medium text-foreground/80 min-w-[100px]">
                {currentTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
