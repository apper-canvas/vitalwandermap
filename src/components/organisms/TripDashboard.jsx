import React from 'react'
      import { motion } from 'framer-motion'
      import Text from '../atoms/Text'

      const TripDashboard = ({ children }) =&gt; {
        return (
          &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          &gt;
            &lt;div className="mb-8"&gt;
              &lt;Text type="h2" className="text-3xl font-bold text-gray-900 mb-2"&gt;
                Welcome back, Explorer! ✈️
              &lt;/Text&gt;
              &lt;Text type="p" className="text-gray-600"&gt;
                Plan your next adventure or continue organizing your current trips
              &lt;/Text&gt;
            &lt;/div&gt;
            {children}
          &lt;/motion.div&gt;
        )
      }

      export default TripDashboard