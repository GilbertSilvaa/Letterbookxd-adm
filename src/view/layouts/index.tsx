import { ReactNode } from 'react'

type TLayoutProps = {
  children: ReactNode
}

export function Layout({ children }: TLayoutProps) {
  return (
    <div>
      <h1>layout</h1>
      { children }
    </div>
  )
}