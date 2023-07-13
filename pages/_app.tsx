import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import store from '@/store'
import '@/styles/globals.css'

const env = process.env.NODE_ENV

if (env == 'development') {
  require('../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>User editor</title>
        <meta name="description" content="Application for editing user information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
