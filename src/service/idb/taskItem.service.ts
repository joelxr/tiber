import { dbPromise, Collections, Indexes } from './utils.ts'

export const list = (taskId) =>
  dbPromise().then((db) =>
    db.getAllFromIndex(Collections.TaskItems, Indexes.TaskInTaskItem, taskId)
  )
export const get = (id: string) =>
  dbPromise().then((db) => db.get(Collections.TaskItems, id))
export const put = (model: TaskItem) =>
  dbPromise().then((db) => db.put(Collections.TaskItems, model))
export const remove = (id: string) =>
  dbPromise().then((db) => db.delete(Collections.TaskItems, id))
