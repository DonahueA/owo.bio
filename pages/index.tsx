import type { NextPage } from 'next'
import Layout from '../components/Layout'


const Home: NextPage = () => {
  return (
    <Layout>
      <div style={{paddingBottom: "100px"}}><h1>getmyl.ink</h1></div>

      <div style={{paddingBottom: "100px"}}><h2>Connect all your social media in one simple page.</h2></div>
      <div style={{marginBottom: "16px"}}><a href="/login" className='button wide'>login</a></div>
      <div><a href="/register" className='button wide'>make your own page</a></div>
    </Layout>
    )

}

export default Home
