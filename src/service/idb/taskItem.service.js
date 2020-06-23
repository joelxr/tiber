import { dbPromise, TASK_ITEMS } from './utils'

export const list = (taskId) =>
  dbPromise().then((db) => db.getAllFromIndex(TASK_ITEMS, 'taskId', taskId))

export const get = (id) => dbPromise().then((db) => db.get(TASK_ITEMS, id))
export const put = (model) =>
  dbPromise().then((db) => db.put(TASK_ITEMS, model))
export const remove = (id) =>
  dbPromise().then((db) => db.delete(TASK_ITEMS, id))
