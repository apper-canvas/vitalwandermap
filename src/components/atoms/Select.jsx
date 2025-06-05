import React from 'react'

      const Select = ({ children, value, onChange, className = '', ...props }) => {
        const baseStyles = 'block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200'
        const combinedClassName = `${baseStyles} ${className}`

        return (
          &lt;select
            value={value}
            onChange={onChange}
            className={combinedClassName}
            {...props}
          &gt;
            {children}
          &lt;/select&gt;
        )
      }

      export default Select