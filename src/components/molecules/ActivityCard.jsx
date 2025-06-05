import React from 'react'
      import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import ApperIcon from '../atoms/ApperIcon'
      import Text from '../atoms/Text'
      import Button from '../atoms/Button'

      const ActivityCard = ({ activity, onDragStart, onDragEnd }) => {
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

        return (
          &lt;Card
            className="p-4 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={() => onDragStart(activity)}
            onDragEnd={onDragEnd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          &gt;
            &lt;div className="flex items-center justify-between"&gt;
              &lt;div className="flex items-center space-x-4"&gt;
                &lt;div className={`w-12 h-12 rounded-lg ${getCategoryColor(activity.category)} flex items-center justify-center`}&gt;
                  &lt;ApperIcon name={getCategoryIcon(activity.category)} className="w-5 h-5" /&gt;
                &lt;/div&gt;
                &lt;div&gt;
                  &lt;Text type="h5" className="font-semibold text-gray-900"&gt;{activity.title}&lt;/Text&gt;
                  &lt;Text type="p" className="text-sm text-gray-600"&gt;
                    {activity.startTime && activity.endTime ? 
                      `${activity.startTime} - ${activity.endTime}` : 
                      'Time not set'
                    }
                  &lt;/Text&gt;
                  {activity.location && (
                    &lt;Text type="p" className="text-sm text-gray-500 flex items-center space-x-1 mt-1"&gt;
                      &lt;ApperIcon name="MapPin" className="w-3 h-3" /&gt;
                      &lt;span&gt;{activity.location}&lt;/span&gt;
                    &lt;/Text&gt;
                  )}
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div className="flex items-center space-x-2"&gt;
                &lt;Text type="span" className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}&gt;
                  {activity.category}
                &lt;/Text&gt;
                &lt;Button variant="icon" onClick={() =&gt; { /* More options */ }}&gt;
                  &lt;ApperIcon name="MoreVertical" className="w-4 h-4" /&gt;
                &lt;/Button&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            {activity.notes && (
              &lt;Text type="p" className="mt-3 text-sm text-gray-600 pl-16"&gt;
                {activity.notes}
              &lt;/Text&gt;
            )}
          &lt;/Card&gt;
        )
      }

      export default ActivityCard