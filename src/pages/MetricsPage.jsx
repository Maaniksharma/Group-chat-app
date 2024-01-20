import { useEffect, useState } from 'react';
import PageLoader from '../components/PageLoader';
import Metric from '../components/Metric';
import useToast from '../hooks/useToast';

// Define the Metrics page
const MetricsPage = () => {
  const [loading, setLoading] = useState(true);
  const [metricsData, setMetricsData] = useState({});
  const [Dates, setDates] = useState({
    from: '',
    to: '',
  });
  const [initialLoaded, setInitialLoaded] = useState(false);
  const ShowToast = useToast();
  const fetchMetrics = async () => {
    if (initialLoaded) {
      if (
        Dates.from === '' ||
        Dates.to === '' ||
        Dates.from > Dates.to ||
        Dates.from === Dates.to
      ) {
        ShowToast('Please select a valid date range');
        return;
      }
    }
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_SERVERURL}/user/metrics?from=${Dates.from}&to=${
        Dates.to
      }`,
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    if (response.error) {
      console.log(response.error);
      return;
    }
    const data = await response.json();
    setMetricsData(data.metrics);
    setLoading(false);
  };
  useEffect(() => {
    fetchMetrics();
    setInitialLoaded(true);
  }, []);
  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="flex flex-col sm:flex-row justify-between mb-5 mx-10">
        <div>
          <label
            htmlFor="from"
            className="block text-xl font-medium text-gray-700"
          >
            From
          </label>
          <input
            type="date"
            id="from"
            name="from"
            className="mt-1 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setDates({ ...Dates, from: e.target.value })}
          />
        </div>
        <div className="text-3xl text-gray-800 font-semibold">Select Date</div>
        <div>
          <label
            htmlFor="to"
            className="block text-xl font-medium text-gray-700"
          >
            To
          </label>
          <input
            type="date"
            id="to"
            name="to"
            className="mt-1 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
            onChange={(e) => setDates({ ...Dates, to: e.target.value })}
          />
        </div>
      </div>
      <hr className=" bg-gray-300 max-w-full h-0.5" />
      <div className=" text-center">
        <button
          className="mt-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-500 "
          onClick={fetchMetrics}
        >
          Fetch Metrics
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-16">
        <div>
          <h2 className="text-xl font-bold mb-4">Top Users</h2>
          {metricsData.topUsers.map((user, index) => (
            <Metric
              key={index}
              metricValue={user.count}
              metricText={user.userName}
              metricValueText={'Total Messages'}
            />
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Top Groups</h2>
          {metricsData.topGroups.map((group, index) => (
            <Metric
              key={index}
              metricValue={group.count}
              metricText={group.groupName}
              metricValueText={'Total Messages'}
            />
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Top Regions</h2>
          {metricsData.topRegions.map((region, index) => (
            <Metric
              key={index}
              metricValue={region.count}
              metricText={region._id}
              metricValueText={'Total Users'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
