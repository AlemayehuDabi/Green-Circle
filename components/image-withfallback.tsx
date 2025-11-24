'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.svg', // Ensure you have this file in your public folder
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    // If src is empty string, null, or undefined, use fallbackSrc
    return src || fallbackSrc;
  });

  // Update local state if the incoming src prop changes (e.g. when navigating to a new page)
  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  // Don't render the image if there's no valid source
  if (!imgSrc) return null;

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || ''}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}