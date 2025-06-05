import activityData from '../mockData/activity.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activityData]

const activityService = {
  async getAll() {
    await delay(300)
    return [...activities]
  },

  async getById(id) {
    await delay(200)
    const activity = activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  },

  async create(activityItem) {
    await delay(400)
    const newActivity = {
      ...activityItem,
      id: Date.now().toString()
    }
    activities.push(newActivity)
    return { ...newActivity }
  },

  async update(id, data) {
    await delay(350)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    activities[index] = { ...activities[index], ...data }
    return { ...activities[index] }
  },

  async delete(id) {
    await delay(250)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    activities.splice(index, 1)
    return true
  }
}

export default activityService