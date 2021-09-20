import { GetServerSideProps } from 'next'
import { getData } from "../services/use-data";
import Link from 'next/link'
import Layout from '../components/layout';
import Header from '../components/header';

const Home = ({ data }) => {
  return <Layout title="Home">
    <Header/>
    <div className="text-xl">{data.data}</div>
    <Link href="/page"><a className="text-xl">Page</a></Link>
  </Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getData('data');
  return {
    props: {
      data,
    }
  }
}

export default Home;