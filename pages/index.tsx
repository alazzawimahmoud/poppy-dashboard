import dynamic from 'next/dynamic';
import { useState } from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import ZoneItem from '../components/zone-item';
import { ZoneExtended } from '../schema';
import { useDashboard, useHistory } from '../services/api-hooks';
const Dashboard = dynamic(() => import('../components/dashboard'), { ssr: false });
const History = dynamic(() => import('../components/history'), { ssr: false });

const Home = () => {
  const { data:dashboardData, loading:loadingDashboardData } = useDashboard();
  const { data:historyData, loading:loadingHistoryData } = useHistory();
  const [activeZone, setActiveZone] = useState<ZoneExtended>();
  const [view, setView] = useState<'home' | 'history'>('history');

  return <Layout title="Home 🚗">
    {loadingDashboardData || loadingHistoryData ? 'loading 🚗 🚗 🚗 ' :
      <div className="flex flex-col-reverse w-screen h-screen overflow-hidden lg:grid lg:grid-cols-4 place-items-center">
        <div className="grid content-start w-full h-full gap-5 p-4 overflow-hidden overflow-y-auto justify-items-center">
          <h2 className="text-3xl font-bold leading-tight text-cool-gray-900">Poppy dashboard 🚗</h2>
          <div className="flex gap-2 place-items-center" >
            <Button isActive={view === 'home'} onClick={() => setView('home')}>home</Button>
            <Button isActive={view === 'history'} onClick={() => setView('history')}>history</Button>
          </div>
          <div className="grid w-full gap-2 place-self-start">
            {dashboardData?.zones
              .map((zone, index) =>
                <ZoneItem key={index} zone={zone} onClick={() => setActiveZone(zone)} />
              )}
          </div>
        </div>

        {view === 'home' && <Dashboard data={dashboardData} activeZone={activeZone} />}
        {view === 'history' && historyData && <History data={historyData} />}
      </div>
    }
  </Layout>;
}

export default Home;