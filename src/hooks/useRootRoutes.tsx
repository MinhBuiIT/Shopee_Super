import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import NotPageFound from 'src/components/NotPageFound'
import { Path } from 'src/contants/path'
import { AuthConext } from 'src/contexts/AppContextAuth'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import ProductList from 'src/pages/ProductList'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import NoMatchUser from 'src/pages/User/pages/NoMatchUser'

const Login = lazy(() => import('src/pages/Login'))
const Register = lazy(() => import('src/pages/Register'))
const Profile = lazy(() => import('src/pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))
const Cart = lazy(() => import('src/pages/Cart'))
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
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: Path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
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
          path: Path.user,
          element: (
            <MainLayout>
              <UserLayout></UserLayout>
            </MainLayout>
          ),

          children: [
            {
              index: true,
              element: <NoMatchUser />
            },
            {
              path: Path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: Path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: Path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: '*',
              element: <NoMatchUser />
            }
          ]
        },
        {
          path: Path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: Path.nameId,
          element: (
            <MainLayout>
              <Suspense>
                <ProductDetail />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: <NotPageFound />
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
