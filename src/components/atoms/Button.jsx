import React from 'react'

      const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', icon: Icon, ...props }) => {
        const baseStyles = 'flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
        
        const variants = {
          primary: 'bg-primary hover:bg-primary-dark text-white shadow-md focus:ring-primary',
          secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-300',
          tab: 'px-4 py-2 text-sm font-medium',
          icon: 'p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100',
          danger: 'bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white rounded-full'
        }

        const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`

        return (
          &lt;button type={type} onClick={onClick} className={combinedClassName} {...props}&gt;
            {Icon && &lt;Icon className="w-4 h-4" /&gt;}
            {children}
          &lt;/button&gt;
        )
      }

      export default Button