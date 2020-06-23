import { dbPromise, LISTS } from './utils'

export const list = () => dbPromise().then((db) => db.getAll(LISTS))
export const get = (id) => dbPromise().then((db) => db.get(LISTS, id))
export const put = (model) => dbPromise().then((db) => db.put(LISTS, model))
export const remove = (id) => dbPromise().then((db) => db.delete(LISTS, id))
