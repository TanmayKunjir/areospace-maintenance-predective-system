"use client"

import { cn } from "@/lib/utils"

interface EngineStatus {
  id: number
  name: string
  status: "healthy" | "warning" | "critical"
  health: number
}

interface SpacecraftPanelProps {
  engines: EngineStatus[]
  affectedEngine?: number
}

const statusColors = {
  healthy: {
    fill: "#10B981",
    glow: "rgba(16, 185, 129, 0.6)",
    ring: "rgba(16, 185, 129, 0.3)",
  },
  warning: {
    fill: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.6)",
    ring: "rgba(245, 158, 11, 0.3)",
  },
  critical: {
    fill: "#EF4444",
    glow: "rgba(239, 68, 68, 0.7)",
    ring: "rgba(239, 68, 68, 0.35)",
  },
}

export function SpacecraftPanel({ engines, affectedEngine }: SpacecraftPanelProps) {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[300px]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="techGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#gridFade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" mask="url(#gridMask)" />
        </svg>
      </div>

      {/* Spacecraft SVG */}
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
        <defs>
          {/* Enhanced body gradient */}
          <linearGradient id="bodyGradientV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A2540" />
            <stop offset="50%" stopColor="#253555" />
            <stop offset="100%" stopColor="#152035" />
          </linearGradient>
          
          {/* Glow effects */}
          <filter id="engineGlowV2" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="criticalPulseV2" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Cyan highlight gradient */}
          <linearGradient id="cyanHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main fuselage */}
        <ellipse 
          cx="200" 
          cy="100" 
          rx="130" 
          ry="40" 
          fill="url(#bodyGradientV2)" 
          stroke="rgba(0, 229, 255, 0.25)"
          strokeWidth="1.5"
        />
        
        {/* Fuselage highlight */}
        <ellipse 
          cx="200" 
          cy="85" 
          rx="100" 
          ry="20" 
          fill="url(#cyanHighlight)"
        />
        
        {/* Nose cone */}
        <path 
          d="M 330 100 Q 380 100 380 100 Q 350 80 330 80 Q 350 120 330 120 Z" 
          fill="#253555" 
          stroke="rgba(0, 229, 255, 0.2)"
          strokeWidth="1"
        />
        
        {/* Left wing with connecting lines */}
        <g>
          <path 
            d="M 170 60 L 100 15 L 75 15 L 75 35 L 150 60 Z" 
            fill="url(#bodyGradientV2)" 
            stroke="rgba(0, 229, 255, 0.2)"
            strokeWidth="1"
          />
          {/* Wing connection line */}
          <line x1="150" y1="60" x2="170" y2="75" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" />
        </g>
        
        {/* Right wing with connecting lines */}
        <g>
          <path 
            d="M 170 140 L 100 185 L 75 185 L 75 165 L 150 140 Z" 
            fill="url(#bodyGradientV2)" 
            stroke="rgba(0, 229, 255, 0.2)"
            strokeWidth="1"
          />
          {/* Wing connection line */}
          <line x1="150" y1="140" x2="170" y2="125" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" />
        </g>
        
        {/* Tail section */}
        <rect 
          x="65" 
          y="88" 
          width="35" 
          height="24" 
          rx="4" 
          fill="#152035" 
          stroke="rgba(0, 229, 255, 0.2)"
          strokeWidth="1"
        />
        
        {/* Center line detail */}
        <line 
          x1="105" 
          y1="100" 
          x2="360" 
          y2="100" 
          stroke="rgba(0, 229, 255, 0.12)" 
          strokeWidth="1" 
          strokeDasharray="6 6"
        />

        {/* Engines with enhanced glow */}
        {engines.map((engine, index) => {
          const positions = [
            { x: 85, y: 28 },
            { x: 85, y: 172 },
            { x: 60, y: 82 },
            { x: 60, y: 118 },
          ]
          
          const pos = positions[index] || { x: 0, y: 0 }
          const colors = statusColors[engine.status]
          const isAffected = affectedEngine === engine.id
          const isCritical = engine.status === "critical"
          
          return (
            <g key={engine.id}>
              {/* Outer glow ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isAffected ? 22 : 18}
                fill="none"
                stroke={colors.ring}
                strokeWidth="2"
                className={cn(isCritical && "animate-ping")}
                style={{ animationDuration: isCritical ? "1.5s" : undefined }}
              />
              
              {/* Engine body glow */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={13}
                fill={`${colors.fill}20`}
                filter={isAffected ? "url(#criticalPulseV2)" : "url(#engineGlowV2)"}
              />
              
              {/* Engine body */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={11}
                fill="#080F1C"
                stroke={colors.fill}
                strokeWidth="2.5"
              />
              
              {/* Engine core */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={6}
                fill={colors.fill}
                className={cn(isCritical && "animate-pulse")}
              />
              
              {/* Active exhaust glow */}
              {engine.status === "healthy" && (
                <>
                  <ellipse
                    cx={pos.x - 18}
                    cy={pos.y}
                    rx={10}
                    ry={5}
                    fill={colors.glow}
                    opacity={0.6}
                  />
                  <ellipse
                    cx={pos.x - 22}
                    cy={pos.y}
                    rx={6}
                    ry={3}
                    fill={colors.fill}
                    opacity={0.4}
                  />
                </>
              )}
              
              {/* Connecting line to body */}
              <line
                x1={pos.x + 12}
                y1={pos.y}
                x2={pos.x + 30}
                y2={pos.y > 100 ? 130 : 70}
                stroke={`${colors.fill}30`}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </g>
          )
        })}
      </svg>

      {/* Engine Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {engines.map((engine, index) => {
          const labelPositions = [
            { left: "17%", top: "2%" },
            { left: "17%", bottom: "2%" },
            { left: "3%", top: "32%" },
            { left: "3%", bottom: "32%" },
          ]
          
          const pos = labelPositions[index] || {}
          const colors = statusColors[engine.status]
          const isAffected = affectedEngine === engine.id
          
          return (
            <div
              key={engine.id}
              className={cn(
                "absolute flex items-center gap-2.5 px-3 py-1.5 rounded-lg",
                "bg-[rgba(8,15,28,0.85)] backdrop-blur-md border",
                "transition-all duration-300",
                isAffected && "scale-105"
              )}
              style={{
                ...pos,
                borderColor: isAffected ? colors.fill : "rgba(0, 229, 255, 0.1)",
                boxShadow: isAffected ? `0 0 20px ${colors.glow}` : undefined,
              }}
            >
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  engine.status === "critical" && "animate-pulse"
                )}
                style={{ 
                  backgroundColor: colors.fill,
                  boxShadow: `0 0 8px ${colors.glow}`,
                }}
              />
              <span className="text-[11px] font-mono font-medium text-foreground/70">
                {engine.name}
              </span>
              <span 
                className="text-[11px] font-mono font-bold"
                style={{ color: colors.fill }}
              >
                {engine.health}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
