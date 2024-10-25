import { useAuth } from '@app/app/hooks'
import { Layout } from '@app/view/layouts'
import { DashBoard } from '@app/view/pages/dashboard'
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
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}