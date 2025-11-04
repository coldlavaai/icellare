import { useEffect } from 'react'
import Lenis from 'lenis'
import { useScrollStore } from '@/stores/scrollStore'

export function useScrollIntegration() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false
    })

    // Update scroll store on scroll
    lenis.on('scroll', ({ scroll, limit, velocity }) => {
      const progress = scroll / limit
      useScrollStore.getState().setScroll(progress, velocity)
    })

    // Animation loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])
}
