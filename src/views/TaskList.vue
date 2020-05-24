<template>
  <div class="flex flex-col p-2 h-full w-full">
    <h1 class="text-gray-600 text-4xl font-black mx-4 my-8">{{ listName }}</h1>
    <ul class="flex flex-col flex-auto overflow-auto mb-20">
      <li v-for="(task, index) in tasks" :key="index">
        <TaskListItem
          :task="task"
          :is-notes-opened="
            state.taskNotesOpened && task.id === state.taskNotesOpened.id
          "
          :is-detail-opened="
            state.taskDetailOpened && task.id === state.taskDetailOpened.id
          "
          @remove="$emit('remove', task)"
          @done="$emit('done', task)"
          @edit="editTask"
          @openNotes="openTaskNotes"
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
      taskNotesOpened: null,
      taskDetailOpened: null,
    })

    function editTask(task) {
      context.emit('edit', task)
      state.taskDetailOpened = task
      state.taskNotesOpened = null
    }

    function openTaskNotes(task) {
      context.emit('openNotes', task)
      state.taskDetailOpened = null
      state.taskNotesOpened = task
    }

    return {
      state,
      editTask,
      openTaskNotes,
    }
  },
}
</script>
