import React from 'react'
      import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import ApperIcon from '../atoms/ApperIcon'
      import Text from '../atoms/Text'
      import ProgressBar from '../molecules/ProgressBar'
      import Button from '../atoms/Button'

      const RecentTripsGrid = ({ trips, formatDate, calculateProgress }) => {
        return (
          &lt;div className="mt-12"&gt;
            &lt;Text type="h3" className="text-xl font-semibold text-gray-900 mb-6"&gt;Your Recent Trips&lt;/Text&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
              {trips.slice(0, 6).map((trip) =&gt; (
                &lt;Card
                  key={trip.id}
                  className="overflow-hidden group cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                &gt;
                  &lt;div className="relative h-48 bg-gradient-to-br from-primary to-secondary"&gt;
                    &lt;div className="absolute inset-0 bg-black/20"&gt;&lt;/div&gt;
                    &lt;div className="absolute bottom-4 left-4 text-white"&gt;
                      &lt;Text type="h4" className="font-semibold text-lg"&gt;{trip.name}&lt;/Text&gt;
                      &lt;Text type="p" className="text-sm opacity-90"&gt;
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      &lt;/Text&gt;
                    &lt;/div&gt;
                    &lt;div className="absolute top-4 right-4"&gt;
                      &lt;div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"&gt;
                        &lt;ApperIcon name="Heart" className="w-4 h-4 text-white" /&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                  
                  &lt;div className="p-4"&gt;
                    &lt;ProgressBar label={`${trip.destinations?.length || 0} destinations`} value={calculateProgress(trip)} className="mb-4" /&gt;
                    
                    &lt;div className="flex items-center justify-between"&gt;
                      &lt;Button variant="ghost" className="text-primary hover:text-primary-dark" icon={() =&gt; &lt;ApperIcon name="Eye" className="w-4 h-4" /&gt;}&gt;
                        &lt;Text type="span" className="text-sm font-medium"&gt;View&lt;/Text&gt;
                      &lt;/Button&gt;
                      &lt;Button variant="ghost" className="text-gray-600 hover:text-gray-900" icon={() =&gt; &lt;ApperIcon name="Edit" className="w-4 h-4" /&gt;}&gt;
                        &lt;Text type="span" className="text-sm font-medium"&gt;Edit&lt;/Text&gt;
                      &lt;/Button&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                &lt;/Card&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default RecentTripsGrid