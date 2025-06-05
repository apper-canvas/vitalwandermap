import React from 'react'
      import ApperIcon from '../atoms/ApperIcon'
      import NavItem from '../molecules/NavItem'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const HeaderNav = ({ activeTab, onTabChange }) => {
        return (
          &lt;header className="sticky top-0 z-50 glass-panel border-b border-white/20"&gt;
            &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
              &lt;div className="flex items-center justify-between h-16"&gt;
                &lt;div className="flex items-center space-x-3"&gt;
                  &lt;div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"&gt;
                    &lt;ApperIcon name="Map" className="w-5 h-5 text-white" /&gt;
                  &lt;/div&gt;
                  &lt;Text type="h1" className="text-xl font-bold text-gray-900"&gt;WanderMap&lt;/Text&gt;
                &lt;/div&gt;
                
                &lt;nav className="hidden md:flex items-center space-x-8"&gt;
                  &lt;NavItem name="My Trips" icon="Luggage" onClick={() =&gt; onTabChange('trips')} isActive={activeTab === 'trips'} /&gt;
                  &lt;NavItem name="Maps" icon="MapPin" onClick={() =&gt; onTabChange('maps')} isActive={activeTab === 'maps'} /&gt;
                  &lt;NavItem name="Documents" icon="FileText" onClick={() =&gt; onTabChange('documents')} isActive={activeTab === 'documents'} /&gt;
                  &lt;NavItem name="Packing" icon="Package" onClick={() =&gt; onTabChange('packing')} isActive={activeTab === 'packing'} /&gt;
                &lt;/nav&gt;

                &lt;div className="flex items-center space-x-2"&gt;
                  &lt;Button variant="icon"&gt;
                    &lt;ApperIcon name="Bell" className="w-5 h-5" /&gt;
                  &lt;/Button&gt;
                  &lt;Button variant="icon"&gt;
                    &lt;ApperIcon name="Settings" className="w-5 h-5" /&gt;
                  &lt;/Button&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/header&gt;
        )
      }

      export default HeaderNav