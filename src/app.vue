<template>
  <div class="w-screen h-screen">
    <div class="flex h-full">
      <div class="flex flex-col w-full">
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
  </div>
</template>

<script>
import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetail.vue'
import { reactive } from 'vue'

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
      task.id = state.tasks.length + 1
      task.createdDate = new Date()
      task.doneDate = null
      task.isDone = false
      task.items = []
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
      const index = event.task.items.indexOf(event.removedItem)
      event.task.items.splice(index, 1)
    }

    return {
      state,
      addTask,
      removeTask,
      editTask,
      doneTask,
      removeTaskItem
    }
  },
}
</script>
