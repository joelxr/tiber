<template>
  <div class="w-screen h-full flex">
    <div class="flex flex-col h-full min-w-full">
      <TaskList
        list-name="Para hoje"
        :tasks="state.tasks"
        @remove="removeTask"
        @done="doneTask"
        @edit="editTask"
      />
      <TaskForm @new="addTask" />
    </div>
    <TaskDetail
      v-if="state.selectedTask"
      :task="state.selectedTask"
      @close="state.selectedTask = null"
      @removeItem="removeTaskItem"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetail.vue'

export default {
  components: {
    TaskList,
    TaskDetail,
    TaskForm,
  },
  setup() {
    const state = reactive({
      tasks: [],
      selectedTask: null,
    })

    function addTask(task) {
      task.id = uuidv4()
      task.createdDate = new Date()
      task.doneDate = null
      task.isDone = false
      task.items = []
      task.note = ''
      state.tasks.push({ ...task })
    }

    function removeTask(task) {
      const index = state.tasks.findIndex((t) => t.id === task.id)
      state.tasks.splice(index, 1)
    }

    function editTask(task) {
      state.selectedTask = task
    }

    function doneTask(task) {
      task.isDone = !task.isDone
      task.doneDate = task.isDone ? new Date() : null
    }

    function removeTaskItem(event) {
      const index = event.task.items.findIndex(
        (i) => event.removedItem.id === i.id
      )
      event.task.items.splice(index, 1)
    }

    return {
      state,
      addTask,
      removeTask,
      editTask,
      doneTask,
      removeTaskItem,
    }
  },
}
</script>
