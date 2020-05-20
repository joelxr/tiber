<template>
  <div class="relative shadow flex-auto bg-gray-800">
    <input
      type="text"
      class="block appearance-none leading-tight bg-gray-800 text-3xl font-semibold focus:outline-none mt-2 px-4 py-2"
      v-model="task.description"
    />

    <div v-for="(item, index) in task.items" :key="index" class="flex">
      <TaskDetailItem :item="item" />
    </div>

    <TaskDetailAddItemInput
      class="mt-1 ml-3"
      @new="task.items.push({ description: $event, isDone: false })"
    />

    <button
      type="button"
      class="absolute top-0 right-0 mt-3 text-gray-500 hover:text-red-500"
      @click="$emit('close')"
    >
      <Icon name="times" />
    </button>
  </div>
</template>

<script>
import TaskDetailItem from './TaskDetailItem.vue'
import TaskDetailAddItemInput from './TaskDetailAddItemInput.vue'
import Icon from './Icon.vue'

export default {
  components: { TaskDetailItem, TaskDetailAddItemInput, Icon },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
