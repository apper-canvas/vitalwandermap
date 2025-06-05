import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import ApperIcon from '../atoms/ApperIcon'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const ModalTemplate = ({ show, onClose, title, children }) => {
        return (
          &lt;AnimatePresence&gt;
            {show && (
              &lt;motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
              &gt;
                &lt;motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
                  onClick={(e) =&gt; e.stopPropagation()}
                &gt;
                  &lt;div className="flex items-center justify-between mb-6"&gt;
                    &lt;Text type="h3" className="text-lg font-semibold text-gray-900"&gt;{title}&lt;/Text&gt;
                    &lt;Button variant="icon" onClick={onClose}&gt;
                      &lt;ApperIcon name="X" className="w-4 h-4" /&gt;
                    &lt;/Button&gt;
                  &lt;/div&gt;
                  {children}
                &lt;/motion.div&gt;
              &lt;/motion.div&gt;
            )}
          &lt;/AnimatePresence&gt;
        )
      }

      export default ModalTemplate