'use client'

import PageWrapper from './PageWrapper'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>
}
