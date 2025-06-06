import React from 'react'
import { motion } from 'framer-motion'
import Text from '../atoms/Text'

const TripDashboard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <Text type="h2" className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Explorer! ✈️
        </Text>
        <Text type="p" className="text-gray-600">
          Plan your next adventure or continue organizing your current trips
        </Text>
      </div>
      {children}
    </motion.div>
  )
}

export default TripDashboard