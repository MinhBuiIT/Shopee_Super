import useRootRoutes from './hooks/useRootRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const element = useRootRoutes()
  return (
    <div>
      {element}
      <ToastContainer />
    </div>
  )
}

export default App
