import React, { useState } from 'react'
      import { toast } from 'react-toastify'
      import FieldGroup from '../molecules/FieldGroup'
      import Button from '../atoms/Button'

      const CreateTripForm = ({ onCreateTrip, onCancel }) => {
        const [newTrip, setNewTrip] = useState({
          name: '',
          startDate: '',
          endDate: '',
          description: '',
          coverImage: ''
        })

        const handleSubmit = async (e) => {
          e.preventDefault()
          if (!newTrip.name.trim() || !newTrip.startDate || !newTrip.endDate) {
            toast.error('Please fill in all required fields')
            return
          }
          await onCreateTrip(newTrip)
          setNewTrip({ name: '', startDate: '', endDate: '', description: '', coverImage: '' })
        }

        return (
          &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
            &lt;FieldGroup
              label="Trip Name"
              type="text"
              value={newTrip.name}
              onChange={(e) =&gt; setNewTrip(prev =&gt; ({ ...prev, name: e.target.value }))}
              placeholder="Enter trip name"
              required
            /&gt;

            &lt;div className="grid grid-cols-2 gap-4"&gt;
              &lt;FieldGroup
                label="Start Date"
                type="date"
                value={newTrip.startDate}
                onChange={(e) =&gt; setNewTrip(prev =&gt; ({ ...prev, startDate: e.target.value }))}
                required
              /&gt;
              &lt;FieldGroup
                label="End Date"
                type="date"
                value={newTrip.endDate}
                onChange={(e) =&gt; setNewTrip(prev =&gt; ({ ...prev, endDate: e.target.value }))}
                required
              /&gt;
            &lt;/div&gt;

            &lt;FieldGroup
              label="Description"
              type="textarea"
              value={newTrip.description}
              onChange={(e) =&gt; setNewTrip(prev =&gt; ({ ...prev, description: e.target.value }))}
              rows="3"
              placeholder="Describe your trip..."
            /&gt;

            &lt;div className="flex space-x-3 pt-4"&gt;
              &lt;Button type="button" onClick={onCancel} variant="secondary" className="flex-1 px-4 py-2"&gt;
                Cancel
              &lt;/Button&gt;
              &lt;Button type="submit" className="flex-1"&gt;
                Create Trip
              &lt;/Button&gt;
            &lt;/div&gt;
          &lt;/form&gt;
        )
      }

      export default CreateTripForm