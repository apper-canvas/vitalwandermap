import React from 'react'
      import InfoCard from '../molecules/InfoCard'

      const DashboardSummary = ({ trips }) => {
        const totalDestinations = trips.reduce((acc, trip) =&gt; acc + (trip.destinations?.length || 0), 0)
        const tripsThisMonth = trips.filter(trip =&gt; {
          const tripDate = new Date(trip.startDate)
          const now = new Date()
          return tripDate.getMonth() === now.getMonth() && 
                 tripDate.getFullYear() === now.getFullYear()
        }).length

        return (
          &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"&gt;
            &lt;InfoCard 
              title="Total Trips" 
              value={trips.length} 
              iconName="Map" 
              iconBgColor="bg-primary/10" 
              iconTextColor="text-primary" 
            /&gt;
            &lt;InfoCard 
              title="Destinations" 
              value={totalDestinations} 
              iconName="MapPin" 
              iconBgColor="bg-secondary/10" 
              iconTextColor="text-secondary" 
            /&gt;
            &lt;InfoCard 
              title="This Month" 
              value={tripsThisMonth} 
              iconName="Calendar" 
              iconBgColor="bg-accent/10" 
              iconTextColor="text-accent" 
            /&gt;
          &lt;/div&gt;
        )
      }

      export default DashboardSummary