<template>
  <div class="w-full pr-4 flex bg-gray-800 border border-transparent">
    <button
      type="button"
      class="btn"
      :disabled="!state.task.description"
      @click.prevent="newTask"
    >
      <Icon name="plus-circle" />
    </button>

    <input
      type="text"
      class="block appearance-none w-full box-shadow leading-tight bg-gray-800 text-xl focus:outline-none focus:border-blue-900 py-4"
      placeholder="Nova tarefa"
      v-model="state.task.description"
      @keyup.enter.prevent="newTask"
      @keyup.esc="state.task.description = ''"
    />
    <DateInput :value="state.task.dueDate" @update="updateDueDate" />
  </div>
</template>

<script>
import Icon from './Icon.vue'
import DateInput from './DateInput.vue'
import { reactive } from 'vue'
export default {
  components: {
    Icon,
    DateInput,
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

<style lang="scss" scoped>
.btn {
  @apply text-gray-500;

  &:hover {
    @apply text-green-500;
  }

  &:disabled {
    @apply text-gray-700;
  }
}
</style>
