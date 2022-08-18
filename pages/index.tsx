import type { NextPage } from 'next'
import Layout from '../components/Layout'


const Home: NextPage = () => {
  return (
    <Layout>
      <div><h2><a href="/login">Login</a></h2></div>
      <div><h2><a href="/register">make your own page</a></h2></div>
    </Layout>
    )

}

export default Home
