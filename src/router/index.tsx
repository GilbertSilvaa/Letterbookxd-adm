import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../view/layouts'
import { SignIn } from '../view/pages/signin'

export function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<SignIn/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}