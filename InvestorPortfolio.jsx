import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';

const InvestorPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState({
    stats: {
      totalInvested: 0,
      activeInvestments: 0,
      totalReturns: 0,
      averageReturn: 0
    },
    investments: [],
    watchlist: []
  });
  const [activeTab, setActiveTab] = useState('investments');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const { data } = await axios.get('/api/portfolio');
      setPortfolio(data.data);
    } catch (error) {
      toast.error('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (campaignId) => {
    try {
      await axios.delete(`/api/watchlist/${campaignId}`);
      setPortfolio(prev => ({
        ...prev,
        watchlist: prev.watchlist.filter(item => item.id !== campaignId)
      }));
      toast.success('Removed from watchlist');
    } catch (error) {
      toast.error('Failed to remove from watchlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const sortInvestments = (investments) => {
    return [...investments].sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'return':
          return b.currentReturn - a.currentReturn;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const filterInvestments = (investments) => {
    if (filterStatus === 'all') return investments;
    return investments.filter(investment => investment.status === filterStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Invested
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ${portfolio.stats.totalInvested.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Investments
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {portfolio.stats.activeInvestments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Returns
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ${portfolio.stats.totalReturns.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Return
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {portfolio.stats.averageReturn}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('investments')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'investments'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Investments
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'watchlist'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Watchlist
              </button>
            </div>
            {activeTab === 'investments' && (
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="return">Sort by Return</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'investments' ? (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Campaign
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Return
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filterInvestments(sortInvestments(portfolio.investments)).map(
                      (investment) => (
                        <tr key={investment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={investment.campaign.image_url}
                                  alt={investment.campaign.title}
                                />
                              </div>
                              <div className="ml-4">
                                <Link
                                  to={`/campaigns/${investment.campaign.id}`}
                                  className="text-sm font-medium text-gray-900 hover:text-primary-600"
                                >
                                  {investment.campaign.title}
                                </Link>
                                <div className="text-sm text-gray-500">
                                  {investment.campaign.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${investment.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                investment.currentReturn >= 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {investment.currentReturn >= 0 ? '+' : ''}
                              {investment.currentReturn}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                investment.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : investment.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {investment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(investment.date).toLocaleDateString()}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {portfolio.watchlist.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-lg object-cover"
                      src={item.image_url}
                      alt={item.title}
                    />
                    <div className="ml-4">
                      <Link
                        to={`/campaigns/${item.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600"
                      >
                        {item.title}
                      </Link>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          ${item.current_amount.toLocaleString()} raised
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.days_left} days left
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWatchlist(item.id)}
                    className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{
                          width: `${(item.current_amount / item.target_amount) * 100}%`
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>
                      {((item.current_amount / item.target_amount) * 100).toFixed(
                        1
                      )}
                      % of ${item.target_amount.toLocaleString()}
                    </span>
                    <span>{item.investors_count} investors</span>
                  </div>
                </div>
              </div>
            ))}
            {portfolio.watchlist.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No campaigns in your watchlist
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorPortfolio;
