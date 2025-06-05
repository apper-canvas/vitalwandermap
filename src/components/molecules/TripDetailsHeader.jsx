import React from 'react'
      import Button from '../atoms/Button'
      import ApperIcon from '../atoms/ApperIcon'
      import Text from '../atoms/Text'

      const TripDetailsHeader = ({ tripName, tripDates, onAddActivity, onShareTrip }) => {
        return (
          &lt;div className="flex items-center justify-between mb-6"&gt;
            &lt;div&gt;
              &lt;Text type="h3" className="text-2xl font-bold text-gray-900"&gt;{tripName}&lt;/Text&gt;
              &lt;Text type="p" className="text-gray-600"&gt;{tripDates}&lt;/Text&gt;
            &lt;/div&gt;
            &lt;div className="flex space-x-2"&gt;
              {onAddActivity && (
                &lt;Button onClick={onAddActivity} icon={() =&gt; &lt;ApperIcon name="Plus" className="w-4 h-4" /&gt;}&gt;
                  Add Activity
                &lt;/Button&gt;
              )}
              {onShareTrip && (
                &lt;Button variant="secondary" onClick={onShareTrip} icon={() =&gt; &lt;ApperIcon name="Share2" className="w-4 h-4" /&gt;}&gt;
                  Share
                &lt;/Button&gt;
              )}
            &lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default TripDetailsHeader