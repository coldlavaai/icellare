'use client'

import { useState, useEffect } from 'react'
import DNALoadingSequence from './DNALoadingSequence'

export default function PageWithLoading({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [shouldShowLoading, setShouldShowLoading] = useState(false)

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('icellare_visited')

    if (!hasVisited) {
      setShouldShowLoading(true)
      sessionStorage.setItem('icellare_visited', 'true')
    } else {
      setLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  if (loading && shouldShowLoading) {
    return <DNALoadingSequence onComplete={handleLoadingComplete} />
  }

  return <>{children}</>
}
