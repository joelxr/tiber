import { dbPromise, TASKS } from './utils'

export const list = (listId) =>
  dbPromise().then((db) => db.getAllFromIndex(TASKS, 'listId', listId))

export const get = (id) => dbPromise().then((db) => db.get(TASKS, id))
export const put = (model) => dbPromise().then((db) => db.put(TASKS, model))
export const remove = (id) => dbPromise().then((db) => db.delete(TASKS, id))
