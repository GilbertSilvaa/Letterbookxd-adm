import Logo from '@app/assets/logo.png'
import { ReactNode } from 'react'
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { TbMessageReportFilled } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'

type TLayoutProps = {
  children: ReactNode
}

const MENU_ITEMS = [
  { label: 'Dashboard', icon: MdDashboard, to: '/', onlyAdmin: false },
  { label: 'Denúncias em Aberto', icon: TbMessageReportFilled, to: '/denuncias', onlyAdmin: false },
  { label: 'Denúncias Fechadas', icon: FaCheckCircle, to: '/denuncias/fechadas', onlyAdmin: false },
  { label: 'Usuários', icon: FaUserCircle, to: '/usuarios', onlyAdmin: true }
]

export function Layout({ children }: TLayoutProps) {
  const location = useLocation()

  return (
    <div className="flex">
      <aside className="w-[280px] h-[100vh] bg-[#181818] flex flex-col items-center">
        <img src={Logo} alt="logo" className="w-[90%]" />

        <ul className="mt-5 w-full px-4 flex flex-col gap-4 text-[#eee]">
          {MENU_ITEMS.map((params, index) => (
            <Link key={index} to={params.to}>
              <li className={`flex items-center gap-3 font-semibold p-3 rounded transition-all ${params.to === location.pathname ? 'bg-primary' : 'hover:bg-[#333]'}`}>
                <params.icon/> 
                <span>{params.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </aside>
      
      <main className="flex-1 p-6">
        { children }
      </main>
    </div>
  )
}