import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import tripService from '../services/api/tripService'
import destinationService from '../services/api/destinationService'
import activityService from '../services/api/activityService'
import budgetService from '../services/api/budgetService'

const MainFeature = ({ trips, onUpdate, loading }) => {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [destinations, setDestinations] = useState([])
  const [activities, setActivities] = useState([])
  const [budgets, setBudgets] = useState([])
  const [newTrip, setNewTrip] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: ''
  })
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    notes: '',
    category: 'sightseeing'
  })
  const [draggedActivity, setDraggedActivity] = useState(null)

  useEffect(() => {
    loadDestinations()
    loadActivities()
    loadBudgets()
  }, [])

  useEffect(() => {
    if (selectedTrip) {
      const tripActivities = activities.filter(activity => 
        selectedTrip.destinations?.some(dest => 
          dest.activities?.includes(activity.id)
        )
      )
      setActivities(tripActivities)
    }
  }, [selectedTrip])

  const loadDestinations = async () => {
    try {
      const result = await destinationService.getAll()
      setDestinations(result || [])
    } catch (err) {
      console.error('Failed to load destinations:', err)
    }
  }

  const loadActivities = async () => {
    try {
      const result = await activityService.getAll()
      setActivities(result || [])
    } catch (err) {
      console.error('Failed to load activities:', err)
    }
  }

  const loadBudgets = async () => {
    try {
      const result = await budgetService.getAll()
      setBudgets(result || [])
    } catch (err) {
      console.error('Failed to load budgets:', err)
    }
  }

  const handleCreateTrip = async (e) => {
    e.preventDefault()
    if (!newTrip.name.trim() || !newTrip.startDate || !newTrip.endDate) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const tripData = {
        ...newTrip,
        destinations: [],
        budget: null
      }
      await tripService.create(tripData)
      toast.success('Trip created successfully!')
      setShowCreateModal(false)
      setNewTrip({ name: '', startDate: '', endDate: '', description: '', coverImage: '' })
      onUpdate()
    } catch (err) {
      toast.error('Failed to create trip')
    }
  }

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return
    
    try {
      await tripService.delete(tripId)
      toast.success('Trip deleted successfully!')
      onUpdate()
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(null)
        setActiveView('dashboard')
      }
    } catch (err) {
      toast.error('Failed to delete trip')
    }
  }

  const handleAddActivity = async (e) => {
    e.preventDefault()
    if (!newActivity.title.trim() || !newActivity.date) {
      toast.error('Please fill in required fields')
      return
    }

    try {
      await activityService.create(newActivity)
      toast.success('Activity added successfully!')
      setShowActivityModal(false)
      setNewActivity({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        category: 'sightseeing'
      })
      loadActivities()
    } catch (err) {
      toast.error('Failed to add activity')
    }
  }

  const handleDragStart = (activity) => {
    setDraggedActivity(activity)
  }

  const handleDragEnd = () => {
    setDraggedActivity(null)
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

  const getCategoryIcon = (category) => {
    const icons = {
      sightseeing: 'Camera',
      food: 'Utensils',
      transport: 'Car',
      accommodation: 'Bed',
      entertainment: 'Music',
      shopping: 'ShoppingBag',
      other: 'MapPin'
    }
    return icons[category] || 'MapPin'
  }

  const getCategoryColor = (category) => {
    const colors = {
      sightseeing: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      transport: 'bg-purple-100 text-purple-800',
      accommodation: 'bg-green-100 text-green-800',
      entertainment: 'bg-pink-100 text-pink-800',
      shopping: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'dashboard'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('itinerary')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'itinerary'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Itinerary
          </button>
          <button
            onClick={() => setActiveView('budget')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'budget'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Budget
          </button>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>New Trip</span>
        </button>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {trips.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="MapPin" className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Your Adventure
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Create your first trip and begin planning the perfect getaway. Every great journey starts with a single step!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Create Your First Trip</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  className="card overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary via-blue-600 to-secondary">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-semibold text-lg mb-1">{trip.name}</h4>
                      <p className="text-sm opacity-90">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="w-8 h-8 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trip.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        {trip.destinations?.length || 0} destinations
                      </span>
                      <span className="text-sm font-medium text-secondary">
                        Planning in progress
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTrip(trip)
                          setActiveView('itinerary')
                        }}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                      >
                        View Itinerary
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTrip(trip)
                          setActiveView('budget')
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                      >
                        Budget
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Itinerary View */}
      {activeView === 'itinerary' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {selectedTrip ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTrip.name}</h3>
                  <p className="text-gray-600">
                    {formatDate(selectedTrip.startDate)} - {formatDate(selectedTrip.endDate)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowActivityModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Activity</span>
                  </button>
                  <button
                    onClick={() => toast.info('Trip sharing coming in next update')}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <ApperIcon name="Share2" className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {activities.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    No activities planned yet
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Start building your itinerary by adding activities
                  </p>
                  <button
                    onClick={() => setShowActivityModal(true)}
                    className="btn-primary"
                  >
                    Add Your First Activity
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className="card p-4 cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={() => handleDragStart(activity)}
                      onDragEnd={handleDragEnd}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${getCategoryColor(activity.category)} flex items-center justify-center`}>
                            <ApperIcon name={getCategoryIcon(activity.category)} className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{activity.title}</h5>
                            <p className="text-sm text-gray-600">
                              {activity.startTime && activity.endTime ? 
                                `${activity.startTime} - ${activity.endTime}` : 
                                'Time not set'
                              }
                            </p>
                            {activity.location && (
                              <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                                <ApperIcon name="MapPin" className="w-3 h-3" />
                                <span>{activity.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                            {activity.category}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <ApperIcon name="MoreVertical" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {activity.notes && (
                        <p className="mt-3 text-sm text-gray-600 pl-16">
                          {activity.notes}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Select a trip to view itinerary
              </h4>
              <p className="text-gray-600">
                Choose a trip from the dashboard to start planning your activities
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Budget View */}
      {activeView === 'budget' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="DollarSign" className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Budget Tracking Coming Soon
            </h4>
            <p className="text-gray-600 max-w-md mx-auto">
              We're building an amazing budget tracking system to help you manage your travel expenses efficiently.
            </p>
          </div>
        </motion.div>
      )}

      {/* Create Trip Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Trip</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTrip} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Name *
                  </label>
                  <input
                    type="text"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Enter trip name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newTrip.startDate}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, startDate: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={newTrip.endDate}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, endDate: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTrip.description}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field"
                    rows="3"
                    placeholder="Describe your trip..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {showActivityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowActivityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add Activity</h3>
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Enter activity title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newActivity.startTime}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newActivity.endTime}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, endTime: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newActivity.category}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    <option value="sightseeing">Sightseeing</option>
                    <option value="food">Food & Dining</option>
                    <option value="transport">Transportation</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    className="input-field"
                    rows="3"
                    placeholder="Add any notes..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowActivityModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Add Activity
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature