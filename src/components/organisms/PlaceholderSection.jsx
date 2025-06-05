import React from 'react'
      import ApperIcon from '../atoms/ApperIcon'
      import Text from '../atoms/Text'

      const PlaceholderSection = ({ title, message, icon }) => {
        return (
          &lt;div className="text-center py-16"&gt;
            &lt;div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-6"&gt;
              &lt;ApperIcon name={icon} className="w-8 h-8 text-primary" /&gt;
            &lt;/div&gt;
            &lt;Text type="h3" className="text-xl font-semibold text-gray-900 mb-2"&gt;{title}&lt;/Text&gt;
            &lt;Text type="p" className="text-gray-600 max-w-md mx-auto"&gt;{message}&lt;/Text&gt;
          &lt;/div&gt;
        )
      }

      export default PlaceholderSection