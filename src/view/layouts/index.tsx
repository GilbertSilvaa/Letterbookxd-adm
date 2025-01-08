import { ReactNode } from 'react'
import { FaCheckCircle, FaRegUserCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { TbMessageReportFilled } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@app/app/hooks'
import Logo from '@app/assets/logo.png'

type TLayoutProps = {
  children: ReactNode
}

const MENU_ITEMS = [
  { label: 'Dashboard', icon: MdDashboard, to: '/', onlyAdmin: false },
  { label: 'Denúncias em Aberto', icon: TbMessageReportFilled, to: '/denuncias', onlyAdmin: false },
  { label: 'Denúncias Fechadas', icon: FaCheckCircle, to: '/denuncias/fechadas', onlyAdmin: false },
  { label: 'Moderadores', icon: FaUserCircle, to: '/usuarios', onlyAdmin: true }
]

export function Layout({ children }: TLayoutProps) {
  const location = useLocation()

  const { user } = useAuth()

  return (
    <div className="flex">
      <aside className="w-[280px] h-[100vh] bg-[#18181a] flex flex-col items-center">
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

        <div className="w-full p-4 flex-1 flex flex-col justify-end">
          <Link to="" className="flex items-center gap-3 font-semibold p-3 rounded transition-all hover:bg-[#333]">
            <FaSignOutAlt/>
            Sair
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 flex flex-col">
        <aside className="w-full h-[3rem] bg-[#18181a] flex justify-end">
          <div className="flex items-center gap-2 px-5 mr-4">
            <FaRegUserCircle />
            <span className="font-normal">{user?.nickname}</span>
          </div>
        </aside>
        
        <div className="p-6 flex-1">
          { children }
        </div>
      </main>
    </div>
  )
}