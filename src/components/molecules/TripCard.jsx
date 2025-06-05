import React from 'react'
      import Card from '../atoms/Card'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'
      import ProgressBar from './ProgressBar'

      const TripCard = ({ trip, formatDate, calculateProgress, onDelete, onViewItinerary, onViewBudget }) => {
        return (
          &lt;Card
            className="overflow-hidden group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          &gt;
            &lt;div className="relative h-48 bg-gradient-to-br from-primary via-blue-600 to-secondary"&gt;
              &lt;div className="absolute inset-0 bg-black/20"&gt;&lt;/div&gt;
              &lt;div className="absolute bottom-4 left-4 text-white"&gt;
                &lt;Text type="h4" className="font-semibold text-lg mb-1"&gt;{trip.name}&lt;/Text&gt;
                &lt;Text type="p" className="text-sm opacity-90"&gt;
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                &lt;/Text&gt;
              &lt;/div&gt;
              &lt;div className="absolute top-4 right-4 flex space-x-2"&gt;
                {onDelete && (
                  &lt;Button variant="danger" onClick={() =&gt; onDelete(trip.id)} className="w-8 h-8 rounded-full"&gt;
                    &lt;ApperIcon name="Trash2" className="w-4 h-4 text-white" /&gt;
                  &lt;/Button&gt;
                )}
              &lt;/div&gt;
            &lt;/div&gt;
            
            &lt;div className="p-4"&gt;
              &lt;Text type="p" className="text-gray-600 text-sm mb-4 line-clamp-2"&gt;
                {trip.description || 'No description available'}
              &lt;/Text&gt;
              
              &lt;ProgressBar label={`${trip.destinations?.length || 0} destinations`} value={calculateProgress(trip)} className="mb-4" /&gt;
              
              &lt;div className="flex items-center space-x-2"&gt;
                {onViewItinerary && (
                  &lt;Button onClick={() =&gt; onViewItinerary(trip)} className="flex-1 text-sm font-medium py-2 px-3"&gt;
                    View Itinerary
                  &lt;/Button&gt;
                )}
                {onViewBudget && (
                  &lt;Button variant="secondary" onClick={() =&gt; onViewBudget(trip)} className="flex-1 text-sm font-medium py-2 px-3"&gt;
                    Budget
                  &lt;/Button&gt;
                )}
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/Card&gt;
        )
      }

      export default TripCard