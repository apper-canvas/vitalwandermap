import React from 'react'
      import {
        Map, MapPin, Plus, Luggage, FileText, Package, Bell, Settings,
        X, Smartphone, DollarSign, Camera, Utensils, Car, Bed, Music,
        ShoppingBag, MoreVertical, Trash2, Calendar, Eye, Edit, Heart,
        Share2
      } from 'lucide-react'

      const iconComponents = {
        Map, MapPin, Plus, Luggage, FileText, Package, Bell, Settings,
        X, Smartphone, DollarSign, Camera, Utensils, Car, Bed, Music,
        ShoppingBag, MoreVertical, Trash2, Calendar, Eye, Edit, Heart,
        Share2
      }

      const ApperIcon = ({ name, className }) => {
        const IconComponent = iconComponents[name]
        if (!IconComponent) {
          console.warn(`Icon "${name}" not found.`)
          return null
        }
        return &lt;IconComponent className={className} /&gt;
      }

      export default ApperIcon