interface Task {
  id?: string
  description?: string
  createdDate?: Date
  dueDate?: Date
  doneDate?: Date
  isDone?: boolean
  note?: string
  listId?: string
  items?: Array<TaskItem>
}
