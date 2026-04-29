'use client'
import { useRef } from 'react'

// This hook is now just a ref provider - animations are handled by Framer Motion components
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  return ref
}
