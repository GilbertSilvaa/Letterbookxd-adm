import { useAuth } from '@app/app/hooks'
import { Layout } from '@app/view/layouts'
import { DashBoardPage } from '@app/view/pages/dashboard'
import { NotAuthorization } from '@app/view/pages/notAuthorization'
import { ReportsClosePage } from '@app/view/pages/reportsClose'
import { ReportsOpenPage } from '@app/view/pages/reportsOpen'
import { SignInPage } from '@app/view/pages/signin'
import { ModeratorsPage } from '@app/view/pages/moderators'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Router() {
  const { signedIn, user } = useAuth()

  if (!signedIn) return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/denuncias" element={<ReportsOpenPage />} />
          <Route path="/denuncias/fechadas" element={<ReportsClosePage />} />
          <Route path="/moderadores" element={user?.privilege === 'ADM' ? <ModeratorsPage /> : <NotAuthorization />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}