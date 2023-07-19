import { useContext, useEffect } from 'react'
import useRootRoutes from './hooks/useRootRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthConext } from './contexts/AppContextAuth'
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
    <div>
      {element}
      <ToastContainer />
    </div>
  )
}

export default App
