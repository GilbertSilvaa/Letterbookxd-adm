import { ReactNode } from 'react'

type TLayoutProps = {
  children: ReactNode
}

export function Layout({ children }: TLayoutProps) {
  return (
    <div className="flex">
      <aside className="w-[280px] bg-[#181818]">

      </aside>
      
      <main className="flex-1">
        { children }
      </main>
    </div>
  )
}