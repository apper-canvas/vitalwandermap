import expenseData from '../mockData/expense.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let expenses = [...expenseData]

const expenseService = {
  async getAll() {
    await delay(300)
    return [...expenses]
  },

  async getById(id) {
    await delay(200)
    const expense = expenses.find(e => e.id === id)
    return expense ? { ...expense } : null
  },

  async create(expenseItem) {
    await delay(400)
    const newExpense = {
      ...expenseItem,
      id: Date.now().toString()
    }
    expenses.push(newExpense)
    return { ...newExpense }
  },

  async update(id, data) {
    await delay(350)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses[index] = { ...expenses[index], ...data }
    return { ...expenses[index] }
  },

  async delete(id) {
    await delay(250)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses.splice(index, 1)
    return true
  }
}

export default expenseService