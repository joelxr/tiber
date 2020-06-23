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

<script>
import TaskListItem from '../components/TaskListItem.vue'
import { reactive } from 'vue'
export default {
  components: { TaskListItem },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      taskDetailOpened: null,
    })

    function selectTask(task) {
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
