"use client"

import { useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  color: "white" | "cyan" | "violet"
}

export function SpaceBackground() {
  const stars = useMemo(() => {
    const starArray: Star[] = []
    for (let i = 0; i < 150; i++) {
      const seed1 = (i * 17 + 31) % 100
      const seed2 = (i * 23 + 47) % 100
      const seed3 = (i * 13 + 59) % 100
      const seed4 = (i * 37 + 11) % 100
      
      const colorRoll = seed4 % 10
      let color: "white" | "cyan" | "violet" = "white"
      if (colorRoll < 2) color = "cyan"
      else if (colorRoll < 3) color = "violet"
      
      starArray.push({
        id: i,
        x: seed1,
        y: seed2,
        size: (seed3 % 4) * 0.5 + 0.5,
        opacity: (seed3 % 50 + 30) / 100,
        duration: 12 + (seed1 % 25),
        delay: -(seed2 % 20),
        color,
      })
    }
    return starArray
  }, [])

  const getStarColor = (color: "white" | "cyan" | "violet") => {
    switch (color) {
      case "cyan": return "rgba(0, 229, 255, 0.95)"
      case "violet": return "rgba(139, 92, 246, 0.9)"
      default: return "rgba(255, 255, 255, 0.9)"
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep space gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 20% 80%, rgba(0, 229, 255, 0.06) 0%, transparent 45%),
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 60%),
            linear-gradient(180deg, #050A14 0%, #080F1C 50%, #050A14 100%)
          `,
        }}
      />

      {/* Large nebula glow - cyan/violet mix */}
      <div 
        className="absolute top-0 right-0 w-[900px] h-[900px]"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, 
              rgba(0, 229, 255, 0.12) 0%, 
              rgba(139, 92, 246, 0.08) 30%, 
              transparent 60%
            )
          `,
          filter: "blur(80px)",
          animation: "nebulaShift 40s ease-in-out infinite",
        }}
      />

      {/* Secondary nebula - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-[700px] h-[700px]"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(139, 92, 246, 0.1) 0%, 
              rgba(0, 229, 255, 0.06) 40%, 
              transparent 65%
            )
          `,
          filter: "blur(60px)",
          animation: "nebulaFloat 50s ease-in-out infinite",
        }}
      />

      {/* Planet - visible with gradient shading */}
      <div 
        className="absolute -top-20 -right-20 w-[380px] h-[380px]"
        style={{
          background: `
            radial-gradient(circle at 35% 35%, 
              rgba(139, 92, 246, 0.25) 0%,
              rgba(0, 229, 255, 0.15) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              rgba(8, 15, 28, 0.9) 70%,
              transparent 100%
            )
          `,
          borderRadius: "50%",
          boxShadow: `
            inset -20px -20px 60px rgba(0, 0, 0, 0.5),
            inset 10px 10px 40px rgba(139, 92, 246, 0.15),
            0 0 80px rgba(139, 92, 246, 0.1),
            0 0 120px rgba(0, 229, 255, 0.05)
          `,
          animation: "planetRotate 180s linear infinite",
        }}
      >
        {/* Planet ring/atmosphere */}
        <div 
          className="absolute inset-[-10px] rounded-full"
          style={{
            background: "transparent",
            border: "1px solid rgba(0, 229, 255, 0.08)",
            boxShadow: "0 0 30px rgba(0, 229, 255, 0.05)",
          }}
        />
      </div>

      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              background: `radial-gradient(circle, ${getStarColor(star.color)} 0%, transparent 70%)`,
              boxShadow: star.size > 1.2 ? `0 0 ${star.size * 3}px ${getStarColor(star.color).replace('0.9', '0.3')}` : undefined,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Shooting star effect - occasional */}
      <div 
        className="absolute w-[2px] h-[80px]"
        style={{
          top: "15%",
          left: "60%",
          background: "linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.8) 50%, transparent 100%)",
          transform: "rotate(45deg)",
          animation: "shootingStar 8s ease-in-out infinite",
          opacity: 0,
        }}
      />

      {/* Grid overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: inherit; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(0.7); }
        }
        
        @keyframes nebulaShift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(-30px, 20px) scale(1.08); opacity: 0.85; }
        }
        
        @keyframes nebulaFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        
        @keyframes planetRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shootingStar {
          0%, 90%, 100% { opacity: 0; transform: rotate(45deg) translateY(0); }
          92% { opacity: 1; }
          95% { opacity: 0; transform: rotate(45deg) translateY(200px); }
        }
      `}</style>
    </div>
  )
}
