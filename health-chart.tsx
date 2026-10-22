"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts"

interface DataPoint {
  time: string
  health: number
}

interface HealthChartProps {
  data: DataPoint[]
}

export function HealthChart({ data }: HealthChartProps) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
        >
          <defs>
            {/* Rich gradient fill */}
            <linearGradient id="healthGradientV2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.35} />
              <stop offset="30%" stopColor="#8B5CF6" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#00E5FF" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#050A14" stopOpacity={0} />
            </linearGradient>
            
            {/* Bright stroke gradient */}
            <linearGradient id="strokeGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="40%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            
            {/* Glow filter for line */}
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(0, 229, 255, 0.06)"
            vertical={false}
          />
          
          {/* Warning threshold line */}
          <ReferenceLine
            y={70}
            stroke="rgba(245, 158, 11, 0.4)"
            strokeDasharray="6 4"
            label={{
              value: "Warning Threshold",
              position: "insideTopRight",
              fill: "#F59E0B",
              fontSize: 10,
              fontWeight: 500,
              opacity: 0.8,
            }}
          />
          
          {/* Critical threshold line */}
          <ReferenceLine
            y={50}
            stroke="rgba(239, 68, 68, 0.3)"
            strokeDasharray="6 4"
            label={{
              value: "Critical",
              position: "insideTopRight",
              fill: "#EF4444",
              fontSize: 10,
              fontWeight: 500,
              opacity: 0.7,
            }}
          />
          
          <XAxis
            dataKey="time"
            stroke="#4A5A75"
            fontSize={11}
            fontWeight={500}
            tickLine={false}
            axisLine={{ stroke: "rgba(0, 229, 255, 0.1)" }}
            dy={12}
          />
          
          <YAxis
            stroke="#4A5A75"
            fontSize={11}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            dx={-5}
            tickFormatter={(value) => `${value}%`}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(8, 15, 28, 0.95)",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 229, 255, 0.1)",
              padding: "12px 16px",
            }}
            labelStyle={{ 
              color: "#7B8BA8", 
              fontSize: "11px", 
              marginBottom: "6px",
              fontWeight: 500,
            }}
            itemStyle={{ 
              color: "#00E5FF", 
              fontFamily: "monospace", 
              fontWeight: "600", 
              fontSize: "15px" 
            }}
            formatter={(value: number) => [`${value}%`, "Health Index"]}
            cursor={{ stroke: "rgba(0, 229, 255, 0.3)", strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          
          <Area
            type="monotone"
            dataKey="health"
            stroke="url(#strokeGradientV2)"
            strokeWidth={3}
            fill="url(#healthGradientV2)"
            dot={false}
            activeDot={{
              r: 7,
              fill: "#00E5FF",
              stroke: "#050A14",
              strokeWidth: 3,
              filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
