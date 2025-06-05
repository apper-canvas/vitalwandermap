import React, { useState } from 'react'
      import { toast } from 'react-toastify'
      import FieldGroup from '../molecules/FieldGroup'
      import Button from '../atoms/Button'

      const AddActivityForm = ({ onAddActivity, onCancel }) => {
        const [newActivity, setNewActivity] = useState({
          title: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
          notes: '',
          category: 'sightseeing'
        })

        const handleSubmit = async (e) => {
          e.preventDefault()
          if (!newActivity.title.trim() || !newActivity.date) {
            toast.error('Please fill in required fields')
            return
          }
          await onAddActivity(newActivity)
          setNewActivity({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            notes: '',
            category: 'sightseeing'
          })
        }

        const activityCategories = [
          { value: 'sightseeing', label: 'Sightseeing' },
          { value: 'food', label: 'Food & Dining' },
          { value: 'transport', label: 'Transportation' },
          { value: 'accommodation', label: 'Accommodation' },
          { value: 'entertainment', label: 'Entertainment' },
          { value: 'shopping', label: 'Shopping' },
          { value: 'other', label: 'Other' }
        ]

        return (
          &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
            &lt;FieldGroup
              label="Activity Title"
              type="text"
              value={newActivity.title}
              onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, title: e.target.value }))}
              placeholder="Enter activity title"
              required
            /&gt;

            &lt;FieldGroup
              label="Date"
              type="date"
              value={newActivity.date}
              onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, date: e.target.value }))}
              required
            /&gt;

            &lt;div className="grid grid-cols-2 gap-4"&gt;
              &lt;FieldGroup
                label="Start Time"
                type="time"
                value={newActivity.startTime}
                onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, startTime: e.target.value }))}
              /&gt;
              &lt;FieldGroup
                label="End Time"
                type="time"
                value={newActivity.endTime}
                onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, endTime: e.target.value }))}
              /&gt;
            &lt;/div&gt;

            &lt;FieldGroup
              label="Location"
              type="text"
              value={newActivity.location}
              onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, location: e.target.value }))}
              placeholder="Enter location"
            /&gt;

            &lt;FieldGroup
              label="Category"
              type="select"
              value={newActivity.category}
              onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, category: e.target.value }))}
              options={activityCategories}
            /&gt;

            &lt;FieldGroup
              label="Notes"
              type="textarea"
              value={newActivity.notes}
              onChange={(e) =&gt; setNewActivity(prev =&gt; ({ ...prev, notes: e.target.value }))}
              rows="3"
              placeholder="Add any notes..."
            /&gt;

            &lt;div className="flex space-x-3 pt-4"&gt;
              &lt;Button type="button" onClick={onCancel} variant="secondary" className="flex-1 px-4 py-2"&gt;
                Cancel
              &lt;/Button&gt;
              &lt;Button type="submit" className="flex-1"&gt;
                Add Activity
              &lt;/Button&gt;
            &lt;/div&gt;
          &lt;/form&gt;
        )
      }

      export default AddActivityForm