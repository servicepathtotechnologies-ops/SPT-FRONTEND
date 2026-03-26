'use client';
import { useEffect } from 'react';

interface VideoModalProps {
  videoSrc: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoSrc, title, isOpen, onClose }: VideoModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-white font-semibold text-sm">{title} — App Demo</span>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>
        
        {/* Video — portrait aspect ratio for mobile recording */}
        <div className="relative" style={{ aspectRatio: '9/16', maxHeight: '75vh' }}>
          <video
            src={videoSrc}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
