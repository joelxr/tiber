<template>
  <div
    class="flex bg-gray-800 rounded shadow mx-4 my-2 p-2 border border-transparent hover:border-gray-700"
  >
    <input class="mx-2" type="checkbox" />
    <div class="mx-2 flex-grow">
      <p class="text-lg font-bold">{{ task.description }}</p>
      <p class="px-1 text-sm text-blue-600">{{
        task.dueDate.toLocaleString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      }}</p>
    </div>
    <TaskListItemRemoveButton @click="$emit('remove')" />
  </div>
</template>

<script>
import TaskListItemRemoveButton from './TaskListItemRemoveButton.vue'

export default {
  components: { TaskListItemRemoveButton },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>
