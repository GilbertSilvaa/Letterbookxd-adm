import { useAuth } from '@app/app/hooks'
import { Layout } from '@app/view/layouts'
import { DashBoardPage } from '@app/view/pages/dashboard'
import { ReportsClosePage } from '@app/view/pages/reportsClose'
import { ReportsOpenPage } from '@app/view/pages/reportsOpen'
import { SignInPage } from '@app/view/pages/signin'
import { UsersPage } from '@app/view/pages/users'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Router() {
  const { signedIn } = useAuth()

  if (!signedIn) return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage/>} />
      </Routes>
    </BrowserRouter>
  )

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoardPage/>} />
          <Route path="/denuncias" element={<ReportsOpenPage/>} />
          <Route path="/denuncias/fechadas" element={<ReportsClosePage/>} />
          <Route path="/usuarios" element={<UsersPage/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}