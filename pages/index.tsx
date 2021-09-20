import Link from 'next/link'
import Layout from '../components/layout';
import Header from '../components/header';
import useData from '../services/use-data';

const Home = () => {
  const { data } = useData()
  return <Layout title="Home">
    <Header />
    <div className="text-xl">
      {data?.zones.map((zone, index) => <div key={index}>{zone.name} - {zone.cars}</div>)}
    </div>
  </Layout>;
}

export default Home;