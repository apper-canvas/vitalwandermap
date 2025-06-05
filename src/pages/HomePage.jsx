import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import tripService from '../services/api/tripService'
import HomeTemplate from '../components/templates/HomeTemplate'
import FeatureSection from '../components/organisms/FeatureSection'
import DashboardSummary from '../components/organisms/DashboardSummary'
import RecentTripsGrid from '../components/organisms/RecentTripsGrid'
import PlaceholderSection from '../components/organisms/PlaceholderSection'
import TripDashboard from '../components/organisms/TripDashboard'

const HomePage = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('trips')

  const loadTrips = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    loadTrips()
  }, [loadTrips])

  const handleTripUpdate = async () => {
    await loadTrips()
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

  return (
    <HomeTemplate activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'trips' && (
        <TripDashboard>
          <FeatureSection 
            trips={trips} 
            onUpdate={handleTripUpdate} 
            loading={loading}
            formatDate={formatDate}
            calculateProgress={calculateProgress}
          />
          {trips.length > 0 && (
            <>
              <DashboardSummary trips={trips} />
              <RecentTripsGrid 
                trips={trips} 
                formatDate={formatDate} 
                calculateProgress={calculateProgress} 
              />
            </>
          )}
        </TripDashboard>
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
          title="Smart Packing Lists"
          message="Smart packing lists coming soon! We'll help you pack perfectly for every destination and weather condition."
          icon="Package"
        />
      )}
    </HomeTemplate>
  )
}

export default HomePage