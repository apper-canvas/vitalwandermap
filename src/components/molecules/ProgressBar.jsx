import React from 'react'
      import Progress from '../atoms/Progress'
      import Text from '../atoms/Text'

      const ProgressBar = ({ label, value, className = '' }) => {
        return (
          &lt;div className={className}&gt;
            &lt;div className="flex items-center justify-between mb-3"&gt;
              &lt;Text type="span" className="text-sm text-gray-600"&gt;
                {label}
              &lt;/Text&gt;
              &lt;Text type="span" className="text-sm font-medium text-secondary"&gt;
                {value}% planned
              &lt;/Text&gt;
            &lt;/div&gt;
            &lt;Progress value={value} /&gt;
          &lt;/div&gt;
        )
      }

      export default ProgressBar