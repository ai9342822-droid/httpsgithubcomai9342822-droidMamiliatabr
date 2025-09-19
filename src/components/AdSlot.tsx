import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdSlotProps {
  position: 'header' | 'sidebar' | 'content' | 'footer';
  size?: 'small' | 'medium' | 'large';
}

export function AdSlot({ position, size = 'medium' }: AdSlotProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    small: 'h-24 w-full max-w-xs',
    medium: 'h-32 w-full max-w-md',
    large: 'h-40 w-full max-w-lg'
  };

  return (
    <div className={`ad-slot ${sizeClasses[size]} mx-auto`}>
      <div className="h-full flex flex-col items-center justify-center space-y-2">
        <div className="text-2xl">📺</div>
        <div className="text-sm">{t('ads.placeholder')}</div>
        <div className="text-xs opacity-70">{position}</div>
      </div>
    </div>
  );
}
