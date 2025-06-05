import React from 'react'
      import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const ItinerarySection = () =&gt; {
        return (
          &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          &gt;
            &lt;div className="text-center py-16"&gt;
              &lt;ApperIcon name="Calendar" className="w-16 h-16 text-gray-400 mx-auto mb-4" /&gt;
              &lt;Text type="h4" className="text-lg font-semibold text-gray-900 mb-2"&gt;
                Select a trip to view itinerary
              &lt;/Text&gt;
              &lt;Text type="p" className="text-gray-600"&gt;
                Choose a trip from the dashboard to start planning your activities
              &lt;/Text&gt;
            &lt;/div&gt;
          &lt;/motion.div&gt;
        )
      }

      export default ItinerarySection