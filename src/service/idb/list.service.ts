import { dbPromise, Collections } from './utils'

export const list = () => dbPromise().then((db) => db.getAll(Collections.Lists))
export const get = (id: string) =>
  dbPromise().then((db) => db.get(Collections.Lists, id))
export const put = (model: TaskList) =>
  dbPromise().then((db) => db.put(Collections.Lists, model))
export const remove = (id: string) =>
  dbPromise().then((db) => db.delete(Collections.Lists, id))
