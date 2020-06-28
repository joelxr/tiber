import { openDB } from 'idb'

const dbName: string = '_tiber.store'

const tryToDelete = (db) =>
  new Promise((resolve, reject) => {
    try {
      db.deleteObjectStore(Collections.TaskItems)
      db.deleteObjectStore(Collections.Tasks)
      db.deleteObjectStore(Collections.Lists)
      resolve(true)
    } catch (err) {
      if (err.name === 'NotFoundError') resolve(true)
      reject(err)
    }
  })

const tryToCreate = (db) =>
  new Promise((resolve, reject) => {
    try {
      db.createObjectStore(Collections.Lists, {
        keyPath: 'id',
        autoIncrement: true,
      })

      const taskStore = db.createObjectStore(Collections.Tasks, {
        keyPath: 'id',
        autoIncrement: true,
      })

      const taskItemStore = db.createObjectStore(Collections.TaskItems, {
        keyPath: 'id',
        autoIncrement: true,
      })

      taskStore.createIndex(Indexes.ListInTask, Indexes.ListInTask, {
        unique: false,
      })
      taskItemStore.createIndex(
        Indexes.TaskInTaskItem,
        Indexes.TaskInTaskItem,
        { unique: false }
      )
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })

export const dbPromise = () =>
  openDB(dbName, 2, {
    upgrade(db) {
      return tryToDelete(db).then(() => tryToCreate(db))
    },
  })

export enum Collections {
  Lists = 'lists',
  Tasks = 'tasks',
  TaskItems = 'taskItems',
}

export enum Indexes {
  ListInTask = 'listId',
  TaskInTaskItem = 'taskId',
}
