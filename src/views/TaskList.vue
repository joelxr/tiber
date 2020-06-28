<template>
  <div
    class="flex flex-col p-2 flex-grow overflow-auto mx-0 sm:mx-10 md:mx-12 lg:mx-16 xl:mx-32"
  >
    <ul class="flex flex-col flex-grow overflow-auto">
      <li v-for="(task, index) in tasks" :key="index">
        <TaskListItem
          :task="task"
          :is-detail-opened="
            state.taskDetailOpened && task.id === state.taskDetailOpened.id
          "
          @remove="$emit('remove', task)"
          @done="$emit('done', task)"
          @select="selectTask"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import TaskListItem from '../components/TaskListItem.vue'

interface TaskListState {
  taskDetailOpened?: Task
}

export default {
  components: { TaskListItem },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state: TaskListState = reactive({
      taskDetailOpened: undefined,
    })

    function selectTask(task: Task) {
      context.emit('select', task)
      state.taskDetailOpened = task
    }

    return {
      state,
      selectTask,
    }
  },
}
</script>
