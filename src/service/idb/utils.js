import { openDB } from 'idb'

const dbName = '_tiber.store'
const listsCollection = 'lists'
const tasksCollection = 'tasks'
const taskItemCollection = 'taskItems'

const tryToDelete = (db) =>
  new Promise((resolve, reject) => {
    try {
      db.deleteObjectStore(taskItemCollection)
      db.deleteObjectStore(tasksCollection)
      db.deleteObjectStore(listsCollection)
      resolve(true)
    } catch (err) {
      if (err.name === 'NotFoundError') resolve(true)
      reject(err)
    }
  })

const tryToCreate = (db) =>
  new Promise((resolve, reject) => {
    try {
      db.createObjectStore(listsCollection, {
        keyPath: 'id',
        autoIncrement: true,
      })

      const taskStore = db.createObjectStore(tasksCollection, {
        keyPath: 'id',
        autoIncrement: true,
      })

      const taskItemStore = db.createObjectStore(taskItemCollection, {
        keyPath: 'id',
        autoIncrement: true,
      })

      taskStore.createIndex('listId', 'listId', { unique: false })
      taskItemStore.createIndex('taskId', 'taskId', { unique: false })
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })

export const LISTS = listsCollection
export const TASKS = tasksCollection
export const TASK_ITEMS = taskItemCollection

export const dbPromise = () =>
  openDB(dbName, 2, {
    upgrade(db) {
      return tryToDelete(db).then(() => tryToCreate(db))
    },
  })
