import React from 'react'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const FooterNav = () => {
        return (
          &lt;div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white p-4 md:hidden"&gt;
            &lt;div className="flex items-center justify-between"&gt;
              &lt;div className="flex items-center space-x-3"&gt;
                &lt;ApperIcon name="Smartphone" className="w-5 h-5" /&gt;
                &lt;Text type="span" className="text-sm font-medium"&gt;Offline mode available in our upcoming mobile app!&lt;/Text&gt;
              &lt;/div&gt;
              &lt;Button variant="icon" className="text-white/80 hover:text-white"&gt;
                &lt;ApperIcon name="X" className="w-4 h-4" /&gt;
              &lt;/Button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default FooterNav