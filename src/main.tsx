import { Toaster } from "@/components/ui/sonner"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider } from 'react-router'
import './index.css'
import { ThemeProvider } from './providers/theme.provider'
import { store } from './redux/store'
import { router } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}/>
        <Toaster richColors/>
      </ThemeProvider>
      </ReduxProvider>
      

  </StrictMode>,
)
