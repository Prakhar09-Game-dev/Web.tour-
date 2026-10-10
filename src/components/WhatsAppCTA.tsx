import React from 'react';
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from '../config/contact.js';

interface WhatsAppCTAProps {
  label?: string;
  className?: string;
  message?: string;
  title?: string;
  compact?: boolean;
  variant?: 'button' | 'icon';
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  label = 'WhatsApp Us',
  className = '',
  message = DEFAULT_WHATSAPP_MESSAGE,
  title = 'Chat on WhatsApp',
  compact = false,
  variant = 'button'
}) => {
  const href = getWhatsAppLink(message);

  if (variant === 'icon') {
    return (
      <a
        aria-label={title}
        className={`inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white shadow-sm hover:scale-105 transition-transform ${className}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      >
        <span className="material-symbols-outlined text-[20px]">chat</span>
      </a>
    );
  }

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-bold transition-transform hover:scale-[1.01] active:scale-95 ${compact ? 'px-3 py-2 text-[10px]' : 'px-4 py-2.5 text-xs'} ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      <span className="material-symbols-outlined text-[18px]">chat</span>
      <span>{label}</span>
    </a>
  );
};
