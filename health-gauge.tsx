"use client"

import { useEffect, useState } from "react"

interface HealthGaugeProps {
  value: number
  size?: number
}

export function HealthGauge({ value, size = 240 }: HealthGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedValue / 100) * circumference

  const getStatusColor = (score: number) => {
    if (score >= 80) return { 
      start: "#00E5FF", 
      end: "#8B5CF6", 
      glow: "rgba(0, 229, 255, 0.5)", 
      text: "#00E5FF",
      status: "OPTIMAL"
    }
    if (score >= 50) return { 
      start: "#F59E0B", 
      end: "#EF4444", 
      glow: "rgba(245, 158, 11, 0.5)", 
      text: "#F59E0B",
      status: "WARNING"
    }
    return { 
      start: "#EF4444", 
      end: "#DC2626", 
      glow: "rgba(239, 68, 68, 0.6)", 
      text: "#EF4444",
      status: "CRITICAL"
    }
  }

  const colors = getStatusColor(value)
  const gradientId = "healthGradient"
  const glowId = "healthGlow"

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer glow ring animation */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size + 30,
          height: size + 30,
          background: `conic-gradient(from 0deg, ${colors.start}20, ${colors.end}15, ${colors.start}20)`,
          animation: "glowRingSpin 8s linear infinite",
          filter: "blur(15px)",
        }}
      />
      
      {/* Secondary pulse ring */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size + 20,
          height: size + 20,
          border: `1px solid ${colors.start}30`,
          animation: "pulseRing 3s ease-in-out infinite",
        }}
      />

      <svg
        width={size}
        height={size}
        className="relative transform -rotate-90"
        style={{ filter: `drop-shadow(0 0 20px ${colors.glow})` }}
      >
        <defs>
          {/* Gradient for the arc */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(13, 21, 37, 0.9)"
          strokeWidth={strokeWidth}
        />
        
        {/* Subtle inner track glow */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`${colors.start}10`}
          strokeWidth={strokeWidth + 6}
        />

        {/* Animated progress arc with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={`url(#${glowId})`}
          className="transition-all duration-1000 ease-out"
        />

        {/* Inner decorative ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 25}
          fill="none"
          stroke={`${colors.start}15`}
          strokeWidth={1}
          strokeDasharray="4 8"
        />
        
        {/* Outer decorative ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 10}
          fill="none"
          stroke={`${colors.start}08`}
          strokeWidth={1}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-5xl font-bold font-mono tracking-tight transition-colors duration-500"
          style={{ 
            color: colors.text,
            textShadow: `0 0 30px ${colors.glow}`,
          }}
        >
          {Math.round(animatedValue)}%
        </span>
        <span 
          className="text-xs font-semibold tracking-[0.25em] mt-2 uppercase"
          style={{ color: colors.text, opacity: 0.8 }}
        >
          {colors.status}
        </span>
      </div>

      <style jsx>{`
        @keyframes glowRingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.03); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
