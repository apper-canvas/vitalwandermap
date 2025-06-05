import React from 'react'
      import { toast } from 'react-toastify'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import HeaderNav from '../organisms/HeaderNav'
      import FooterNav from '../organisms/FooterNav'

      const HomeTemplate = ({ activeTab, onTabChange, children }) => {
        return (
          &lt;div className="min-h-screen"&gt;
            &lt;HeaderNav activeTab={activeTab} onTabChange={onTabChange} /&gt;

            &lt;main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"&gt;
              {children}
            &lt;/main&gt;

            &lt;div className="fixed bottom-6 right-6 flex flex-col space-y-3"&gt;
              &lt;Button 
                className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 flex items-center justify-center bg-accent hover:bg-amber-600 text-white"
                onClick={() =&gt; toast.info('Currency converter launching soon!')}
              &gt;
                &lt;ApperIcon name="DollarSign" className="w-5 h-5" /&gt;
              &lt;/Button&gt;
              
              &lt;Button 
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white"
                onClick={() =&gt; onTabChange('trips')} // Or open a 'create new trip' modal
              &gt;
                &lt;ApperIcon name="Plus" className="w-6 h-6" /&gt;
              &lt;/Button&gt;
            &lt;/div&gt;

            &lt;FooterNav /&gt;
          &lt;/div&gt;
        )
      }

      export default HomeTemplate