import { dbPromise, Collections, Indexes } from './utils.ts'

export const list = (listId: string) =>
  dbPromise().then((db) =>
    db.getAllFromIndex(Collections.Tasks, Indexes.ListInTask, listId)
  )
export const get = (id: string) =>
  dbPromise().then((db) => db.get(Collections.Tasks, id))
export const put = (model: Task) =>
  dbPromise().then((db) => db.put(Collections.Tasks, model))
export const remove = (id: string) =>
  dbPromise().then((db) => db.delete(Collections.Tasks, id))
