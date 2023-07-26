import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import AppContextAuth, { AuthConext } from './contexts/AppContextAuth'
import useRootRoutes from './hooks/useRootRoutes'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
function App() {
  const element = useRootRoutes()
  const { reset } = useContext(AuthConext)
  useEffect(() => {
    document.addEventListener('clearAll', reset)
    return () => {
      document.removeEventListener('clearAll', reset)
    }
  }, [reset])
  return (
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <AppContextAuth>
          <ErrorBoundary>
            {element}
            <ToastContainer />
          </ErrorBoundary>
        </AppContextAuth>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
