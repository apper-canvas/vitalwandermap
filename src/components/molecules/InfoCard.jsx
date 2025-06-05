import React from 'react'
      import Card from '../atoms/Card'
      import CardHeader from './CardHeader'

      const InfoCard = ({ title, value, iconName, iconBgColor, iconTextColor }) => {
        return (
          &lt;Card className="p-6"&gt;
            &lt;CardHeader
              title={title}
              value={value}
              iconName={iconName}
              iconClassName={`${iconBgColor} ${iconTextColor}`}
            /&gt;
          &lt;/Card&gt;
        )
      }

      export default InfoCard