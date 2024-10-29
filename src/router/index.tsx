import { useAuth } from '@app/app/hooks'
import { Layout } from '@app/view/layouts'
import { DashBoard } from '@app/view/pages/dashboard'
import { ReportsClose } from '@app/view/pages/reportsClose'
import { ReportsOpen } from '@app/view/pages/reportsOpen'
import { SignIn } from '@app/view/pages/signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Router() {
  const { signedIn } = useAuth()

  if (signedIn) return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  )

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/denuncias" element={<ReportsOpen/>} />
          <Route path="/denuncias/fechadas" element={<ReportsClose/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}