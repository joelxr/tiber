<template>
  <div class="w-screen h-full flex">
    <div class="flex flex-col h-full min-w-full">
      <ListSelector
        v-if="state.lists.length"
        :lists="state.lists"
        :selected-list="state.selectedList"
        @select="selectList"
        @new="addList"
        @remove="removeList"
        @update="updateList"
      />
      <TaskList
        v-if="state.selectedList"
        :tasks="state.selectedList.tasks"
        @remove="removeTask"
        @done="doneTask"
        @select="selectTask"
      />
      <TaskForm @new="addTask" />
    </div>
    <TaskDetail
      v-if="state.selectedTask"
      :task="state.selectedTask"
      @close="state.selectedTask = null"
      @update="updateTask"
      @remove="removeTask"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

import * as listService from './service/idb/list.service'
import * as taskService from './service/idb/task.service'
import * as taskItemService from './service/idb/taskItem.service'

import ListSelector from './components/ListSelector.vue'
import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetail.vue'

interface AppState {
  lists: Array<TaskList>
  selectedTask?: Task
  selectedList: TaskList
}

export default defineComponent({
  components: {
    ListSelector,
    TaskList,
    TaskDetail,
    TaskForm,
  },
  setup() {
    const state: AppState = reactive({
      lists: [],
      selectedTask: undefined,
      selectedList: { name: '', tasks: [] },
    })

    function addTask(task: Task): Promise<boolean> {
      const t: Task = {
        description: task.description,
        createdDate: new Date(),
        dueDate: task.dueDate,
        isDone: false,
        listId: state.selectedList.id,
      }

      return new Promise((resolve, reject) => {
        return taskService.put(t).then((id) => {
          if (!state.selectedList.tasks) {
            state.selectedList.tasks = [{ ...t, id: id.toString() }]
          } else {
            state.selectedList.tasks.push({ ...t, id: id.toString() })
          }
          return true
        })
      })
    }

    function updateTask(task: Task): Promise<string> {
      if (!state.selectedTask) return Promise.resolve('')

      Object.keys(task).map((p) => {
        if (state.selectedTask) state.selectedTask[p] = task[p]
      })

      const t: Task = {
        id: state.selectedTask.id,
        listId: state.selectedTask.listId,
        description: state.selectedTask.description,
        createdDate: state.selectedTask.createdDate,
        dueDate: state.selectedTask.dueDate,
        doneDate: state.selectedTask.doneDate,
        isDone: state.selectedTask.isDone,
        note: state.selectedTask.note,
      }

      return taskService.put(t).then((id) => id.toString())
    }

    function removeTask(task: Task): void {
      if (!task.id) return

      const index = state.selectedList.tasks.findIndex((t) => t.id === task.id)

      if (~index) {
        taskService.remove(task.id).then(() => {
          state.selectedList.tasks.splice(index, 1)

          if (state.selectedTask && task.id === state.selectedTask.id) {
            state.selectedTask = undefined
          }
        })
      }
    }

    function selectTask(task: Task): void {
      state.selectedTask = task
      taskItemService.list(task.id).then((items) => (task.items = items || {}))
    }

    function doneTask(task: Task): void {
      task.isDone = !task.isDone
      task.doneDate = task.isDone ? new Date() : undefined
      updateTask(task)
    }

    function loadList(): Promise<Array<TaskList>> {
      return new Promise((resolve, reject) => {
        return listService.list().then((lists) => {
          state.lists = lists
          resolve(lists)
        })
      })
    }

    function addList(name: string): Promise<string> {
      return new Promise((resolve, reject) => {
        return listService.put({ name, tasks: [] }).then((id) => {
          state.lists.push({ id: id.toString(), name, tasks: [] })
          resolve(id.toString())
        })
      })
    }

    function updateList({ id, name, tasks = [] }: TaskList) {
      return new Promise((resolve, reject) =>
        listService.put({ id, name, tasks }).then((id) => {
          const list = state.lists.find((l) => l.id === id)
          if (list) {
            list.name = name
            resolve(list)
          } else {
            resolve(null)
          }
        })
      )
    }

    function removeList(list: TaskList): void {
      if (!list.id) return

      const removingSelected = state.selectedList.id === list.id
      const oneRemaining = state.lists.length === 1

      if (removingSelected && oneRemaining) return

      const index = state.lists.findIndex((i) => list.id === i.id)

      if (~index) {
        listService.remove(list.id.toString()).then(() => {
          state.lists.splice(index, 1)

          if (removingSelected) {
            selectList(state.lists[0])
          }
        })
      }
    }

    function selectList(list: TaskList): void {
      if (!list || !list.id) return
      state.selectedList = list
      taskService.list(list.id).then((tasks) => (list.tasks = tasks || {}))
    }

    onMounted(() => {
      loadList().then((lists) => {
        if (!lists.length) {
          addList('Para hoje').then((id) => {
            const list = state.lists.find((l) => l.id === id)
            if (list) selectList(list)
          })
        }

        selectList(state.lists[0])
      })
    })

    return {
      state,
      addTask,
      updateTask,
      removeTask,
      selectTask,
      doneTask,
      addList,
      updateList,
      removeList,
      selectList,
    }
  },
})
</script>
