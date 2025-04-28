import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Save Lives Through Blood Donation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect blood donors with those in need. Join our community today.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Become a Donor
          </Link>
          <Link
            to="/search"
            className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors"
          >
            Find Donors
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-600 text-4xl mb-4">🩸</div>
          <h3 className="text-xl font-semibold mb-2">Quick Search</h3>
          <p className="text-gray-600">
            Find blood donors in your area quickly and easily based on blood type.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-600 text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold mb-2">Location Based</h3>
          <p className="text-gray-600">
            Search for donors near you to ensure timely assistance.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-600 text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
          <p className="text-gray-600">
            Your information is safe with us. Connect with donors securely.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-red-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our community of blood donors and help save lives.
        </p>
        <Link
          to="/register"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Register Now
        </Link>
      </div>
    </div>
  )
}

export default Home 