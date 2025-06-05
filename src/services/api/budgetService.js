import budgetData from '../mockData/budget.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let budgets = [...budgetData]

const budgetService = {
  async getAll() {
    await delay(300)
    return [...budgets]
  },

  async getById(id) {
    await delay(200)
    const budget = budgets.find(b => b.id === id)
    return budget ? { ...budget } : null
  },

  async create(budgetItem) {
    await delay(400)
    const newBudget = {
      ...budgetItem,
      id: Date.now().toString(),
      expenses: budgetItem.expenses || []
    }
    budgets.push(newBudget)
    return { ...newBudget }
  },

  async update(id, data) {
    await delay(350)
    const index = budgets.findIndex(b => b.id === id)
    if (index === -1) throw new Error('Budget not found')
    
    budgets[index] = { ...budgets[index], ...data }
    return { ...budgets[index] }
  },

  async delete(id) {
    await delay(250)
    const index = budgets.findIndex(b => b.id === id)
    if (index === -1) throw new Error('Budget not found')
    
    budgets.splice(index, 1)
    return true
  }
}

export default budgetService