<template>
  <div class="absolute inset-x-0 bottom-0">
    <div class="w-full flex bg-gray-800 border border-transparent">
      <TaskFormAddButton
        :disabled="!state.task.description"
        @click.prevent="newTask"
      />
      <input
        type="text"
        class="block appearance-none w-full box-shadow leading-tight bg-gray-800 text-xl focus:outline-none focus:border-blue-900 px-2 py-4"
        placeholder="Nova tarefa"
        v-model="state.task.description"
        @keyup.enter.prevent="newTask"
        @keyup.esc="state.task.description = ''"
      />
      <TaskFormCalendarInput
        :value="state.task.dueDate"
        @update="updateDueDate"
      />
    </div>
  </div>
</template>

<script>
import TaskFormAddButton from './TaskFormAddButton.vue'
import TaskFormCalendarInput from './TaskFormCalendarInput.vue'
import { reactive } from 'vue'
export default {
  components: {
    TaskFormAddButton,
    TaskFormCalendarInput,
  },
  setup(props, context) {
    const state = reactive({
      task: {
        description: '',
        dueDate: new Date(),
      },
    })

    function newTask() {
      context.emit('new', state.task)
      state.task.description = ''
    }

    function updateDueDate(event) {
      state.task.dueDate = event
    }

    return {
      state,
      newTask,
      updateDueDate,
    }
  },
}
</script>
