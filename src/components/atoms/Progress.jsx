import React from 'react'

      const Progress = ({ value, max = 100, className = '', barClassName = '' }) => {
        const progress = Math.min(Math.max(value, 0), max)
        return (
          &lt;div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}&gt;
            &lt;div
              className={`bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300 ${barClassName}`}
              style={{ width: `${progress}%` }}
            &gt;&lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default Progress