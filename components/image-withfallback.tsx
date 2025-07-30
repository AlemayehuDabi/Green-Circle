"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils" // Assuming cn utility is available

interface ImageWithFallbackProps {
  src?: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ImageWithFallback({ src, alt, width, height, className }: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)
  const initials = alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  if (imageError || !src) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-200 text-gray-600 font-semibold", className)}>
        {initials}
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      onError={() => setImageError(true)}
    />
  )
}
