import React, { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import ButtonGroup from '../molecules/ButtonGroup'
      import TripCard from '../molecules/TripCard'
      import TripDetailsHeader from '../molecules/TripDetailsHeader'
      import ActivityCard from '../molecules/ActivityCard'
      import CreateTripForm from './CreateTripForm'
      import AddActivityForm from './AddActivityForm'
      import ModalTemplate from '../templates/ModalTemplate'

      // Services - Should be passed as props or managed by a higher-level context
      import tripService from '../../services/api/tripService'
      import destinationService from '../../services/api/destinationService'
      import activityService from '../../services/api/activityService'
      import budgetService from '../../services/api/budgetService'
      import Text from '../atoms/Text'

      const FeatureSection = ({ trips, onUpdate, loading, formatDate, calculateProgress }) => {
        const [activeView, setActiveView] = useState('dashboard')
        const [selectedTrip, setSelectedTrip] = useState(null)
        const [showCreateModal, setShowCreateModal] = useState(false)
        const [showActivityModal, setShowActivityModal] = useState(false)
        const [allActivities, setAllActivities] = useState([]) // All activities, not just for selected trip
        const [budgets, setBudgets] = useState([]) // Assuming this is needed for Budget view

        useEffect(() => {
          const loadAllActivities = async () => {
            try {
              const result = await activityService.getAll()
              setAllActivities(result || [])
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
          loadAllActivities()
          loadBudgets()
        }, [])

        const handleCreateTrip = async (tripData) => {
          try {
            const newTripPayload = {
              ...tripData,
              destinations: [],
              budget: null
            }
            await tripService.create(newTripPayload)
            toast.success('Trip created successfully!')
            setShowCreateModal(false)
            onUpdate() // Refresh trips in Home component
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

        const handleAddActivity = async (activityData) => {
          try {
            await activityService.create(activityData)
            toast.success('Activity added successfully!')
            setShowActivityModal(false)
            setAllActivities(prev =&gt; [...prev, activityData]) // Optimistic update or refetch
          } catch (err) {
            toast.error('Failed to add activity')
          }
        }

        const handleDragStart = (activity) => {
          // You might store the dragged activity in state if needed for drop handling
          // For now, it's illustrative
          console.log('Dragging:', activity.title)
        }

        const handleDragEnd = () =&gt; {
          console.log('Drag ended')
        }

        const currentTripActivities = selectedTrip
          ? allActivities.filter(activity =&gt; 
              selectedTrip.destinations?.some(dest =&gt; 
                dest.activities?.includes(activity.id)
              )
            )
          : []

        const featureTabs = [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'itinerary', label: 'Itinerary' },
          { id: 'budget', label: 'Budget' }
        ]

        if (loading) {
          return (
            &lt;div className="flex items-center justify-center py-12"&gt;
              &lt;div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"&gt;&lt;/div&gt;
            &lt;/div&gt;
          )
        }

        return (
          &lt;div className="space-y-6"&gt;
            &lt;div className="flex items-center justify-between"&gt;
              &lt;ButtonGroup 
                buttons={featureTabs} 
                activeTab={activeView} 
                onTabChange={setActiveView} 
              /&gt;

              &lt;Button onClick={() =&gt; setShowCreateModal(true)} icon={() =&gt; &lt;ApperIcon name="Plus" className="w-4 h-4" /&gt;}&gt;
                New Trip
              &lt;/Button&gt;
            &lt;/div&gt;

            {activeView === 'dashboard' && (
              &lt;motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              &gt;
                {trips.length === 0 ? (
                  &lt;div className="text-center py-16"&gt;
                    &lt;div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6"&gt;
                      &lt;ApperIcon name="MapPin" className="w-12 h-12 text-primary" /&gt;
                    &lt;/div&gt;
                    &lt;Text type="h3" className="text-xl font-semibold text-gray-900 mb-2"&gt;
                      Start Your Adventure
                    &lt;/Text&gt;
                    &lt;Text type="p" className="text-gray-600 mb-8 max-w-md mx-auto"&gt;
                      Create your first trip and begin planning the perfect getaway. Every great journey starts with a single step!
                    &lt;/Text&gt;
                    &lt;Button onClick={() =&gt; setShowCreateModal(true)} icon={() =&gt; &lt;ApperIcon name="Plus" className="w-4 h-4" /&gt;} className="mx-auto"&gt;
                      Create Your First Trip
                    &lt;/Button&gt;
                  &lt;/div&gt;
                ) : (
                  &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                    {trips.map((trip) =&gt; (
                      &lt;TripCard
                        key={trip.id}
                        trip={trip}
                        formatDate={formatDate}
                        calculateProgress={calculateProgress}
                        onDelete={handleDeleteTrip}
                        onViewItinerary={(trip) =&gt; { setSelectedTrip(trip); setActiveView('itinerary') }}
                        onViewBudget={(trip) =&gt; { setSelectedTrip(trip); setActiveView('budget') }}
                      /&gt;
                    ))}
                  &lt;/div&gt;
                )}
              &lt;/motion.div&gt;
            )}

            {activeView === 'itinerary' && (
              &lt;motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              &gt;
                {selectedTrip ? (
                  &lt;div&gt;
                    &lt;TripDetailsHeader
                      tripName={selectedTrip.name}
                      tripDates={`${formatDate(selectedTrip.startDate)} - ${formatDate(selectedTrip.endDate)}`}
                      onAddActivity={() =&gt; setShowActivityModal(true)}
                      onShareTrip={() =&gt; toast.info('Trip sharing coming in next update')}
                    /&gt;

                    {currentTripActivities.length === 0 ? (
                      &lt;div className="text-center py-16 bg-gray-50 rounded-xl"&gt;
                        &lt;ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" /&gt;
                        &lt;Text type="h4" className="text-lg font-semibold text-gray-900 mb-2"&gt;
                          No activities planned yet
                        &lt;/Text&gt;
                        &lt;Text type="p" className="text-gray-600 mb-6"&gt;
                          Start building your itinerary by adding activities
                        &lt;/Text&gt;
                        &lt;Button onClick={() =&gt; setShowActivityModal(true)}&gt;
                          Add Your First Activity
                        &lt;/Button&gt;
                      &lt;/div&gt;
                    ) : (
                      &lt;div className="space-y-4"&gt;
                        {currentTripActivities.map((activity) =&gt; (
                          &lt;ActivityCard
                            key={activity.id}
                            activity={activity}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                          /&gt;
                        ))}
                      &lt;/div&gt;
                    )}
                  &lt;/div&gt;
                ) : (
                  &lt;div className="text-center py-16"&gt;
                    &lt;ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" /&gt;
                    &lt;Text type="h4" className="text-lg font-semibold text-gray-900 mb-2"&gt;
                      Select a trip to view itinerary
                    &lt;/Text&gt;
                    &lt;Text type="p" className="text-gray-600"&gt;
                      Choose a trip from the dashboard to start planning your activities
                    &lt;/Text&gt;
                  &lt;/div&gt;
                )}
              &lt;/motion.div&gt;
            )}

            {activeView === 'budget' && (
              &lt;motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              &gt;
                &lt;div className="text-center py-16"&gt;
                  &lt;div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"&gt;
                    &lt;ApperIcon name="DollarSign" className="w-8 h-8 text-accent" /&gt;
                  &lt;/div&gt;
                  &lt;Text type="h4" className="text-lg font-semibold text-gray-900 mb-2"&gt;
                    Budget Tracking Coming Soon
                  &lt;/Text&gt;
                  &lt;Text type="p" className="text-gray-600 max-w-md mx-auto"&gt;
                    We're building an amazing budget tracking system to help you manage your travel expenses efficiently.
                  &lt;/Text&gt;
                &lt;/div&gt;
              &lt;/motion.div&gt;
            )}

            &lt;ModalTemplate show={showCreateModal} onClose={() =&gt; setShowCreateModal(false)} title="Create New Trip"&gt;
              &lt;CreateTripForm onCreateTrip={handleCreateTrip} onCancel={() =&gt; setShowCreateModal(false)} /&gt;
            &lt;/ModalTemplate&gt;

            &lt;ModalTemplate show={showActivityModal} onClose={() =&gt; setShowActivityModal(false)} title="Add Activity"&gt;
              &lt;AddActivityForm onAddActivity={handleAddActivity} onCancel={() =&gt; setShowActivityModal(false)} /&gt;
            &lt;/ModalTemplate&gt;
          &lt;/div&gt;
        )
      }

      export default FeatureSection