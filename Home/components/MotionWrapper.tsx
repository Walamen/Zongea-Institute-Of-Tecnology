'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionWrapperProps {
  children: ReactNode
  type?: 'up' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  className?: string
}

export function MotionWrapper({ children, type = 'up', delay = 0, className = '' }: MotionWrapperProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: type === 'up' ? 32 : 0,
      x: type === 'left' ? -32 : type === 'right' ? 32 : 0,
      scale: type === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // Custom easing similar to power2.out
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
