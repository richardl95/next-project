import { Button } from 'antd'
import { DeleteIcon, EditIcon, Icon, LoginIcon } from 'assets/images'
// import Tes1t from 'assets/images/edit.svg'
import Header from 'components/Header'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { QueryCache, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import IndexSvg from './index.svg'

export const Home = (props): JSX.Element => {
  const { data } = useQuery('posts', getPosts)

  const { isLoading, error, data: data1 } = useQuery('repoData', () =>
    fetch(
      'https://api.github.com/repos/tannerlinsley/react-query'
    ).then((res) => res.json())
  )

  return (
    <div className="container">
      {data.hooks_url}
      <div className="h-8 w-8">
        <Icon src={LoginIcon} className="h-2 w-2 text-red-500" />
      </div>
      <p className="text-red-500">asdsddasd</p>
      <IndexSvg />
      <EditIcon />

      {/* <Icon component={DeleteIcon} /> */}
      {/* <DeleteIcon className="h-8 w-8" /> */}
      {isLoading ? 'laoding' : data1?.hooks_url}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Button>asd</Button>
      {/* <img src={require('assets/images/login.svg')} alt="asd" /> */}
      {/* <Tes1t /> */}
      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <button
          onClick={() => {
            window.alert('With typescript and Jest')
          }}>
          Test Button
        </button>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>
              Find in-depth information about Next.js features and
              API.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>
              Learn about Next.js in an interactive course with
              quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card">
            <h3>Examples &rarr;</h3>
            <p>
              Discover and deploy boilerplate example Next.js
              projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card">
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with
              Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}
const getPosts = () =>
  fetch(
    'https://api.github.com/repos/tannerlinsley/react-query'
  ).then((res) => res.json())
export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const queryCache = new QueryCache()
  console.log('asdxzccx')

  await queryCache.prefetchQuery('posts', getPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  }
}

export default Home
