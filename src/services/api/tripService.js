import tripData from '../mockData/trip.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let trips = [...tripData]

const tripService = {
  async getAll() {
    await delay(300)
    return [...trips]
  },

  async getById(id) {
    await delay(200)
    const trip = trips.find(t => t.id === id)
    return trip ? { ...trip } : null
  },

  async create(tripItem) {
    await delay(400)
    const newTrip = {
      ...tripItem,
      id: Date.now().toString(),
      destinations: tripItem.destinations || [],
      budget: tripItem.budget || null
    }
    trips.push(newTrip)
    return { ...newTrip }
  },

  async update(id, data) {
    await delay(350)
    const index = trips.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Trip not found')
    
    trips[index] = { ...trips[index], ...data }
    return { ...trips[index] }
  },

  async delete(id) {
    await delay(250)
    const index = trips.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Trip not found')
    
    trips.splice(index, 1)
    return true
  }
}

export default tripService