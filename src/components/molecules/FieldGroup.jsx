import React from 'react'
      import Label from '../atoms/Label'
      import Input from '../atoms/Input'
      import Select from '../atoms/Select'

      const FieldGroup = ({ label, type = 'text', value, onChange, placeholder, required = false, options, className = '', ...props }) => {
        return (
          &lt;div className={className}&gt;
            &lt;Label&gt;{label} {required && '*'}&lt;/Label&gt;
            {type === 'select' ? (
              &lt;Select value={value} onChange={onChange} required={required} {...props}&gt;
                {options.map((option) =&gt; (
                  &lt;option key={option.value} value={option.value}&gt;
                    {option.label}
                  &lt;/option&gt;
                ))}
              &lt;/Select&gt;
            ) : (
              &lt;Input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                {...props}
              /&gt;
            )}
          &lt;/div&gt;
        )
      }

      export default FieldGroup