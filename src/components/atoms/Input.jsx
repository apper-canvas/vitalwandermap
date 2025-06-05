import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', required = false, ...props }) => {
        const baseStyles = 'block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200'
        const combinedClassName = `${baseStyles} ${className}`

        if (type === 'textarea') {
          return (
            &lt;textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={combinedClassName}
              required={required}
              {...props}
            /&gt;
          )
        }

        return (
          &lt;input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={combinedClassName}
            required={required}
            {...props}
          /&gt;
        )
      }

      export default Input