'use client'

import { createContext, useState, useEffect } from 'react'

export const LoadingContext = createContext<{
  isLoaded: boolean
  assemblyComplete: boolean
}>({
  isLoaded: true,
  assemblyComplete: true,
})

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Quick fade-in instead of complex loading sequence
    setIsLoaded(true)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoaded: true, assemblyComplete: true }}>
      {children}
    </LoadingContext.Provider>
  )
}
