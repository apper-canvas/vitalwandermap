import React from 'react'

      const Label = ({ htmlFor, children, className = '' }) => {
        return (
          &lt;label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}&gt;
            {children}
          &lt;/label&gt;
        )
      }

      export default Label