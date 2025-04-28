import React, { useState } from 'react';
import { api } from '../api/client';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  phoneNumber: string;
  age: number;
  lastDonation?: Date;
}

const SearchDonors = () => {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    location: ''
  });
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.searchDonors(searchParams);
      setDonors(response.data);
    } catch (err) {
      setError('Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Search Blood Donors</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              value={searchParams.bloodGroup}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Enter city or area"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:bg-red-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donors.map(donor => (
            <div key={donor.id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{donor.name}</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Blood Group:</span>{' '}
                  <span className="font-medium">{donor.bloodGroup}</span>
                </p>
                <p>
                  <span className="text-gray-600">Location:</span>{' '}
                  <span className="font-medium">{donor.location}</span>
                </p>
                <p>
                  <span className="text-gray-600">Age:</span>{' '}
                  <span className="font-medium">{donor.age}</span>
                </p>
                <p>
                  <span className="text-gray-600">Last Donation:</span>{' '}
                  <span className="font-medium">
                    {donor.lastDonation
                      ? new Date(donor.lastDonation).toLocaleDateString()
                      : 'Not specified'}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Contact:</span>{' '}
                  <span className="font-medium">{donor.phoneNumber}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No donors found matching your criteria.</p>
      )}
    </div>
  );
};

export default SearchDonors; 