'use client'

import { createContext, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const DNALoadingSequence = dynamic(() => import('@/components/DNALoadingSequence'), { ssr: false })

export const LoadingContext = createContext<{
  isLoaded: boolean
  assemblyComplete: boolean
}>({
  isLoaded: false,
  assemblyComplete: false,
})

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [assemblyComplete, setAssemblyComplete] = useState(false)

  // Check if user has already seen loading sequence this session
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    if (hasSeenLoading) {
      setIsLoaded(true)
      setShowContent(true)
      setAssemblyComplete(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoaded(true)
    setAssemblyComplete(true)
    sessionStorage.setItem('hasSeenLoading', 'true')

    // Small delay before showing content for smoother transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <LoadingContext.Provider value={{ isLoaded, assemblyComplete }}>
      {!isLoaded && <DNALoadingSequence onComplete={handleLoadingComplete} />}
      {showContent && children}
    </LoadingContext.Provider>
  )
}
