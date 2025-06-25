import '../css/main.css'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores'
import { Provider } from 'react-redux'
import { appTitle } from '../config'
import { AuthProvider } from '../context/auth'
import { AppProvider } from '../context/app'
import { ToastContainer } from 'react-toastify'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  const imageWidth = '1920'
  const imageHeight = '960'

  return (
    <Provider store={store}>
      <AppProvider>
        <AuthProvider>
          {getLayout(
            <>
              <Head>
                <meta property="og:site_name" content={appTitle} />
                <meta property="og:title" content={appTitle} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content={imageWidth} />
                <meta property="og:image:height" content={imageHeight} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={appTitle} />
                <meta property="twitter:image:width" content={imageWidth} />
                <meta property="twitter:image:height" content={imageHeight} />
              </Head>

              <Script
                src="https://www.googletagmanager.com/gtag/js?id=UA-130795909-1"
                strategy="afterInteractive"
              />

              <Script id="google-analytics" strategy="afterInteractive">
                {`
              window.dataLayer = window.dataLayer || []
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date())
              gtag('config', 'UA-130795909-1')
            `}
              </Script>
              <Component {...pageProps} />
              <ToastContainer />
            </>
          )}
        </AuthProvider>
      </AppProvider>
    </Provider>
  )
}

export default App
