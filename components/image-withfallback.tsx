'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc, // Optional: You can pass a specific fallback if you want
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  
  // 1. Define a clean, generic gray placeholder (Data URI) 
  // This loads instantly and looks like a "skeleton" loader.
  const defaultFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Crect fill='%23f1f5f9' width='800' height='800'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23cbd5e1'%3E%E2%9D%96%3C/text%3E%3C/svg%3E";

  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src as string);
    setHasError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={hasError || !imgSrc ? (fallbackSrc || defaultFallback) : imgSrc}
      alt={alt || 'Image'}
      // 2. FORCE 'object-cover' so it never goes out of space
      className={`object-cover ${className || ''}`} 
      onError={() => {
        setHasError(true);
      }}
    />
  );
}