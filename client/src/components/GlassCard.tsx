import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  variant?: 'default' | 'strong' | 'light';
}

export const GlassCard = ({
  children,
  className = '',
  glowColor = 'from-primary-500/20',
  variant = 'default',
}: GlassCardProps) => {
  const baseClasses = 'relative overflow-hidden rounded-2xl backdrop-blur-lg';
  const variantClasses = {
    default: 'bg-white/30 shadow-glass',
    strong: 'bg-white/40 shadow-glass-strong',
    light: 'bg-white/20 shadow-glass-light',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} to-transparent opacity-20`} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
