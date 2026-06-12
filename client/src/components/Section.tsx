import { ReactNode } from 'react';
import clsx from 'clsx';
import type { Section as SectionType } from '../types';

interface SectionProps extends SectionType {
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, subtitle, children, className }: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx('py-16 md:py-24', className)}
    >
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-noto mb-4 hidden ">{title}</h2>
            {subtitle && (
              <p className="text-xl font-roboto text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
