import useData from "../services/use-data";
import Link from 'next/link'
import Layout from '../components/layout';
import Header from "../components/header";

const Page = () => {
  const { data } = useData();
  return <Layout title="Page">
    <Header/>
    <div className="text-xl">{data?.data || 'Loading ...'}</div>
    <Link href="/"><a className="text-xl">Home</a></Link>
  </Layout>;
}

export default Page;