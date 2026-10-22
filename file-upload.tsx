"use client"

import { useCallback, useState } from "react"
import { Upload, FileText, X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export function FileUpload({ onUpload, isLoading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file)
      onUpload(file)
    }
  }, [onUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onUpload(file)
    }
  }, [onUpload])

  const clearFile = useCallback(() => {
    setSelectedFile(null)
  }, [])

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "py-8 px-6 rounded-xl border-2 border-dashed",
          "transition-all duration-300 cursor-pointer group",
          "bg-gradient-to-b from-[rgba(8,15,28,0.4)] to-[rgba(8,15,28,0.6)]",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-[rgba(0,229,255,0.15)] hover:border-primary/40 hover:bg-[rgba(8,15,28,0.7)]"
        )}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            {/* Custom loading animation */}
            <div className="relative w-14 h-14">
              {/* Outer spinning ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent"
                style={{ animation: "spin 1s linear infinite" }}
              />
              {/* Inner spinning ring (opposite direction) */}
              <div 
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary border-l-accent"
                style={{ animation: "spin 0.8s linear infinite reverse" }}
              />
              {/* Center pulse */}
              <div className="absolute inset-4 rounded-full bg-primary/30 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Analyzing Data</p>
              <p className="text-xs text-muted-foreground mt-0.5">Processing sensor readings...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-4">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Upload Sensor Data
            </p>
            <p className="text-xs text-muted-foreground">
              Drag & drop CSV file or click to browse
            </p>
          </>
        )}
      </div>

      {selectedFile && !isLoading && (
        <div 
          className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300"
          style={{
            background: "rgba(8, 15, 28, 0.7)",
            borderColor: "rgba(16, 185, 129, 0.2)",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
          }}
        >
          <div className="p-1.5 rounded-lg bg-emerald-500/15">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {selectedFile.name}
            </p>
            <p className="text-[10px] text-emerald-400/80">Ready for analysis</p>
          </div>
          <button
            onClick={clearFile}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
