<template>
  <div class="flex flex-col p-2 h-full">
    <h1 class="text-gray-600 text-4xl font-black mx-4 my-8">{{ listName }}</h1>
    <ul class="flex flex-col flex-auto overflow-auto mb-20">
      <li v-for="(task, index) in tasks" :key="index">
        <TaskListItem :task="task" @remove="$emit('remove', task)" />
      </li>
    </ul>
  </div>
</template>

<script>
import TaskListItem from '../components/TaskIListItem.vue'
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
}
</script>
