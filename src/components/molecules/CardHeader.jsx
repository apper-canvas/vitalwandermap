import React from 'react'
      import ApperIcon from '../atoms/ApperIcon'
      import Text from '../atoms/Text'

      const CardHeader = ({ iconName, iconClassName, title, value, unit, className = '' }) => {
        return (
          &lt;div className={`flex items-center justify-between ${className}`}&gt;
            &lt;div&gt;
              &lt;Text type="p" className="text-sm font-medium text-gray-600"&gt;{title}&lt;/Text&gt;
              &lt;Text type="p" className="text-2xl font-bold text-gray-900"&gt;{value}{unit}&lt;/Text&gt;
            &lt;/div&gt;
            &lt;div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ${iconClassName}`}&gt;
              &lt;ApperIcon name={iconName} className="w-6 h-6 text-primary" /&gt;
            &lt;/div&gt;
          &lt;/div&gt>
        )
      }

      export default CardHeader