
const STORAGE_KEY = 'cryptosafe_history'

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function addHistory(entry) {
  const history = getHistory()

  const newEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...entry,
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newEntry, ...history])
  )

  return newEntry
}

export function deleteHistory(id) {
  const history = getHistory().filter(
    (item) => item.id !== id
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  return history
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}
