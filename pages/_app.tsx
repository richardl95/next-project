import '../styles/antd.less'

import { AppProps } from 'next/app'
import React from 'react'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import { AdminLayout } from '@/layouts'

const queryCache = new QueryCache()

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const C = <Component {...pageProps} />
  const renderComponent = () => {
    if (router.pathname.startsWith('/admin')) {
      return <AdminLayout>{C}</AdminLayout>
    }
    return C
  }
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        {renderComponent()}
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}

export default MyApp
