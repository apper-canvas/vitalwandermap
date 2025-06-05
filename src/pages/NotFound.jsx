import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-md mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ApperIcon name="MapPin" className="w-12 h-12 text-white" />
          </div>
          
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Oops! You've wandered off the map
            </h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist. Let's get you back on track to plan your next adventure.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                My Trips
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Help Center
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound