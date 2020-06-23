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

<script>
import { reactive, onMounted } from 'vue'

import * as listService from './service/idb/list.service'
import * as taskService from './service/idb/task.service'
import * as taskItemService from './service/idb/taskItem.service'

import ListSelector from './components/ListSelector.vue'
import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetail.vue'

export default {
  components: {
    ListSelector,
    TaskList,
    TaskDetail,
    TaskForm,
  },
  setup() {
    const state = reactive({
      lists: [],
      selectedTask: null,
      selectedList: { name: '' },
    })

    function addTask(task) {
      const t = {
        description: task.description,
        createdDate: new Date(),
        dueDate: task.dueDate,
        doneDate: '',
        isDone: false,
        note: '',
        listId: state.selectedList.id,
      }

      return new Promise((resolve, reject) => {
        return taskService.put(t).then((id) => {
          if (!state.selectedList.tasks)
            state.selectedList.tasks = [{ ...t, id }]
          else state.selectedList.tasks.push({ ...t, id })
        })
      })
    }

    function updateTask(task) {
      Object.keys(task).map((p) => {
        state.selectedTask[p] = task[p]
      })

      const t = {
        id: state.selectedTask.id,
        listId: state.selectedTask.listId,
        description: state.selectedTask.description,
        createdDate: state.selectedTask.createdDate,
        dueDate: state.selectedTask.dueDate,
        doneDate: state.selectedTask.doneDate,
        isDone: state.selectedTask.isDone,
        note: state.selectedTask.note,
      }

      return taskService.put(t)
    }

    function removeTask(task) {
      const index = state.selectedList.tasks.findIndex((t) => t.id === task.id)

      if (~index) {
        taskService.remove(task.id).then(() => {
          state.selectedList.tasks.splice(index, 1)

          if (task.id === state.selectedTask.id) {
            state.selectedTask = null
          }
        })
      }
    }

    function selectTask(task) {
      state.selectedTask = task
      taskItemService.list(task.id).then((items) => (task.items = items || {}))
    }

    function doneTask(task) {
      task.isDone = !task.isDone
      task.doneDate = task.isDone ? new Date() : null
      updateTask(task)
    }

    function loadList() {
      return new Promise((resolve, reject) => {
        return listService.list().then((lists) => {
          state.lists = lists
          resolve(lists)
        })
      })
    }

    function addList(name) {
      return new Promise((resolve, reject) => {
        return listService.put({ name }).then((id) => {
          state.lists.push({ id, name, tasks: [] })
          resolve(id)
        })
      })
    }

    function updateList({ id, name }) {
      return new Promise((resolve, reject) =>
        listService.put({ id, name }).then((id) => {
          const list = state.lists.find((l) => l.id === id)
          list.name = name
          resolve(list)
        })
      )
    }

    function removeList(event) {
      const removingSelected = state.selectedList.id === event.id
      const oneRemaining = state.lists.length === 1

      if (removingSelected && oneRemaining) return

      const index = state.lists.findIndex((i) => event.id === i.id)

      if (~index) {
        listService.remove(event.id).then(() => {
          state.lists.splice(index, 1)

          if (removingSelected) {
            selectList(state.lists[0])
          }
        })
      }
    }

    function selectList(list) {
      if (!list) return
      state.selectedList = list
      taskService.list(list.id).then((tasks) => (list.tasks = tasks || {}))
    }

    onMounted(() => {
      loadList().then((lists) => {
        if (!lists.length) {
          addList('Para hoje').then((id) => {
            selectList(state.lists.find((l) => l.id === id))
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
}
</script>
