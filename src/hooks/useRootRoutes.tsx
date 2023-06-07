import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Profile from 'src/components/Profile'
import { Path } from 'src/contants/path'
import { AuthConext } from 'src/contexts/AppContextAuth'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'

const ProtectRouter = () => {
  const { isAuthentication } = useContext(AuthConext)

  return isAuthentication ? <Outlet /> : <Navigate to='/login' />
}
const RejectRouter = () => {
  const { isAuthentication } = useContext(AuthConext)

  return !isAuthentication ? <Outlet /> : <Navigate to='/' />
}

export default function useRootRoutes() {
  const elementRoutes = useRoutes([
    {
      path: '/',
      element: <RejectRouter />,
      children: [
        {
          path: Path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: Path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/',
      element: <ProtectRouter />,
      children: [
        {
          path: Path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return elementRoutes
}
