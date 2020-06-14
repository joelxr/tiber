<template>
  <div class="flex flex-col p-2 flex-grow overflow-auto">
    <h1 class="text-gray-600 text-4xl font-black mx-4 my-8">{{ listName }}</h1>
    <ul class="flex flex-col flex-grow overflow-auto">
      <li v-for="(task, index) in tasks" :key="index">
        <TaskListItem
          :task="task"
          :is-detail-opened="
            state.taskDetailOpened && task.id === state.taskDetailOpened.id
          "
          @remove="$emit('remove', task)"
          @done="$emit('done', task)"
          @edit="editTask"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TaskListItem from '../components/TaskIListItem.vue'
import { reactive } from 'vue'
export default {
  components: { TaskListItem },
  props: {
    listName: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      taskDetailOpened: null,
    })

    function editTask(task) {
      context.emit('edit', task)
      state.taskDetailOpened = task
    }

    return {
      state,
      editTask,
    }
  },
}
</script>
