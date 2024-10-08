import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <App />
    </NextThemesProvider>
  </NextUIProvider>
)
