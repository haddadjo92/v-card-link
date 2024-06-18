import { Fragment, useMemo } from 'react'
// *** redux ***
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { wrapper } from '@/store/store';
// *** Layout ***
import AdminLayout from '@/layout/AdminLayout'
import MainLayout from '@/layout/MainLayout'
// *** styles ***
import GlobalStyles from '@/assets/styles/global.styles'
import { createUseStyles } from 'react-jss'
const useGlobalStyles = createUseStyles(GlobalStyles)

export default function App({ Component, pageProps, ...restAppProps }) {
  useGlobalStyles()
  const { store, props } = wrapper.useWrappedStore(restAppProps);

  const { auth: { isAuthenticated } } = store.getState(state => state.auth)
  const router = props?.router


  // ***************** Memos ***************** 
  const isAdmin = useMemo(() => {
    const splitPath = router.route.split("/");
    return splitPath[1] === 'admin' || splitPath[2] === 'admin'
  }, [router.route])



  const Layout = useMemo(() => {
    if (isAdmin && isAuthenticated)
      return AdminLayout
    else if (isAdmin && !isAuthenticated) {
      if (typeof (window) !== "undefined")
        router.push("/login")
      return Fragment
    }
    else {
      if (router.route === '/login')
        return Fragment
      else return MainLayout
    }
  }, [isAdmin, isAuthenticated, router])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <Layout>
          <Component
            {...pageProps}
            key={router.pathname}
          />
        </Layout>
        {/* {() => (
          <Layout>
            <Component
              {...pageProps}
              key={router.pathname}
            />
          </Layout>
        )} */}
      </PersistGate>
    </Provider>
  )
}
