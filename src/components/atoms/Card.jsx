import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', onClick, whileHover, whileTap, draggable, onDragStart, onDragEnd, ...props }) => {
        const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-100'
        const combinedClassName = `${baseStyles} ${className}`

        if (whileHover || whileTap || draggable) {
          return (
            &lt;motion.div
              className={combinedClassName}
              onClick={onClick}
              whileHover={whileHover}
              whileTap={whileTap}
              draggable={draggable}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              {...props}
            &gt;
              {children}
            &lt;/motion.div&gt;
          )
        }

        return (
          &lt;div className={combinedClassName} onClick={onClick} {...props}&gt;
            {children}
          &lt;/div&gt;
        )
      }

      export default Card