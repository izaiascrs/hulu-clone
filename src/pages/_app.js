import '../styles/globals.css'
import Nav from '../components/Nav'
import Header from '../components/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        Link
        <title>Hulu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
