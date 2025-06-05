import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import tripService from '../services/api/tripService'

const Home = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('trips')

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const result = await tripService.getAll()
        setTrips(result || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load trips')
      } finally {
        setLoading(false)
      }
    }
    loadTrips()
  }, [])

  const handleTripUpdate = async () => {
    try {
      const result = await tripService.getAll()
      setTrips(result || [])
    } catch (err) {
      toast.error('Failed to refresh trips')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const calculateProgress = (trip) => {
    if (!trip?.destinations?.length) return 0
    const totalActivities = trip.destinations.reduce((acc, dest) => 
      acc + (dest.activities?.length || 0), 0)
    return Math.min(Math.max(totalActivities * 15, 10), 100)
  }

  const PlaceholderSection = ({ title, message, icon }) => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-6">
        <ApperIcon name={icon} className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Map" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">WanderMap</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('trips')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'trips' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name="Luggage" className="w-4 h-4" />
                <span className="font-medium">My Trips</span>
              </button>
              
              <button
                onClick={() => setActiveTab('maps')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'maps' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name="MapPin" className="w-4 h-4" />
                <span className="font-medium">Maps</span>
              </button>
              
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'documents' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name="FileText" className="w-4 h-4" />
                <span className="font-medium">Documents</span>
              </button>
              
              <button
                onClick={() => setActiveTab('packing')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'packing' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name="Package" className="w-4 h-4" />
                <span className="font-medium">Packing</span>
              </button>
            </nav>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <ApperIcon name="Bell" className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <ApperIcon name="Settings" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trips' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Explorer! ✈️
              </h2>
              <p className="text-gray-600">
                Plan your next adventure or continue organizing your current trips
              </p>
            </div>

            {/* Main Feature Component */}
            <MainFeature trips={trips} onUpdate={handleTripUpdate} loading={loading} />

            {/* Trip Stats */}
            {trips.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Trips</p>
                      <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Map" className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Destinations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {trips.reduce((acc, trip) => acc + (trip.destinations?.length || 0), 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name="MapPin" className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {trips.filter(trip => {
                          const tripDate = new Date(trip.startDate)
                          const now = new Date()
                          return tripDate.getMonth() === now.getMonth() && 
                                 tripDate.getFullYear() === now.getFullYear()
                        }).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Calendar" className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Trips */}
            {trips.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Recent Trips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.slice(0, 6).map((trip) => (
                    <motion.div
                      key={trip.id}
                      className="card overflow-hidden group cursor-pointer"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-primary to-secondary">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="font-semibold text-lg">{trip.name}</h4>
                          <p className="text-sm opacity-90">
                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <ApperIcon name="Heart" className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">
                            {trip.destinations?.length || 0} destinations
                          </span>
                          <span className="text-sm font-medium text-secondary">
                            {calculateProgress(trip)}% planned
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${calculateProgress(trip)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <button className="flex items-center space-x-1 text-primary hover:text-primary-dark transition-colors duration-200">
                            <ApperIcon name="Eye" className="w-4 h-4" />
                            <span className="text-sm font-medium">View</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <ApperIcon name="Edit" className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'maps' && (
          <PlaceholderSection
            title="Interactive Maps"
            message="Explore your destinations with detailed interactive maps coming soon! We're building an amazing mapping experience for you."
            icon="Map"
          />
        )}

        {activeTab === 'documents' && (
          <PlaceholderSection
            title="Travel Documents"
            message="Document storage launching next month! Keep all your travel documents organized in one secure place."
            icon="FileText"
          />
        )}

        {activeTab === 'packing' && (
          <PlaceholderSection
            title="Packing Lists"
            message="Smart packing lists coming soon! We'll help you pack perfectly for every destination and weather condition."
            icon="Package"
          />
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <button 
          className="w-12 h-12 bg-accent hover:bg-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          onClick={() => toast.info('Currency converter launching soon!')}
        >
          <ApperIcon name="DollarSign" className="w-5 h-5" />
        </button>
        
        <button 
          className="w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          onClick={() => setActiveTab('trips')}
        >
          <ApperIcon name="Plus" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile App Promo Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Smartphone" className="w-5 h-5" />
            <span className="text-sm font-medium">Offline mode available in our upcoming mobile app!</span>
          </div>
          <button className="text-white/80 hover:text-white">
            <ApperIcon name="X" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home