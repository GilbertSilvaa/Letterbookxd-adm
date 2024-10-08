import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../app/hooks'
import { Layout } from '../view/layouts'
import { SignIn } from '../view/pages/signin'

export function Router() {
  const { signedIn } = useAuth()

  if (!signedIn) return (
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
          <Route path="/" element={<SignIn/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}