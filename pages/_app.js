import { Fragment, useMemo } from 'react'
import { ToastContainer } from 'react-toastify';
// *** redux ***
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { wrapper } from '@/store/store';
// *** Layout ***
import AdminLayout from '@/layout/AdminLayout'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'
// *** styles ***
import GlobalStyles from '@/assets/styles/global.styles'
import { createUseStyles } from 'react-jss'
const useGlobalStyles = createUseStyles(GlobalStyles)
// *** css ***
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps, ...restAppProps }) {
  useGlobalStyles()
  const { store, props } = wrapper.useWrappedStore(restAppProps);

  const { auth: { isAuthenticated, session } } = store.getState(state => state.auth)
  const router = props?.router


  // ***************** Memos ***************** 
  const isAdmin = useMemo(() => {
    const splitPath = router.route.split("/");
    return splitPath[1] === 'admin' || splitPath[2] === 'admin'
  }, [router.route])


  const isUser = useMemo(() => {
    const splitPath = router.route.split("/");
    return splitPath[1] === 'user' || splitPath[2] === 'user'
  }, [router.route])



  const Layout = useMemo(() => {

    if ((isAdmin || isUser) && !isAuthenticated) {
      if (typeof (window) !== "undefined")
        router.push("/login")
      return Fragment
    }
    else if (isAdmin)
      return AdminLayout

    else if (isUser)
      return UserLayout
    else {
      if (router.route === '/login')
        return Fragment
      else return MainLayout
    }
  }, [isAdmin, isUser, isAuthenticated, router])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <Layout>
          <Component
            {...pageProps}
            key={router.pathname}
          />
          <ToastContainer />
        </Layout>
      </PersistGate>
    </Provider>
  )
}