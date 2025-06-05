import React from 'react'
      import Button from '../atoms/Button'

      const ButtonGroup = ({ buttons, activeTab, onTabChange, className = '' }) => {
        return (
          &lt;div className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}&gt;
            {buttons.map((btn) =&gt; (
              &lt;Button
                key={btn.id}
                onClick={() =&gt; onTabChange(btn.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === btn.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              &gt;
                {btn.label}
              &lt;/Button&gt;
            ))}
          &lt;/div&gt;
        )
      }

      export default ButtonGroup