import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import { useDashboard } from '../services/api-hooks';
const Dashboard = dynamic(() => import('../components/dashboard'), { ssr: false });

const Home = () => {
  const { data, loading } = useDashboard();
  return <Layout>
    {loading ? 'loading 🚗 🚗 🚗 ' : <Dashboard data={data} />}
  </Layout>;
}

export default Home;