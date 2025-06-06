import React from 'react'
import InfoCard from '../molecules/InfoCard'

const DashboardSummary = ({ trips }) => {
  const totalDestinations = trips.reduce((acc, trip) => acc + (trip.destinations?.length || 0), 0)
  const tripsThisMonth = trips.filter(trip => {
    const tripDate = new Date(trip.startDate)
    const now = new Date()
    return tripDate.getMonth() === now.getMonth() && 
           tripDate.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <InfoCard 
        title="Total Trips" 
        value={trips.length} 
        iconName="Map" 
        iconBgColor="bg-primary/10" 
        iconTextColor="text-primary" 
      />
      <InfoCard 
        title="Destinations" 
        value={totalDestinations} 
        iconName="MapPin" 
        iconBgColor="bg-secondary/10" 
        iconTextColor="text-secondary" 
      />
      <InfoCard 
        title="This Month" 
        value={tripsThisMonth} 
        iconName="Calendar" 
        iconBgColor="bg-accent/10" 
        iconTextColor="text-accent" 
      />
    </div>
  )
}

export default DashboardSummary