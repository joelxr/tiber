<template>
  <div class="container h-screen mx-auto max-w-4xl">
    <TaskList list-name="Para hoje" :tasks="state.tasks" @remove="removeTask" />
    <TaskForm @new="addTask" />
  </div>
</template>

<script>
import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import { reactive } from 'vue'

export default {
  components: {
    TaskList,
    TaskForm,
  },
  setup() {
    const state = reactive({
      tasks: [],
    })

    function addTask(task) {
      task.id = state.tasks.length + 1
      task.createdDate = new Date()
      state.tasks.push({ ...task })
    }

    function removeTask(task) {
      const index = state.tasks.findIndex((t) => t.id === task.id)
      state.tasks.splice(index, 1)
    }

    return {
      state,
      addTask,
      removeTask,
    }
  },
}
</script>
