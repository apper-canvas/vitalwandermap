import React from 'react'

      const Text = ({ children, type, className = '', ...props }) => {
        const baseStyles = ''
        let Tag = 'span'

        switch (type) {
          case 'h1':
            Tag = 'h1'
            break
          case 'h2':
            Tag = 'h2'
            break
          case 'h3':
            Tag = 'h3'
            break
          case 'h4':
            Tag = 'h4'
            break
          case 'h5':
            Tag = 'h5'
            break
          case 'p':
            Tag = 'p'
            break
          case 'span':
            Tag = 'span'
            break
          default:
            Tag = 'span'
        }

        const combinedClassName = `${baseStyles} ${className}`

        return (
          &lt;Tag className={combinedClassName} {...props}&gt;
            {children}
          &lt;/Tag&gt;
        )
      }

      export default Text