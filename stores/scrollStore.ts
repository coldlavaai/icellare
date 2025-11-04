import { create } from 'zustand'

interface ScrollStore {
  scrollProgress: number
  scrollVelocity: number
  currentSection: number
  setScroll: (progress: number, velocity: number) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  currentSection: 0,
  setScroll: (progress, velocity) =>
    set({
      scrollProgress: progress,
      scrollVelocity: velocity,
      currentSection: Math.floor(progress * 7)
    })
}))
