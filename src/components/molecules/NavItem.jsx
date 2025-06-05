import React from 'react'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const NavItem = ({ name, icon, onClick, isActive }) => {
        return (
          &lt;Button
            onClick={onClick}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            variant="tab"
            icon={() =&gt; &lt;ApperIcon name={icon} className="w-4 h-4" /&gt;}
          &gt;
            &lt;Text type="span" className="font-medium"&gt;{name}&lt;/Text&gt;
          &lt;/Button&gt;
        )
      }

      export default NavItem