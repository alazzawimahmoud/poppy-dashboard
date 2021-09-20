import { GetServerSideProps } from 'next'
import { getData } from "../services/use-data";
import Link from 'next/link'
import Layout from '../components/layout';
import Header from '../components/header';

const Home = ({ data }) => {
  console.log(data)
  return <Layout title="Home">
    <Header />
    <div className="text-xl">
      {data.zones.map((zone, index) => <div key={index}>{zone.name} - {zone.cars}</div>)}
    </div>
  </Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getData('dashboard');
  return {
    props: {
      data,
    }
  }
}

export default Home;