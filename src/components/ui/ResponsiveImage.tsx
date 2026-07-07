'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ResponsivePictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallback?: string;
}

export function ResponsivePicture({ src, alt, width, height, className, priority, fallback }: ResponsivePictureProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const fmtBase = src.replace(/\.[^.]+$/, '').replace(/^\//, '');
  const fmtDir = fmtBase.includes('/') ? fmtBase.split('/').slice(0, -1).join('/') + '/formats/' + fmtBase.split('/').pop() : 'formats/' + fmtBase;
  const fmtRoot = '/' + fmtDir;
  const avifSrc = fmtRoot + '.avif';
  const webpSrc = fmtRoot + '.webp';

  const isFixed = typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0 && !src.includes('.svg');

  if (isFixed) {
    return (
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={className}
          onError={() => {
            if (fallback && imgSrc !== fallback) setImgSrc(fallback);
          }}
        />
      </picture>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => {
        if (fallback && imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
